import { useContext, createContext, useState, useEffect } from "react";
import { onAuthStateChanged, signOut as authSignOut } from "firebase/auth";
import { auth } from "./firebase";

const AuthUserContext = createContext({
  authUser: null,
  isLoading: true,
});

export default function useFirebaseAuth() {
  const [authUser, setAuthUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const authStateChange = async (user) => {
    setIsLoading(true);
    if (!user) {
      setAuthUser(null);
      setIsLoading(false);
      return;
    } else {
      setAuthUser({
        uid: user.uid,
        email: user.email,
        userName: user.displayName,
      });
      setIsLoading(false);
    }
  };

  const signOut = () => {
    authSignOut(auth).then(() => {
      setAuthUser(null);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, authStateChange);
    return () => unSubscribe();
  }, []);

  return { authUser, isLoading, setAuthUser, signOut };
}

export const AuthUserProvider = ({ children }) => {
  const auth = useFirebaseAuth();
  return (
    <AuthUserContext.Provider value={auth}>{children}</AuthUserContext.Provider>
  );
};

export const useAuth = () => useContext(AuthUserContext);
