import { useRouter, useSegments } from "expo-router";
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import * as SecureStore from "expo-secure-store";
const AuthContext = createContext({});
const AuthContextProvider = ({ children }: PropsWithChildren) => {
  const [authToken, setAuthToken] = useState<string | null>(null);
  // console.log(authToken);
  const segemnts = useSegments();
  // console.log(segemnts);
  const router = useRouter();
  useEffect(() => {
    const isAuthGroup = segemnts[0] === "(auth)";
    if (!authToken && !isAuthGroup) {
      // console.log("User is not yet authenticated and he cannot see this page");
      router.replace("/signIn");
    }
    if (authToken && isAuthGroup) {
      router.replace("/");
    }
  }, [authToken]);
  useEffect(() => {
    const loadAuthToken = async () => {
      const res = await SecureStore.getItemAsync("authToken");
      if (res) {
        setAuthToken(res);
      }
    };
    loadAuthToken();
  }, []);
  const updateAuthToken = async (newToken: string) => {
    await SecureStore.setItemAsync("authToken", newToken);
    setAuthToken(newToken);
  };
  const removeAuthToken = async () => {
    await SecureStore.deleteItemAsync("authToken");
    setAuthToken(null);
  };
  return (
    <AuthContext.Provider
      value={{ authToken, updateAuthToken, removeAuthToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContextProvider;
export const useAuth = () => useContext(AuthContext);
