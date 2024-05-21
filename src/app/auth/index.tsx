import React from "react";
import { Image, Modal, Pressable, Text, View } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const Page = () => {
  return (
    <>
      <Modal animationType="fade">
        <View className="bg-gray-800 flex flex-1 flex-col items-center pt-5 gap-10">
          <Image
            source={{
              uri: "https://png.pngtree.com/background/20220729/original/pngtree-group-of-people-looking-for-information-on-interactive-panel-3d-isometric-picture-image_1867481.jpg",
            }}
            className="w-full h-2/5 object-cover"
          />
          <Image
            source={require("../../../public/logo.png")}
            className="h-1/5 w-full"
          />
          <View className="w-full h-2/5 flex flex-col items-center justify-center gap-5 -mt-20">
            <Pressable
              onPress={() => router.replace("/auth/login")}
              className="py-5 w-4/5 bg-blue-500 rounded-xl flex flex-row items-center justify-center gap-3"
            >
              <Ionicons name="log-in" size={30} color="white" />
              <Text className="text-center text-3xl font-semibold text-gray-100">
                Login
              </Text>
            </Pressable>
            <Pressable
              onPress={() => router.replace("/auth/register")}
              className="py-5 w-4/5 bg-green-500 rounded-xl flex flex-row items-center justify-center gap-3"
            >
              <Ionicons name="person-add" size={30} color="white" />
              <Text className="text-center text-3xl font-semibold text-gray-100">
                Register
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default Page;
