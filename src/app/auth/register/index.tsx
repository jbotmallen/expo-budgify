import React, { useState } from 'react'
import { ActivityIndicator, Alert, Image, Modal, Pressable, Text, TextInput, View } from "react-native";
import { router } from 'expo-router'
import { useAuth } from '@/utils/context/AuthContext';

const Register = () => {
    const [secureText, setSecureText] = useState(true);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({
        email: '',
        password: ''
    });

    const { register } = useAuth();

    const handleRegister = async () => {
        if (!user.email || !user.password) return Alert.alert('Please fill all the fields');
        setLoading(true);
        try {
            const res = await register(user.email, user.password);
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
                        <Text className=' bg-gray-900 text-3xl rounded-full p-3.5 w-16 h-16 text-center text-gray-200'>X</Text>
                    </Pressable>
                </View>
                <Image
                    source={require('../../../../public/register-bg.png')}
                    className='w-full h-full absolute -z-10'
                />
                <View className="absolute top-[10%] left-[8%] align-middle w-5/6 h-5/6 flex flex-col items-center justify-evenly rounded-xl bg-gray-900">
                    <Image
                        source={require('../../../../public/img/rg-pic.png')}
                        className='w-full h-1/4'
                    />
                    <View className='h-1/2 w-full flex flex-col justify-center items-center gap-7'>
                        <Text className='tracking-widest text-5xl font-semibold text-gray-300'>
                            Create an Account
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
                                placeholder={secureText ? "********" : "John@123"}
                                value={user.password}
                                secureTextEntry={secureText}
                                className='w-full p-3 bg-gray-700 rounded-lg text-gray-300 text-lg placeholder:text-gray-500 relative'
                            />
                            <Pressable onPress={() => setSecureText(!secureText)}
                                className='text-gray-300 text-2xl font-semibold absolute right-5 top-2'><Text className='text-gray-300'>{secureText ? "Show Password" : "Hide Password"}</Text></Pressable>
                        </View>
                        {loading ? (
                            <View className='flex-row justify-center'>
                                <ActivityIndicator color='violet' size={32} />
                            </View>
                        ) : (
                            <Pressable onPress={() => handleRegister()}
                                className='p-5 w-5/6 bg-green-500 rounded-lg'>
                                <Text className='text-center text-3xl font-semibold text-gray-200'>Sign-up</Text>
                            </Pressable>
                        )}
                    </View>
                </View>
            </Modal>
        </>
    )
}

export default Register