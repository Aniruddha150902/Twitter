import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { API_URL } from "./config";
import { useAuth } from "../../context/AuthContext";
import { useSegments } from "expo-router";
const UserApiContext = createContext({});
const UserApiContextProvider = ({ children }: PropsWithChildren) => {
  //@ts-ignore
  const { authToken } = useAuth();
  const [user, setUser] = useState({});

  async function getUserTweet(id: string) {
    if (!authToken) return;
    const res = await fetch(`${API_URL}/user/${id}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    if (res.status === 401 || res.status === 400)
      throw new Error("Unauthorized!Please sign in");
    if (res.status !== 200) throw new Error("Error Fetching the User Tweets");
    return await res.json();
  }

  const segemnts = useSegments();
  useEffect(() => {
    if (!authToken) return;
    const isAuthGroup = segemnts[0] === "(auth)";
    if (isAuthGroup) return;
    const fetchUser = async () => {
      try {
        const res = await fetch(`${API_URL}/user`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        if (res.status === 401 || res.status === 400)
          throw new Error("Unauthorized!Please sign in");
        if (res.status !== 200)
          throw new Error("Error Fetching the User Details");
        const userData = await res.json();
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };
    fetchUser();
  }, [segemnts]);

  async function editUser(data: {
    id: number;
    name: string;
    bio: string;
    image: string;
  }) {
    if (!authToken) return;
    const res = await fetch(`${API_URL}/user/${data.id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (res.status === 401 || res.status === 400)
      throw new Error("Unauthorized!Please sign in");
    if (res.status !== 200) throw new Error("Error Editing the User Details");
    return await res.json();
  }

  return (
    <UserApiContext.Provider
      value={{
        user,
        getUserTweet,
        editUser,
      }}
    >
      {children}
    </UserApiContext.Provider>
  );
};
export default UserApiContextProvider;
export const useUserApi = () => useContext(UserApiContext);
