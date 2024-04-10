import { View, Text, Pressable, Alert } from 'react-native'
import React from 'react'
import { useAuth } from '@/utils/context/AuthContext';
import { SimpleLineIcons } from '@expo/vector-icons';

export default function Header() {
    const { logout, user } = useAuth();

    const handleLogout = async () => {
        const res = await logout();
        if (!res.success) return Alert.alert(res.msg);
    }

    return (
        <View className="bg-slate-950 p-5 w-screen h-28 fixed flex justify-center rounded-b-xl top-0">
            <View className='w-full flex'>
                <Text className='text-slate-400 text-4xl tracking-wider text-left flex'>BUDGIFY</Text>
                <Pressable className='absolute right-0 top-0' onPress={() => handleLogout()}>
                    <SimpleLineIcons name="logout" size={26} color="white" />
                </Pressable>
            </View>
        </View>
    )
}