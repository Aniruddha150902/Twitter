import { API_URL, AUTH } from "./config";
export default async function listTweets() {
  const res = await fetch(`${API_URL}/tweet`, {
    headers: {
      Authorization: `Bearer ${AUTH}`,
    },
  });
  // console.log(res);
  if (res.status === 401 || res.status === 400)
    throw new Error("Unauthorized!Please sign in");
  if (res.status !== 200) throw new Error("Error Fetching the Tweets");
  return await res.json();
}
