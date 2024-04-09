import { router } from 'expo-router';
import React, { useEffect, useState } from 'react'
import { Image, Modal, Pressable, Text, TextInput, View } from "react-native";

const Register = () => {
    const [modal, setModal] = useState(true);
    const [secureText, setSecureText] = useState(true);

    useEffect(() => {
        setModal(true)
        setSecureText(true);
    }, [])

    return (
        <>
            <Modal animationType="slide" transparent={true} visible={modal}>
                <View className='h-full w-full relative flex items-center justify-center'>
                    <Pressable
                        onPress={() => {
                            setModal(false);
                            router.replace('/')
                        }}
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
                            <TextInput placeholder='email@example.com' className='w-full p-3 bg-gray-700 rounded-lg text-gray-300 text-lg placeholder:text-gray-500' />
                        </View>
                        <View className='w-5/6'>
                            <Text className='text-2xl font-semibold text-gray-300'>Username</Text>
                            <TextInput placeholder='John Doe' className='w-full p-3 bg-gray-700 rounded-lg text-gray-300 text-lg placeholder:text-gray-500' />
                        </View>
                        <View className='w-5/6'>
                            <Text className='text-2xl font-semibold text-gray-300'>Password</Text>
                            <TextInput placeholder={secureText ? "********" : "John@123"} secureTextEntry={secureText} className='w-full p-3 bg-gray-700 rounded-lg text-gray-300 text-lg placeholder:text-gray-500 relative' />
                            <Pressable onPress={() => setSecureText(!secureText)}
                                className='text-gray-300 text-2xl font-semibold absolute right-5 top-2'><Text className='text-gray-300'>{secureText ? "Hide Password" : "Show Password"}</Text></Pressable>
                        </View>
                        <Pressable onPress={() => setModal(!modal)}
                            className='p-5 w-5/6 bg-green-500 rounded-lg'>
                            <Text className='text-center text-3xl font-semibold text-gray-200'>Sign-Up</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </>
    )
}

export default Register