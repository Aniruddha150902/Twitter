import { API_URL } from "./config";
export async function createUser(data: {
  name: string;
  username: string;
  email: string;
  bio: string;
}) {
  const res = await fetch(`${API_URL}/auth/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (res.status === 401 || res.status === 400) {
    throw new Error("Unauthorized!Please sign up");
  }
  if (res.status !== 200) throw new Error("Please Create An Account");
  return await res.json();
}
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
