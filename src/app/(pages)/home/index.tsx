import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { useAuth } from '@/utils/context/AuthContext'
import { AntDesign } from '@expo/vector-icons';
import Card from './_components/Card';
import { Link } from 'expo-router';

export default function Home() {
  const { user } = useAuth();

  return (
    <View className="p-10 h-screen bg-slate-800 relative flex-1 gap-10">
      <Text className='font-bold text-slate-400 text-4xl tracking-widest text-left flex'>Hello,
        <Text className='text-slate-300'>{" "} {user?.email.split("@")[0]}!</Text>
      </Text>
      <View className='max-h-3/4 w-full flex flex-col gap-8 border-4 border-slate-400 p-5 rounded-3xl'>
        <Card />
        <Card />
      </View>
      <Link href="/home/new" className='absolute bottom-20 right-8'>
        <AntDesign name="pluscircle" size={60} color="gray" />
      </Link>
    </View>
  )
}