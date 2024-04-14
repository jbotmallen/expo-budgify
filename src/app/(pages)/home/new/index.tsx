import { View, Text, Modal, Pressable, TextInput, ScrollView, ActivityIndicator, Alert } from 'react-native'
import React, { useState } from 'react'
import { Link, router } from 'expo-router'
import DatePicker from '@react-native-community/datetimepicker';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { numbers, expenseChoices, categoryChoices } from '@/constants/constants';
import { useAuth } from '@/utils/context/AuthContext';
import { useBudget } from '@/utils/context/BudgetContext';

export default function Add() {
    const { user } = useAuth();
    const { addBudget } = useBudget();

    const [visible, setVisible] = useState('');
    const [loading, setLoading] = useState(false);
    const [formValues, setFormValues] = useState({
        value: '',
        expenses: '',
        category: '',
        description: '',
        date: new Date(),
    });
    const [showDatePicker, setShowDatePicker] = useState(false);

    const handlePress = (item: string) => {
        if (item !== '.') {
            setFormValues(prevValues => ({ ...prevValues, value: prevValues.value + item }));
        } else {
            setFormValues(prevValues => {
                if (prevValues.value === '') {
                    return { ...prevValues, value: '0.' };
                } else if (prevValues.value.includes('.')) {
                    return prevValues;
                } else {
                    return { ...prevValues, value: prevValues.value + '.' };
                }
            });
        }
    }

    const handleDateChange = (event, selectedDate: Date) => {
        const currentDate = selectedDate || formValues.date;
        setFormValues({ ...formValues, date: currentDate });
        setShowDatePicker(false);
    };

    const handleSave = async () => {
        if (formValues.value === '' || formValues.expenses === '' || formValues.category === '') {
            return Alert.alert('Error', 'Please fill in all fields');
        }
        setLoading(true);

        try {
            const res = await addBudget(formValues, user.uid);
            if (!res.success) return Alert.alert('Error', res.msg);
            else {
                Alert.alert('Success', 'Transaction added successfully');
                router.replace('/home');
            }
        } catch (error) {
            Alert.alert('Error', 'An error occurred. Please try again later');
        }

        setLoading(false);
    }

    return (
        <>
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
                            <Pressable onPress={handleSave}>
                                <View className='flex flex-row items-center gap-2'>
                                    <AntDesign name="check" size={24} color="gray" />
                                    <Text className='text-3xl text-slate-400 font-medium'>save</Text>
                                </View>
                            </Pressable>
                        </View>
                        {loading ? (
                            <ActivityIndicator size="large" color="gray" />
                        ) : (
                            <>
                                <View className='w-full h-1/6 flex flex-row justify-between items-center'>
                                    <Pressable onPress={() => setVisible('expense')} className='w-1/2 h-4/5 border-2 border-slate-400 flex flex-row items-center justify-between rounded-2xl px-5'>
                                        <Text className={`${formValues.expenses ? "text-2xl" : "text-3xl"} text-slate-400`}>{formValues.expenses ? formValues.expenses : "expenses"}</Text>
                                        <Ionicons name="caret-down" size={24} color="gray" />
                                    </Pressable>
                                    <Pressable onPress={() => setVisible('category')} className='w-1/2 h-4/5 border-2 border-slate-400 flex flex-row items-center justify-between rounded-2xl px-5'>
                                        <Text className={`${formValues.category ? "text-2xl" : "text-3xl"} text-slate-400`}>{formValues.category ? formValues.category : "category"}</Text>
                                        <Ionicons name="caret-down" size={24} color="gray" />
                                    </Pressable>
                                </View>
                                <View className='w-full h-2/5 grid row-span-2 gap-1'>
                                    <Text className='text-2xl text-slate-400 tracking-wider font-bold text-left'>Description</Text>
                                    <TextInput
                                        editable
                                        multiline
                                        numberOfLines={4}
                                        value={formValues.description}
                                        onChangeText={text => setFormValues({ ...formValues, description: text })}
                                        placeholder='Enter description here...'
                                        className='p-5 w-full text-left border-slate-400 border-4 rounded-2xl relative text-2xl text-slate-300 tracking-wider placeholder:text-slate-400'
                                    />
                                </View>
                                <View className='w-full h-1/6 grid row-span-2 gap-1'>
                                    <Text className='text-2xl text-slate-400 font-bold tracking-wider text-left'>Transaction date</Text>
                                    <Pressable onPress={() => setShowDatePicker(true)} className='px-5 w-full h-full flex flex-row items-center justify-between border-slate-400 border-4 rounded-2xl relative text-2xl text-slate-300 tracking-wider placeholder:text-slate-400'>
                                        <Text className='text-2xl text-slate-300 tracking-wider'>{formValues.date.toLocaleDateString()}</Text>
                                        <Ionicons name="calendar" size={30} color="slategray" />
                                    </Pressable>
                                </View>
                            </>
                        )}
                    </View>
                    {!loading && (
                        <View className='w-full h-1/2 flex flex-col gap-3'>
                            <View className='w-full h-1/4 border-slate-400 border-4 flex flex-row items-center justify-between rounded-2xl'>
                                <Text className='text-right w-3/4 text-6xl font-semibold text-slate-300 placeholder:text-slate-400 flex'>
                                    {formValues.value ? formValues.value : "0"}
                                </Text>
                                <View className='w-1/4 h-full flex items-center justify-center'>
                                    <Ionicons name="backspace" size={75} color="slategray" onPress={() => setFormValues(prevValues => ({ ...prevValues, value: prevValues.value.slice(0, -1) }))} />
                                </View>
                            </View>
                            <View className='w-full h-4/5 flex flex-wrap gap-2 pr-4'>
                                {numbers.map((item, index) => (
                                    <Pressable
                                        onPress={() => handlePress(item)}
                                        key={index}
                                        className='w-1/3 h-1/5 border-slate-400 border-4 rounded-2xl flex justify-center items-center'
                                    >
                                        <Text className='text-5xl font-bold text-slate-400'>{item}</Text>
                                    </Pressable>
                                ))}
                            </View>
                        </View>
                    )}
                </View>
            </Modal >
            <Modal animationType="slide" transparent={false} visible={visible !== ''}>
                <View className='h-full w-full bg-slate-200 flex items-center justify-center relative'>
                    <Ionicons name="close" size={50} color="gray" onPress={() => setVisible('')} className='absolute top-8 right-10 z-10' />
                    <ScrollView
                        className='max-h-5/6 h-5/6 w-5/6 rounded-xl my-10 relative'
                    >
                        <Text className='text-4xl font-medium mb-2'>Choose your {visible}</Text>
                        {(visible === 'expense' ? expenseChoices : categoryChoices).map((item, index) => (
                            <Pressable className='border-b flex flex-col p-5' key={index} onPress={() => {
                                if (visible === 'expense') {
                                    setFormValues({ ...formValues, expenses: item })
                                } else {
                                    setFormValues({ ...formValues, category: item })
                                }
                                setVisible('')
                            }}>
                                <Text className='text-3xl'>{item}</Text>
                            </Pressable>
                        ))}
                    </ScrollView>
                </View>
            </Modal>
            {showDatePicker && (
                <DatePicker
                    value={formValues.date}
                    mode="date"
                    display="default"
                    onChange={handleDateChange}
                    maximumDate={new Date()}
                />
            )}
        </>
    )
}