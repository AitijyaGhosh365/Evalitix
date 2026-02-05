from fastapi import HTTPException

def assert_form_access(account: dict, form_id: str):
    allowed_forms = set(account.get("forms", []))

    if form_id not in allowed_forms:
        raise HTTPException(
            status_code=403,
            detail="You do not have access to this form"
        )
