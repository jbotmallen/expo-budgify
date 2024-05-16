import {
  View,
  Text,
  Modal,
  Pressable,
  Image,
  TextInput,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "@/utils/context/AuthContext";

export default function Reset() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { reset } = useAuth();

  const handleSubmit = async () => {
    if (!email) return Alert.alert("Error", "Email is required");
    setLoading(true);
    try {
      const res = await reset(email);
      if (res.success) {
        Alert.alert(
          "Success",
          "Password reset instructions sent to your email"
        );
        router.replace("/auth/login");
      } else {
        Alert.alert("Error", res.msg);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <Modal animationType="slide" transparent={true}>
      <View className="h-full w-full relative flex items-center justify-center">
        <Pressable
          onPress={() => router.replace("/auth")}
          className="absolute top-5 right-5 z-10"
        >
          <Text className=" bg-gray-200 text-3xl rounded-full p-3.5 w-16 h-16 text-center">
            ×
          </Text>
        </Pressable>
      </View>
      <Image
        source={require("../../../../public/reset-bg.png")}
        className="w-full h-full absolute -z-10"
      />
      <View className="absolute top-[20%] border-2 border-white left-[3.5%] w-11/12 h-2/3 flex flex-col align-middle items-center rounded-xl bg-gray-900">
        <Image
          source={require("../../../../public/img/reset-pic.png")}
          className="w-full h-2/5 rounded-t-xl"
        />
        <View className="h-2/5 w-full flex flex-col justify-center items-center gap-5">
          <Text className="text-4xl font-bold text-gray-200 mt-12">
            Reset Password
          </Text>
          <View className="w-5/6 h-4/5 flex flex-col items-center justify-center">
            <View className="flex flex-row items-center justify-start w-full mb-3">
              <Ionicons name="mail" size={25} color="slategray" />
              <Text className="text-xl font-semibold text-slate-300 ms-2">
                Email
              </Text>
            </View>
            <TextInput
              onChangeText={(text) => setEmail(text)}
              value={email}
              placeholder="email@example.com"
              className="w-full p-3 bg-gray-700 rounded-lg text-gray-300 text-lg placeholder:text-gray-500"
            />
            <Pressable
              onPress={() => handleSubmit()}
              className="bg-orange-400 w-full p-3 rounded-lg mt-5"
            >
              <Text className="text-gray-800 text-2xl font-semibold text-center">
                Send Instructions
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
      {loading ? (
        <View className="flex-row justify-center">
          <ActivityIndicator color="violet" size={32} />
        </View>
      ) : (
        <Text className="bg-gray-600 py-3 px-8 rounded-r-full text-gray-300 text-lg font-semibold absolute bottom-[17%]">
          Remembered it?{" "}
          <Text
            onPress={() => router.replace("/auth/login")}
            className="text-blue-400 text-lg"
          >
            {" "}
            Login Now!
          </Text>
        </Text>
      )}
    </Modal>
  );
}
