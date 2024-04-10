import React from 'react';
import { Image, Modal, Pressable, Text, View } from "react-native";
import { router } from 'expo-router';

const Page = () => {
    return (
        <>
            <Modal animationType='fade'>
                <View className="h-screen w-screen bg-gray-800 flex flex-col items-center justify-around">
                    <Image
                        source={{
                            uri: "https://png.pngtree.com/background/20220729/original/pngtree-group-of-people-looking-for-information-on-interactive-panel-3d-isometric-picture-image_1867481.jpg",
                        }}
                        className='w-full h-1/2 mx-auto'
                    />
                    <View className='flex flex-row'>
                        <Text className='text-5xl font-semibold tracking-widest text-gray-400'>Welcome to</Text>
                        <Text className='text-5xl font-semibold tracking-widest text-gray-300'> Budgify!</Text>
                    </View>
                    <View className='w-full h-1/4 flex flex-col items-center justify-center gap-10'>
                        <Pressable
                            onPress={() => router.replace("/auth/login")}
                            className='p-5 w-5/6 bg-blue-500 rounded-lg'
                        >
                            <Text className='text-center text-3xl font-semibold text-gray-200'>Login</Text>
                        </Pressable>
                        <Pressable
                            onPress={() => router.replace("/auth/register")}
                            className='p-5 w-5/6 bg-green-500 rounded-lg'
                        >
                            <Text className='text-center text-3xl font-semibold text-gray-200'>Register</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </>
    );
};

export default Page;