import { View, Text, Pressable, Alert, Image } from 'react-native'
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
        <View className="bg-slate-950 w-screen h-[8%] pr-5 fixed flex justify-center rounded-b-xl top-0">
            <View className='w-full flex flex-row justify-between items-center'>
                <Image source={require('../../../../public/logo.png')} style={{ height: 200, width: 200 }} />
                <Pressable onPress={() => handleLogout()}>
                    <SimpleLineIcons name="logout" size={20} color="white" />
                </Pressable>
            </View>
        </View>
    )
}