import { Redirect } from "expo-router";
// import { useAuth } from "../context/AuthContext";
export default () => {
  // const { authToken, removeAuthToken } = useAuth();
  // removeAuthToken();
  return <Redirect href={"/feeds"} />;
};
