import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { useAuth } from '@/utils/context/AuthContext'
import { AntDesign } from '@expo/vector-icons';

export default function Home() {
  const { user } = useAuth();

  return (
    <View className="pt-10 h-screen bg-slate-800 px-5 relative">
      <Text className='text-slate-500 text-4xl tracking-widest text-left flex'>Hello,
        <Text className='text-slate-300'>{" "} {user?.email.split("@")[0]}!</Text>
      </Text>
      <AntDesign className='absolute right-10 bottom-1/4' name="pluscircle" size={80} color="gray" />
    </View>
  )
}