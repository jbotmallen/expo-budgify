import React from 'react';
import { Dimensions, Image, Modal, Pressable, Text, View } from "react-native";
import { router } from 'expo-router';
import { Ionicons } from "@expo/vector-icons";

const Page = () => {
    const dimensions = Dimensions.get('window');

    return (
        <>
            <Modal animationType='fade'>
                <View className="h-screen w-screen bg-gray-800 flex flex-col items-center justify-around pt-5">
                    <Image
                        source={{
                            uri: "https://png.pngtree.com/background/20220729/original/pngtree-group-of-people-looking-for-information-on-interactive-panel-3d-isometric-picture-image_1867481.jpg",
                        }}
                        className='w-full h-2/5 object-cover'
                    />
                    <Image source={require('../../../public/logo.png')} className='h-1/5 w-full' />
                    <View className='w-full h-2/5 flex flex-col items-center justify-center gap-10 -mt-20'>
                        <Pressable
                            onPress={() => router.replace("/auth/login")}
                            className='p-5 w-2/3 bg-blue-500 rounded-lg flex flex-row items-center justify-center gap-3'
                        >
                            <Ionicons name='log-in' size={30} color='white' />
                            <Text className='text-center text-3xl font-semibold text-gray-100'>Login</Text>
                        </Pressable>
                        <Pressable
                            onPress={() => router.replace("/auth/register")}
                            className='p-5 w-2/3 bg-green-500 rounded-lg flex flex-row items-center justify-center gap-3'
                        >
                            <Ionicons name='person-add' size={30} color='white' />
                            <Text className='text-center text-3xl font-semibold text-gray-100'>Register</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </>
    );
};

export default Page;