from fastapi import FastAPI, HTTPException, Request, Query, Depends
from services.firebase_admin_init import db
from fastapi.middleware.cors import CORSMiddleware
import uuid, hashlib
import requests
import os

from dotenv import load_dotenv
load_dotenv()

from pydantic import BaseModel
from typing import Any, Dict, Optional
from datetime import datetime, timezone
from firebase_admin import firestore, auth

from services.firebase_admin_init import db
from services.auth import verify_token, get_current_user

from fastapi import Depends
from services.auth import get_current_user
from services.permissions import assert_form_access
from services.generate_quantifiers import generate_quantifiers_llm


app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# ---------------------------
# Health / sanity check
# ---------------------------

class FormEditPayload(BaseModel):
    title: str
    description: str
    jobRequirements: str
    quantifiers: Dict[str, Any]
    
class QuantifierRequest(BaseModel):
    jobRequirements: str
 
    
@app.get("/")
def root():
    return {"status": "ok"}


# ---------------------------
# Admin: List all forms
# ---------------------------
@app.get("/user/forms")
def get_user_forms(user=Depends(get_current_user)):
    uid = user["uid"]

    account_ref = db.collection("accounts").document(uid)
    account_doc = account_ref.get()

    if not account_doc.exists:
        raise HTTPException(status_code=403, detail="Account not found")

    account = account_doc.to_dict()
    allowed_forms = set(account.get("forms", []))

    forms = []
    for doc in db.collection("forms").get():
        if doc.id not in allowed_forms:
            continue

        data = doc.to_dict()
        meta = db.collection("form_meta").document(doc.id).get().to_dict() or {}

        forms.append({
            "uuid": doc.id,
            "title": data.get("title"),
            "description": data.get("description"),
            "status": (data.get("status") or "").lower(),
            "filledCount": meta.get("filledCount", 0),
        })

    return {
        "success": True,
        "forms": forms
    }




from fastapi import Depends
from services.auth import get_current_user
from services.permissions import assert_form_access

@app.get("/form/{form_id}")
def get_form(form_id: str, user=Depends(get_current_user)):
    uid = user["uid"]

    account_doc = db.collection("accounts").document(uid).get()
    if not account_doc.exists:
        raise HTTPException(status_code=403, detail="Account not found")

    account = account_doc.to_dict()

    # 🔐 ACCESS CHECK
    assert_form_access(account, form_id)

    form_doc = db.collection("forms").document(form_id).get()
    if not form_doc.exists:
        raise HTTPException(status_code=404, detail="Form not found")

    return {
        "success": True,
        "form": form_doc.to_dict()
    }


    

@app.post("/form/edit/{form_id}")
def edit_form(form_id: str, payload: dict, user=Depends(get_current_user)):
    uid = user["uid"]

    account_doc = db.collection("accounts").document(uid).get()
    if not account_doc.exists:
        raise HTTPException(status_code=403, detail="Account not found")

    account = account_doc.to_dict()

    # 🔐 ACCESS CHECK
    assert_form_access(account, form_id)

    # Optional: block edit if active
    form_ref = db.collection("forms").document(form_id)
    form = form_ref.get().to_dict()

    if form.get("status", "").lower() != "inactive":
        raise HTTPException(status_code=400, detail="Form is not editable")

    form_ref.update({
        "title": payload.get("title"),
        "description": payload.get("description"),
        "updatedAt": firestore.SERVER_TIMESTAMP,
        "status": "active",
    })

    db.collection("form_meta").document(form_id).update({
        "quantifiers": payload.get("quantifiers", {}),
        "updatedAt": firestore.SERVER_TIMESTAMP,
    })

    return { "success": True }



@app.post("/form/generate_quantifiers")
def generate_quantifiers(payload: QuantifierRequest):
    job_requirements = payload.jobRequirements

    # 🔹 Temporary logic (replace with LLM later)
    quantifiers = generate_quantifiers_llm(job_requirements=job_requirements)

    return {
        "success": True,
        "quantifiers": quantifiers
    }
    

@app.post("/form/{form_id}/submit")
def submit_form(form_id: str, payload: dict, request: Request):
    # 1️⃣ Load form
    form_ref = db.collection("forms").document(form_id)
    form_doc = form_ref.get()

    if not form_doc.exists:
        raise HTTPException(status_code=404, detail="Form not found")

    form = form_doc.to_dict()
    if form.get("status") != "active":
        raise HTTPException(status_code=400, detail="Form not accepting submissions")

    # 2️⃣ Load quantifiers snapshot
    meta_doc = db.collection("form_meta").document(form_id).get()
    quantifiers = meta_doc.to_dict().get("quantifiers", {}) if meta_doc.exists else {}

    # 3️⃣ Extract candidate response
    candidate_response = payload.get("candidateResponse") or payload.get("formData")
    if not candidate_response:
        raise HTTPException(status_code=400, detail="Missing candidate response")

    # 4️⃣ Metadata
    ip = request.client.host if request.client else "unknown"
    ip_hash = hashlib.sha256(ip.encode()).hexdigest()

    now = datetime.now(timezone.utc)
    submission_id = str(uuid.uuid4())

    # 5️⃣ Save submission
    db.collection("CandidateSubmissions").document(submission_id).set({
        "submissionId": submission_id,
        "formId": form_id,

        "candidateResponse": candidate_response,
        "candidateEmail": candidate_response.get("email"),
        "candidatePhone": candidate_response.get("phone"),

        "quantifiers": quantifiers,

        "status": "submitted",

        "ipHash": ip_hash,
        "userAgent": request.headers.get("user-agent"),
        "createdAt": now,
        "reviewedAt": None,
    })

    # 6️⃣ Increment filledCount
    db.collection("form_meta").document(form_id).update({
    "filledCount": firestore.Increment(1),
    "updatedAt": now,
    })

    return {
        "success": True,
        "submissionId": submission_id,
    }



