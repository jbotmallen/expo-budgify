import "../global.css";
import { Slot, router, useSegments } from "expo-router";
import { AuthProvider, useAuth } from "../utils/context/AuthContext"
import { useEffect } from "react";
import { ActivityIndicator } from "react-native";

const MainLayout = () => {
  const { isAuthenticated, user } = useAuth();
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

  if(user === false) return <ActivityIndicator size={96} color='white' />

  return <Slot />
}

export default function Layout() {
  return (
    <AuthProvider>
      <MainLayout />
    </AuthProvider>
  )
}