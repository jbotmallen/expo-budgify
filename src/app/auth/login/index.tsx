import { useAuth } from "@/utils/context/AuthContext";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  Modal,
  Pressable,
  Text,
  Platform,
  TextInput,
  View,
  KeyboardAvoidingView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Login = () => {
  const [secureText, setSecureText] = useState(true);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { login } = useAuth();

  const handleLogin = async () => {
    if (!user.email || !user.password)
      return Alert.alert("Please fill all the fields");
    setLoading(true);
    try {
      const res = await login(user.email, user.password);
      setLoading(false);
      if (!res.success) return Alert.alert(res.msg);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Modal animationType="slide" transparent={true}>
        <KeyboardAvoidingView
          className="fixed"
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View className="min-h-full w-full flex items-center justify-center">
            <Pressable
              onPress={() => router.replace("/auth")}
              className="absolute top-5 right-5 z-10"
            >
              <Text className=" bg-gray-200 text-3xl rounded-full p-1.5 w-12 h-12 text-center">
                ×
              </Text>
            </Pressable>
          </View>
          <Image
            source={require("../../../../public/login-bg.png")}
            className="w-full h-full absolute -z-10"
          />
          <View className="absolute top-[10%] left-[3.5%] border-2 border-white w-11/12 h-5/6 flex flex-col align-middle items-center rounded-xl bg-gray-900">
            <Image
              source={require("../../../../public/img/lg-pic.png")}
              className="w-full h-1/4 rounded-t-xl"
            />
            <View className="h-3/5 w-full flex flex-col justify-center items-center gap-10 absolute top-[28%]">
              <Text className="tracking-widest text-4xl font-bold text-gray-300 ">
                Login to Continue
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

                <Text
                  onPress={() => router.replace("/auth/reset")}
                  className="text-slate-300 text-md font-semibold mt-2 flex text-right"
                >
                  Forgot Password?
                </Text>
              </View>
              {loading ? (
                <View className="flex-row justify-center">
                  <ActivityIndicator color="violet" size={32} />
                </View>
              ) : (
                <Pressable
                  onPress={() => handleLogin()}
                  className="py-4 w-5/6 bg-blue-500 rounded-lg"
                >
                  <Text className="text-center text-2xl font-semibold text-gray-200">
                    Sign-In
                  </Text>
                </Pressable>
              )}
            </View>
          </View>
          <Text className="text-gray-300 text-lg font-semibold absolute bottom-20 text-center bg-gray-600 py-3 px-8 rounded-r-full">
            No account yet?{" "}
            <Text
              onPress={() => router.replace("/auth/register")}
              className="text-green-400 text-lg"
            >
              Register Now!
            </Text>
          </Text>
        </KeyboardAvoidingView>
      </Modal>
    </>
  );
};

export default Login;
