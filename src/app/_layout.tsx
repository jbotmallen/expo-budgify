import "../global.css";
import { Slot, router, useSegments } from "expo-router";
import { AuthProvider, useAuth } from "../utils/context/AuthContext"
import { useEffect } from "react";

const MainLayout = () => {
  const { isAuthenticated } = useAuth();
  const segments = useSegments();

  useEffect(() => {
    if(typeof isAuthenticated == 'undefined') return

    const inApp = segments[0] == '(pages)'
    
    if (isAuthenticated && !inApp) {
      router.replace('/home');
    } else if (isAuthenticated == false) {
      router.replace('/auth/');
    }
  }, [isAuthenticated]);

  return <Slot />
}

export default function Layout() {
  return (
    <AuthProvider>
      <MainLayout />
    </AuthProvider>
  )
}
