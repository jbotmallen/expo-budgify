import { View, Text, Pressable, Alert, Image } from "react-native";
import React from "react";
import { useAuth } from "@/utils/context/AuthContext";
import { SimpleLineIcons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function Header() {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    Alert.alert(
      `Logout ${user.email.split("@")[0]}`,
      "Are you sure you want to logout?",
      [
        {
          text: "Yes",
          onPress: async () => {
            try {
              const res = await logout();
              if (!res.success) {
                return Alert.alert(res.msg);
              } else {
                router.replace("/auth/login");
              }
            } catch (error) {
              return Alert.alert(
                "Error",
                "An error occured while logging out."
              );
            }
          },
        },
        {
          text: "No",
        },
      ]
    );
  };

  return (
    <View className="bg-[#13304B] w-screen h-[8%] pl-1 pr-8 fixed flex justify-center top-0">
      <View className="w-full flex flex-row justify-between items-center">
        <Image
          source={require("../../../../public/logo.png")}
          style={{ height: 150, width: 150 }}
        />
        <Pressable onPress={() => handleLogout()}>
          <SimpleLineIcons name="logout" size={20} color="white" />
        </Pressable>
      </View>
    </View>
  );
}
