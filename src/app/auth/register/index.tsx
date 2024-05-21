import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Modal,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { router, usePathname } from "expo-router";
import { useAuth } from "@/utils/context/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import ErrorBoundary from "@/app/error";

const Register = () => {
  const [secureText, setSecureText] = useState(true);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { register } = useAuth();
  const path = usePathname();

  const handleRegister = async () => {
    if (!user.email || !user.password)
      return Alert.alert("Please fill all the fields");
    setLoading(true);
    try {
      const res = await register(user.email, user.password);
      setLoading(false);
      if (!res.success) return Alert.alert(res.msg);
    } catch (error) {
      setLoading(false);
      router.push(`/error/?path=${path}`);
    }
  };
  return (
    <>
      <Modal animationType="slide" transparent={true}>
        <View className="h-full w-full relative flex items-center justify-center">
          <Pressable
            onPress={() => router.replace("/auth")}
            className="absolute top-5 right-5 z-10"
          >
            <Text className=" bg-gray-900 text-3xl rounded-full p-3.5 w-16 h-16 text-center text-gray-200">
              ×
            </Text>
          </Pressable>
        </View>
        <Image
          source={require("../../../../public/register-bg.png")}
          className="w-full h-full absolute -z-10"
        />
        <View className="absolute top-[10%] left-[3.5%] border-2 border-white w-11/12 h-5/6 flex flex-col align-middle items-center rounded-xl bg-gray-900">
          <Image
            source={require("../../../../public/img/rg-pic.png")}
            className="w-full h-1/3 rounded-t-xl"
          />
          <View className="h-3/5 w-full flex flex-col justify-center items-center gap-7">
            <Text className="tracking-widest text-4xl font-bold text-gray-300">
              Create an Account
            </Text>
            <View className="w-5/6">
              <View className="flex flex-row items-center justify-start w-full mb-3">
                <Ionicons name="mail" size={20} color="slategray" />
                <Text className="text-md font-semibold text-slate-300 ms-2">
                  Email
                </Text>
              </View>
              <TextInput
                onChangeText={(text) =>
                  setUser((prev) => ({ ...prev, email: text }))
                }
                value={user.email}
                placeholder="email@example.com"
                className="w-full p-3 bg-gray-700 rounded-lg text-gray-300 text-lg placeholder:text-gray-500"
              />
            </View>
            <View className="w-5/6">
              <View className="flex  justify-between align-middle">
                <View className="flex flex-row items-center w-full mb-3">
                  <Ionicons name="lock-closed" size={20} color="slategray" />
                  <Text className="text-md font-semibold text-slate-300 ms-2">
                    Password
                  </Text>
                </View>
              </View>
              <View className="bg-gray-700 rounded-lg flex flex-row justify-between ">
                <TextInput
                  onChangeText={(text) =>
                    setUser((prev) => ({ ...prev, password: text }))
                  }
                  placeholder="********"
                  secureTextEntry={secureText}
                  value={user.password}
                  className="text-gray-300 text-lg placeholder:text-gray-500 w-[80%] border-red-100  p-3"
                />
                <Pressable
                  onPress={() => setSecureText(!secureText)}
                  className="text-gray-300 text-2xl font-semibold w-[20%] border-red-100  p-3"
                >
                  <Ionicons
                    name={secureText ? "eye" : "eye-off"}
                    size={25}
                    color="slategray"
                  />
                </Pressable>
              </View>
            </View>
            {loading ? (
              <View className="flex-row justify-center">
                <ActivityIndicator color="violet" size={32} />
              </View>
            ) : (
              <Pressable
                onPress={() => handleRegister()}
                className="py-4 w-5/6 bg-green-500 rounded-lg"
              >
                <Text className="text-center text-3xl font-semibold text-gray-200">
                  Sign-up
                </Text>
              </Pressable>
            )}
          </View>
        </View>
        <Text className="text-gray-300 text-lg font-semibold absolute bottom-20 text-center bg-gray-600 py-3 px-8 rounded-r-full">
          Already have an account?{" "}
          <Text
            onPress={() => router.replace("/auth/login")}
            className="text-blue-400 text-lg"
          >
            {" "}
            Login Now!
          </Text>
        </Text>
      </Modal>
    </>
  );
};

export default Register;
