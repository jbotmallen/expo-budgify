import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase/firebase-config";
import { errorChecks } from "../../constants/checks";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null | undefined);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(null);

      if (user) {
        setUser(user);
        setIsAuthenticated(true);
        setFetching(false);
      } else {
        setUser(null);
        setIsAuthenticated(false);
        setFetching(false);
      }
    });

    return unsubscribe;
  }, []);

  const login = async (email, password) => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      return { success: true, data: response?.user };
    } catch (error) {
      let msg = errorChecks(error.message);
      return { success: false, msg };
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      return { success: true };
    } catch (error) {
      let msg = errorChecks(error.message);
      return { success: false, msg };
    }
  };

  const register = async (email, password) => {
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      return { success: true, data: response?.user };
    } catch (error) {
      let msg = errorChecks(error.message);
      return { success: false, msg };
    }
  };

  const reset = async (email) => {
    if (!email) {
      return { success: false, msg: "Please enter a valid email" };
    }
    try {
      await sendPasswordResetEmail(auth, email);
      return { success: true };
    } catch (error) {
      let msg = errorChecks(error.message);
      return { success: false, msg };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        fetching,
        login,
        logout,
        register,
        reset,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
