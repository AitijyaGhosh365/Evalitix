from fastapi import Header, HTTPException
from firebase_admin import auth

def verify_token(authorization: str = Header(None)):
    if not authorization:
        raise HTTPException(status_code=401, detail="Missing token")

    try:
        token = authorization.replace("Bearer ", "")
        decoded = auth.verify_id_token(token)
        return decoded  # contains uid, email
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid token")



def get_current_user(authorization: str = Header(None)):
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Missing auth token")

    token = authorization.split(" ")[1]

    try:
        decoded = auth.verify_id_token(token)
        return decoded  # contains uid, email, etc.
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid auth token")
