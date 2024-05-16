import "../global.css";
import { Slot, router, useSegments } from "expo-router";
import { AuthProvider, useAuth } from "../utils/context/AuthContext";
import { useEffect } from "react";
import { StatusBar } from "react-native";

const MainLayout = () => {
  const { isAuthenticated, user, fetching } = useAuth();
  const segments = useSegments();

  useEffect(() => {
    if (fetching) return;
    if (typeof isAuthenticated == "undefined") return;

    const inApp = segments[0] == "(pages)";

    if (isAuthenticated && !inApp) {
      router.replace("/home");
    } else if (isAuthenticated == false) {
      router.replace("/auth/");
    }
  }, [isAuthenticated, fetching]);

  return <Slot />;
};

export default function Layout() {
  return (
    <AuthProvider>
      <StatusBar hidden={true} />

      <MainLayout />
    </AuthProvider>
  );
}
