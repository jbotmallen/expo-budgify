import { useAuth } from '@/utils/context/AuthContext';
import { router } from 'expo-router';
import React, { useState } from 'react'
import { Image, Modal, Pressable, Text, TextInput, View, Alert, ActivityIndicator } from "react-native";

const Login = () => {
    const [secureText, setSecureText] = useState(true);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({
        email: '',
        password: ''
    });

    const { login } = useAuth();

    const handleLogin = async () => {
        if (!user.email || !user.password) return Alert.alert('Please fill all the fields');
        setLoading(true);
        try {
            const res = await login(user.email, user.password);
            setLoading(false);
            if(!res.success) return Alert.alert(res.msg);
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <Modal animationType="slide" transparent={true}>
                <View className='h-full w-full relative flex items-center justify-center'>
                    <Pressable
                        onPress={() => router.replace('/auth')}
                        className='absolute top-5 right-5 z-10'
                    >
                        <Text className=' bg-gray-200 text-3xl rounded-full p-3.5 w-16 h-16 text-center'>X</Text>
                    </Pressable>
                </View>
                <Image
                    source={require('../../../../public/login-bg.png')}
                    className='w-full h-full absolute -z-10'
                />
                <View className="absolute top-[15%] left-[8%] align-middle w-5/6 h-3/4 flex flex-col items-center justify-evenly rounded-xl bg-gray-900">
                    <Image
                        source={require('../../../../public/img/lg-pic.png')}
                        className='w-full h-1/3'
                    />
                    <View className='h-1/2 w-full flex flex-col justify-center items-center gap-7'>
                        <Text className='tracking-widest text-5xl font-semibold text-gray-300'>
                            Login to Continue
                        </Text>
                        <View className='w-5/6'>
                            <Text className='text-2xl font-semibold text-gray-300'>Email</Text>
                            <TextInput
                                onChangeText={(text) => setUser((prev) => ({ ...prev, email: text }))}
                                value={user.email}
                                placeholder='email@example.com'
                                className='w-full p-3 bg-gray-700 rounded-lg text-gray-300 text-lg placeholder:text-gray-500'
                            />
                        </View>
                        <View className='w-5/6'>
                            <Text className='text-2xl font-semibold text-gray-300'>Password</Text>
                            <TextInput
                                onChangeText={(text) => setUser((prev) => ({ ...prev, password: text }))}
                                placeholder='********'
                                secureTextEntry={secureText}
                                value={user.password}
                                className='w-full p-3 bg-gray-700 rounded-lg text-gray-300 text-lg placeholder:text-gray-500 relative'
                            />
                            <Pressable
                                onPress={() => setSecureText(!secureText)}
                                className='text-gray-300 text-2xl font-semibold absolute right-5 top-2'
                            >
                                <Text className='text-gray-300'>{secureText ? "Show Password" : "Hide Password"}</Text>
                            </Pressable>
                        </View>
                        {loading ? (
                            <View className='flex-row justify-center'>
                                <ActivityIndicator color='violet' size={32} />
                            </View>
                        ) : (
                            <Pressable onPress={() => handleLogin()}
                                className='p-5 w-5/6 bg-blue-500 rounded-lg'>
                                <Text className='text-center text-3xl font-semibold text-gray-200'>Sign-In</Text>
                            </Pressable>
                        )}
                    </View>
                </View>
            </Modal>
        </>
    )
}

export default Login