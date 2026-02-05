import { logout } from "./auth";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function apiFetch(
  path: string,
  options: RequestInit = {}
): Promise<Response> {
  const token = localStorage.getItem("authToken");

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
  });

  // 🔥 GLOBAL 401 HANDLER
  if (res.status === 401) {
    logout(); // ✅ single source of truth
    throw new Error("Unauthorized");
  }

  return res;
}
