import { View, Text, Modal, Pressable, TextInput, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { Link } from 'expo-router'
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { numbers } from '@/constants/constants';
import { Picker } from '@react-native-picker/picker';

export default function Add() {
    const [value, setValue] = useState('');
    const [selectedValue1, setSelectedValue1] = useState("option1");
    const [selectedValue2, setSelectedValue2] = useState("");

    return (
        <Modal animationType="slide" transparent={false}>
            <View className='bg-slate-800 h-screen w-screen px-5 flex flex-col justify-center gap-5 items-center'>
                <View className='w-full h-[45%] flex flex-col justify-start items-center gap-1'>
                    <View className='flex flex-row items-center w-full h-1/6 justify-between'>
                        <Link href="/home">
                            <View className='flex flex-row items-center gap-2 w-1/2'>
                                <AntDesign name="close" size={24} color="gray" />
                                <Text className='text-3xl text-slate-400 font-medium'>cancel</Text>
                            </View>
                        </Link>
                        <Pressable>
                            <View className='flex flex-row items-center gap-2'>
                                <AntDesign name="check" size={24} color="gray" />
                                <Text className='text-3xl text-slate-400 font-medium'>save</Text>
                            </View>
                        </Pressable>
                    </View>
                    <View className='w-full h-1/6 flex flex-row justify-between items-center'>
                        <Pressable className='w-1/2 h-4/5 border-2 border-slate-400 flex flex-row items-center justify-between rounded-2xl px-5'>
                            <Text className={`${value ? "text-2xl" : "text-3xl"} text-slate-400`}>{value ? value : "expenses"}</Text>
                            <Ionicons name="caret-down" size={24} color="gray" />
                        </Pressable>
                        <Pressable className='w-1/2 h-4/5 border-2 border-slate-400 flex flex-row items-center justify-between rounded-2xl px-5'>
                            <Text className={`${value ? "text-2xl" : "text-3xl"} text-slate-400`}>{value ? value : "category"}</Text>
                            <Ionicons name="caret-down" size={24} color="gray" />
                        </Pressable>
                    </View>
                    <View className='w-full h-2/5 grid row-span-2 gap-1'>
                        <Text className='text-2xl text-slate-400 tracking-wider font-bold text-left'>Description</Text>
                        <TextInput
                            className='w-full h-4/5 border-slate-400 border-4 rounded-2xl text-2xl text-slate-300 placeholder:text-slate-400'
                        />
                    </View>
                    <View className='w-full h-1/6 grid row-span-2 gap-1'>
                        <Text className='text-2xl text-slate-400 font-bold tracking-wider text-left'>Transaction date</Text>
                        <TextInput
                            placeholder='Pick a date'
                            className='px-5 w-full h-full border-slate-400 border-4 rounded-2xl relative text-2xl text-slate-300 tracking-wider placeholder:text-slate-400'
                        />
                        <Ionicons name="calendar" size={32} color="slategray" className='absolute top-2/3 right-8' />
                    </View>
                </View>
                <View className='w-full h-1/2 flex flex-col gap-3'>
                    <View className='w-full h-1/4 border-slate-400 border-4 flex flex-row items-center justify-between rounded-2xl'>
                        <TextInput
                            className='text-right w-3/4 text-6xl font-semibold text-slate-300 placeholder:text-slate-400 flex'
                            keyboardType='numeric'
                            value={value}
                            onChangeText={(text) => setValue(text)}
                            placeholder='0'
                        />
                        <View className='w-1/4 h-full flex items-center justify-center'>
                            <Ionicons name="backspace" size={75} color="slategray" />
                        </View>
                    </View>
                    <View className='w-full h-4/5 flex flex-wrap gap-2 pr-4'>
                        {numbers.map((item, index) => (
                            <CustomPressables value={item} key={index} />
                        ))}
                        <View className='w-1/3 h-1/5 flex flex-row justify-center items-center gap-1'>
                            <Pressable className='w-1/2 h-full border-4 border-slate-400 rounded-2xl flex justify-center items-center'>
                                <Text className='text-5xl font-bold text-slate-400'>{"<"}</Text>
                            </Pressable>
                            <Pressable className='w-1/2 h-full border-4 border-slate-400 rounded-2xl flex justify-center items-center'>
                                <Text className='text-5xl font-bold text-slate-400'>{">"}</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </View>
            <Text>Add</Text>
        </Modal >
    )
}

const CustomPressables = ({ value }) => {
    return (
        <Pressable className='w-1/3 h-1/5 border-slate-400 border-4 rounded-2xl flex justify-center items-center'>
            <Text className='text-5xl font-bold text-slate-400'>{value}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
    },
    picker: {
        width: '100%',
        borderWidth: 2,
        borderRadius: 5,
        borderColor: 'white',
        color: 'slategray',
        fontSize: 30,
        fontWeight: 'bold',
    },
});