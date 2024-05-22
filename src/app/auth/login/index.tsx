import { useAuth } from "@/utils/context/AuthContext";
import { router, usePathname } from "expo-router";
import React, { useEffect, useState } from "react";
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
  Keyboard,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Login = () => {
  const [keyBoardVisible, setKeyBoardVisible] = useState(false);
  const [secureText, setSecureText] = useState(true);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyBoardVisible(true);
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyBoardVisible(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const { login } = useAuth();
  const path = usePathname();

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
      setLoading(false);
      router.push(`/error/?path=${path}`);
    }
  };

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <Modal animationType="slide" transparent={true}>
          <View className={`h-screen w-screen flex flex-1 ${keyBoardVisible ? "justify-start" : "justify-center"} items-center absolute`}>
            <Image
              source={require("../../../../public/login-bg.png")}
              className="w-full h-full absolute -z-10"
            />
            <View className="border-2 border-white w-11/12 h-4/5 rounded-xl bg-gray-900 relative">
              <Image
                source={require("../../../../public/img/lg-pic.png")}
                className="w-full h-1/4 rounded-t-xl"
              />
              <View className="h-3/5 w-full flex flex-col justify-center items-center gap-6 sm:gap-10 absolute top-[28%]">
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
                    keyboardType="email-address"
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
                      keyboardType="default"
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
          </View>
          {!keyBoardVisible && (
            <Text className="text-gray-300 text-lg font-semibold absolute bottom-10 text-center bg-gray-600 py-3 px-8 rounded-r-full">
              No account yet?{" "}
              <Text
                onPress={() => router.replace("/auth/register")}
                className="text-green-400 text-lg"
              >
                Register Now!
              </Text>
            </Text>
          )}
        </Modal>
      </KeyboardAvoidingView>
    </>
  );
};

export default Login;
