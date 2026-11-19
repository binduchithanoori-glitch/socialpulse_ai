// Single place for HTTP config. Swap the base URL via VITE_API_BASE_URL.
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api";
export const USE_MOCK = import.meta.env.VITE_USE_MOCK !== "false";

export async function request(path, options = {}) {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) throw new Error(`Request failed (${res.status})`);
  return res.json();
}
