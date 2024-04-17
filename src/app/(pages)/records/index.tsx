import { View, Text, Pressable, Alert, ActivityIndicator, ScrollView, TextInput } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import { recordTags } from '@/constants/constants';
import { useAuth } from '@/utils/context/AuthContext';
import { useBudget } from '@/utils/context/BudgetContext';
import { convertDateToString } from '../../../constants/functions';
import IonIcons from 'react-native-vector-icons/Ionicons';
import { router } from 'expo-router';

export default function Records() {
  const [selected, setSelected] = useState('Expense');
  const [loading, setLoading] = useState(false);
  const [records, setRecords] = useState([]);
  const [editing, setEditing] = useState(false);
  const [editId, setEditId] = useState('');
  const [description, setDescription] = useState('');

  const { user } = useAuth();
  const { getBudget, deleteBudget, editBudget } = useBudget();

  useEffect(() => {
    const fetchRecords = async () => {
      const data = await getBudget(user.uid);
      setRecords(data);
    }

    setLoading(true);
    fetchRecords();
    setLoading(false);
  }, []);

  const filteredRecords = useMemo(() => {
    setLoading(true);
    const filtered = records.filter((record) => selected.toLowerCase().includes(record.category.toLowerCase()));
    setLoading(false);
    return filtered;
  }, [records, selected]);

  const handleDelete = (id: string) => {
    Alert.alert('Delete Record', 'Are you sure you want to delete this record?', [
      {
        text: 'Yes',
        onPress: async () => {
          try {
            const res = await deleteBudget(user.uid, id);
            if (res.success) {
              router.replace('/records');
              return Alert.alert('Success', 'Record has been deleted successfully.');
            }
          } catch (error) {
            return Alert.alert('Error', 'An error occured while deleting the record.');
          }
        }
      },
      {
        text: 'No',
      }
    ])
  };

  const handleEditPress = (id: string) => {
    if (editing && editId !== '') {
      setEditing(false);
      setEditId('');
    } else {
      setEditing(true);
      setEditId(id);
    }
  };

  const handleEditSubmit = () => {
    setLoading(true);
    try {
      const res = editBudget(user.uid, editId, description);
      if (res) {
        router.replace('/records');
        return Alert.alert('Success', 'Record has been updated successfully.');
      }
    } catch (error) {
      return Alert.alert('Error', 'An error occured while updating the record.');
    }
  };

  return (
    <View className='bg-slate-800 h-screen w-screen px-5 flex flex-col gap-5'>
      <View className='w-full h-[8%] flex flex-row items-end justify-start gap-2'>
        <Text className='text-5xl text-slate-500 font-medium tracking-widest'>Your</Text>
        <Text className='text-5xl text-slate-400 font-bold tracking-widest'>records</Text>
      </View>
      {loading ? (
        <ActivityIndicator size='large' color='white' />
      ) : (
        <>
          <View className='w-full h-[5%] flex flex-row items-center justify-end gap-5'>
            {recordTags.map((tag) => (
              <TagPressables title={tag} selected={selected} setSelected={setSelected} key={tag} />
            ))}
          </View>
          <ScrollView className='w-full max-h-[65%] pt-5'>
            {filteredRecords.length <= 0 ? <Text className='mx-auto text-gray-300 text-5xl'>No data found.</Text> : filteredRecords.map((record) => (
              <View className='w-full h-fit max-h-52 border-4 border-slate-400 rounded-3xl flex flex-row justify-between items-center py-5 px-8 mb-6' key={record.id}>
                <View className='w-3/5 h-full flex flex-col gap-1 justify-center item-start'>
                  {editing && editId === record.id ? (
                    <TextInput
                      placeholder={record.description || 'Description'}
                      multiline
                      numberOfLines={1}
                      onChangeText={(text) => setDescription(text)}
                      className='text-3xl text-slate-400 font-bold placeholder:text-slate-500 border-b-2 border-slate-400 w-5/6'
                    />) : (
                    <Text className='text-3xl text-slate-400 font-bold'>{record.description}</Text>
                  )}
                  <Text className='text-xl text-slate-400 font-semibold'>{convertDateToString(record.date)}</Text>
                  <Text className='text-xl text-slate-900 font-semibold bg-slate-400 max-w-[50%] text-center px-3 py-0.5 rounded-full'>{record.expenses}</Text>
                </View>
                <View className='w-2/5 h-full flex flex-col items-end justify-around'>
                  <View className='w-full flex flex-row items-center justify-end gap-3'>
                    {editing && editId === record.id ? (
                      <>
                        <Pressable onPress={() => handleEditSubmit()}>
                          <IonIcons name='checkmark' size={40} color='skyblue' />
                        </Pressable>
                        <Pressable onPress={() => handleEditPress(record.id)}>
                          <IonIcons name='close' size={40} color='red' />
                        </Pressable>
                      </>) : (
                      <>
                        <Pressable onPress={() => handleEditPress(record.id)}>
                          <IonIcons name='pencil' size={40} color='skyblue' />
                        </Pressable>
                        <Pressable onPress={() => handleDelete(record.id)}>
                          <IonIcons name='trash' size={40} color='red' />
                        </Pressable>
                      </>
                    )}
                  </View>
                  <Text className='text-2xl text-green-500 font-semibold'>+ ₱{Number(record.value).toFixed(2)}</Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </>
      )}
    </View>
  )
}

const TagPressables = ({ title, selected, setSelected }) => {
  return (
    <Pressable onPress={() => setSelected(title)} className={`${selected === title ? "bg-slate-500" : "bg-slate-300"} h-full py-2 w-32 rounded-full flex flex-row justify-center items-center transition-all duration-300`}>
      <Text className='text-2xl text-slate-900 font-semibold text-center'>{title}</Text>
    </Pressable>
  )
}
