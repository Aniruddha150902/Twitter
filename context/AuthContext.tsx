import { useRouter, useSegments } from "expo-router";
import { Route } from "expo-router/build/Route";
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
const AuthContext = createContext({});
const AuthContextProvider = ({ children }: PropsWithChildren) => {
  const [authToken, setAuthToken] = useState<string | null>(null);
  console.log(authToken);
  const segemnts = useSegments();
  console.log(segemnts);
  const router = useRouter();
  useEffect(() => {
    const isAuthGroup = segemnts[0] === "(auth)";
    if (!authToken && !isAuthGroup) {
      console.log("User is not yet authenticated and he cannot see this page");
      router.replace("/signIn");
    }
    if (authToken && isAuthGroup) {
      router.replace("/");
    }
  }, [segemnts, authToken]);
  return (
    <AuthContext.Provider value={{ authToken, setAuthToken }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContextProvider;
export const useAuth = () => useContext(AuthContext);
