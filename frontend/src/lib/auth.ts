import { auth } from "./firebase";

export async function getIdToken() {
  const user = auth.currentUser;
  if (!user) return null;
  return await user.getIdToken();
}

export function logout() {
  localStorage.removeItem("authToken");
  localStorage.removeItem("user");
  window.location.href = "/login";
}