import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { View, Text, Pressable, Image, Modal } from 'react-native';
import { Ionicons } from "@expo/vector-icons";

function ErrorBoundary() {
    const path = useLocalSearchParams().path;
    return (
        <Modal animationType='slide'>
            <View className="relative bg-gray-800 h-screen w-screen flex items-center justify-center">
                <Image
                    source={require("../../public/error-bg.png")}
                    className="w-full h-full absolute -z-10"
                />
                <View className="bg-gray-900 flex items-center justify-center pt-5 gap-8 h-1/2 w-4/5 rounded-3xl">
                    <Image source={require('../../public/img/error-pic.png')} className="w-full h-1/2 object-cover" />
                    <Text className="text-3xl font-semibold text-gray-100">
                        An Error Occurred!
                    </Text>
                    <Pressable
                        className="text-xl font-semibold text-gray-100 bg-slate-300 p-6 flex flex-row items-center justify-center gap-3 rounded-xl w-4/5"
                        onPress={() => router.replace(path as string || '/')}
                    >
                        <Ionicons name="refresh-circle-outline" size={30} color="blue" />
                        <Text className='text-gray-900 text-3xl font-semibold'>Try Again</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    );
}

export default ErrorBoundary;
