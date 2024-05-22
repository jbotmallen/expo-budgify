import {
  View,
  Text,
  Modal,
  Pressable,
  Image,
  TextInput,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { router, usePathname } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "@/utils/context/AuthContext";

export default function Reset() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const { reset } = useAuth();
  const path = usePathname();

  const handleSubmit = async () => {
    if (!email) return Alert.alert("Error", "Email is required");
    setLoading(true);
    try {
      const res = await reset(email);
      if (res.success) {
        Alert.alert(
          "Success",
          "Password reset instructions sent to your email",
          [
            {
              text: "OK",
              onPress: () => router.replace("/auth/login"),
            },
          ]
        );
      } else {
        Alert.alert("Error", res.msg);
      }
    } catch (error) {
      setLoading(false);
      router.push(`/error/?path=${path}`);
    }
    setLoading(false);
  };

  return (
    <Modal animationType="slide" transparent={true}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View className="h-screen w-screen flex flex-1 justify-center items-center">
          <Image
            source={require("../../../../public/reset-bg.png")}
            className="w-full h-full absolute -z-10"
          />
          <View className="border-2 border-white w-11/12 h-2/3 rounded-xl bg-gray-900">
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
                  keyboardType="email-address"
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
        </View>
      </KeyboardAvoidingView>
      {loading ? (
        <View className="flex-row justify-center">
          <ActivityIndicator color="violet" size={32} />
        </View>
      ) : (
        <Text className="bg-gray-600 py-4 px-8 rounded-r-full text-gray-300 text-xl font-semibold absolute bottom-[15%]">
          What to do?{" "}
          <Text
            onPress={() => router.replace("/auth/login")}
            className="text-blue-400 text-lg"
          >
            {" "}
            Login Now!
          </Text>
          <Text
            className="text-gray-400 text-lg"
          >
            {" "}
            or
          </Text>
          <Text
            onPress={() => router.replace("/auth/register")}
            className="text-green-400 text-lg"
          >
            {" "}
            Register Here!
          </Text>
        </Text>
      )}
    </Modal>
  );
}
