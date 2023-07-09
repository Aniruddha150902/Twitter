import { createContext, PropsWithChildren, useContext } from "react";
import { API_URL } from "./config";
import { useAuth } from "../../context/AuthContext";
const TweetsApiContext = createContext({});
const TweetsApiContextProvider = ({ children }: PropsWithChildren) => {
  //@ts-ignore
  const { authToken, removeAuthToken } = useAuth();
  async function listTweets() {
    if (!authToken) return;
    const res = await fetch(`${API_URL}/tweet`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    // console.log(res);
    if (res.status === 401 || res.status === 400) {
      removeAuthToken();
      throw new Error("Unauthorized!Please sign in");
    }
    if (res.status !== 200) throw new Error("Error Fetching the Tweets");
    return await res.json();
  }
  async function getTweet(id: string) {
    if (!authToken) return;
    const res = await fetch(`${API_URL}/tweet/${id}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    if (res.status === 401 || res.status === 400)
      throw new Error("Unauthorized!Please sign in");
    if (res.status !== 200) throw new Error("Error Fetching the Tweet");
    return await res.json();
  }
  async function createTweet(data: { content: string; image: string }) {
    if (!authToken) return;
    const res = await fetch(`${API_URL}/tweet`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (res.status === 401 || res.status === 400) {
      throw new Error("Unauthorized!Please sign in");
    }
    if (res.status !== 200) throw new Error("Error Posting the Tweet");
    return await res.json();
  }
  return (
    <TweetsApiContext.Provider
      value={{
        listTweets,
        getTweet,
        createTweet,
      }}
    >
      {children}
    </TweetsApiContext.Provider>
  );
};
export default TweetsApiContextProvider;
export const useTweetsApi = () => useContext(TweetsApiContext);
