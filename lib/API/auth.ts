import { API_URL } from "./config";
export async function login(data: { email: string }) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (res.status !== 200) throw new Error("Email not Verified");
}
export async function authenticate(data: {
  email: string;
  emailToken: string;
}) {
  const res = await fetch(`${API_URL}/auth/authentication`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (res.status !== 200) throw new Error("Invalid Code");
  return await res.json();
}
