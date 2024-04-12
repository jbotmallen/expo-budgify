import { View, Text, Pressable, Alert } from 'react-native'
import React from 'react'
import { useAuth } from '@/utils/context/AuthContext';
import { SimpleLineIcons } from '@expo/vector-icons';

export default function Header() {
    const { logout } = useAuth();

    const handleLogout = async () => {
        const res = await logout();
        if (!res.success) return Alert.alert(res.msg);
    }

    return (
        <View className="bg-slate-950 p-5 w-screen h-16 fixed flex justify-center rounded-b-xl top-0">
            <View className='w-full flex flex-row justify-between items-center'>
                <Text className='text-slate-400 text-2xl tracking-wider text-left'>BUDGIFY</Text>
                <Pressable onPress={() => handleLogout()}>
                    <SimpleLineIcons name="logout" size={20} color="white" />
                </Pressable>
            </View>
        </View>
    )
}