@app.get("/forms/{form_id}/submissions")
def list_form_submissions(form_id: str, limit: int = 50, cursor: str = None):
    try:
        query = (
            db.collection("CandidateSubmissions")
            .where("formId", "==", form_id.strip())
            .where("evaluationScore", "!=", None)
            .order_by("evaluationScore", direction=firestore.Query.DESCENDING)
        )

        # Handle Pagination Cursor
        if cursor:
            last_doc = db.collection("CandidateSubmissions").document(cursor).get()
            if last_doc.exists:
                query = query.start_after(last_doc)

        # Apply Limit
        query = query.limit(limit)
        docs = list(query.stream())

        submissions = []
        for doc in docs:
            data = doc.to_dict()
            submissions.append({
                "submissionId": doc.id,
                "candidateResponse": data.get("candidateResponse", {}),
                "aiEvaluation": data.get("aiEvaluation", {}),
                "score": data.get("evaluationScore"),
                "createdAt": data.get("createdAt"),
            })

        return {
            "submissions": submissions,
            "nextCursor": docs[-1].id if len(docs) == limit else None,
        }

    except Exception as e:
        # print("ERROR LOADING SUBMISSIONS:", e)
        raise HTTPException(status_code=500, detail="Failed to load submissions")



@app.get("/public/form/{form_id}")
def get_public_form(form_id: str):
    form_doc = db.collection("forms").document(form_id).get()

    if not form_doc.exists:
        raise HTTPException(status_code=404, detail="Form not found")

    form = form_doc.to_dict()

    if (form.get("status") or "").lower() != "active":
        raise HTTPException(status_code=403, detail="Form not active")

    return {
        "success": True,
        "form": {
            "uuid": form_id,
            "title": form.get("title"),
            "description": form.get("description"),
            "jsonSchema": form.get("jsonSchema"),
            "status": "active",
        }
    }





FIREBASE_SEND_OTP_URL = os.getenv("FIREBASE_SEND_OTP_URL")
FIREBASE_SUBMIT_URL = os.getenv("FIREBASE_SUBMIT_URL")


from pydantic import BaseModel

class SendOtpPayload(BaseModel):
    email: str

@app.post("/public/form/{form_id}/send-otp")
def send_otp_proxy(form_id: str, payload: SendOtpPayload):
    res = requests.post(
        FIREBASE_SEND_OTP_URL,
        json={ "email": payload.email }
    )

    if not res.ok:
        raise HTTPException(400, "Failed to send OTP")

    return { "success": True }



class VerifyOtpPayload(BaseModel):
    otp: str
    formData: dict

@app.post("/public/form/{form_id}/verify-otp-and-submit")
def verify_otp_proxy(form_id: str, payload: VerifyOtpPayload):
    res = requests.post(
        FIREBASE_SUBMIT_URL,
        json={
            "otp": payload.otp,
            "formData": payload.formData
        }
    )

    if not res.ok:
        raise HTTPException(400, "OTP verification failed")

    return res.json()




@app.get("/debug/firestore")
def debug_firestore():
    try:
        docs = list(
            db.collection("CandidateSubmissions")
            .limit(5)
            .stream()
        )
        return {
            "count": len(docs),
            "sample": docs[0].to_dict() if docs else None
        }
    except Exception as e:
        return {"error": str(e)}


from pydantic import BaseModel

class PasskeyPayload(BaseModel):
    passkey: str


@app.post("/public/form/{form_id}/verify-passkey")
def verify_form_passkey(form_id: str, payload: PasskeyPayload):
    meta_doc = db.collection("form_meta").document(form_id).get()

    if not meta_doc.exists:
        raise HTTPException(status_code=404, detail="Form not found")

    meta = meta_doc.to_dict()
    stored_passkey = meta.get("passkey")

    if not stored_passkey:
        raise HTTPException(status_code=400, detail="Passkey not set")

    if payload.passkey.strip() != stored_passkey:
        return { "success": False }

    return { "success": True }


@app.get("/user/account")
def get_account(user=Depends(get_current_user)):
    uid = user["uid"]

    doc = db.collection("accounts").document(uid).get()
    if not doc.exists:
        raise HTTPException(status_code=404, detail="Account not found")

    data = doc.to_dict()

    return {
        "success": True,
        "account": {
            "uid": uid,
            "email": data.get("email"),
            "name": data.get("name"),
            "createdAt": data.get("createdAt"),
            "formsCount": len(data.get("forms", [])),
            "forms": data.get("forms", []),
        }
    }
    

@app.get("/forms/{form_id}/meta")
def get_form_meta(form_id: str):
    try:
        doc_ref = db.collection("form_meta").document(form_id.strip())
        doc = doc_ref.get()
        if not doc.exists:
            raise HTTPException(status_code=404, detail="Form not found")

        data = doc.to_dict()
        # print(data)

        return {
            "form": {
                "uuid": data.get("uuid", form_id),
                "title": data.get("title"),
                "status": data.get("status"),
                "passkey": data.get("passkey"),  # 👈 used by share button
            }
        }

    except HTTPException:
        raise
    except Exception as e:
        # print("ERROR FETCHING FORM META:", e)
        raise HTTPException(status_code=500, detail="Failed to load form metadata")