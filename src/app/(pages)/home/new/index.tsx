import {
  View,
  Text,
  Modal,
  Pressable,
  TextInput,
  ScrollView,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { Link, router } from "expo-router";
import DatePicker from "@react-native-community/datetimepicker";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import {
  numbers,
  expenseChoices,
  categoryChoices,
  expenseIcons,
  incomeChoices,
  incomeIcons,
  categoryIcons,
} from "@/constants/constants";
import { useAuth } from "@/utils/context/AuthContext";
import { useBudget } from "@/utils/context/BudgetContext";

export default function Add() {
  const { user } = useAuth();
  const { addBudget } = useBudget();

  const [visible, setVisible] = useState("");
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    value: "",
    expenses: "",
    category: "",
    description: "",
    date: new Date(),
  });
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handlePress = (item: string) => {
    if(formValues.value.length > 9) return Alert.alert("Attention!", "Value exceeds maximum length.");
    if (item !== ".") {
      setFormValues((prevValues) => ({
        ...prevValues,
        value: prevValues.value + item,
      }));
    } else {
      setFormValues((prevValues) => {
        if (prevValues.value === "") {
          return { ...prevValues, value: "0." };
        } else if (prevValues.value.includes(".")) {
          return prevValues;
        } else {
          return { ...prevValues, value: prevValues.value + "." };
        }
      });
    }
  };
  const handleDateChange = (event, selectedDate: Date) => {
    const currentDate = selectedDate || formValues.date;
    setFormValues({ ...formValues, date: currentDate });
    setShowDatePicker(false);
  };

  const handleCategoryChange = (category) => {
    setVisible(category);

    setFormValues((prevValues) => ({
      ...prevValues,
      category,
      expenses: "",
    }));
  };
  const handleSave = async () => {
    if (
      formValues.value === "" ||
      formValues.expenses === "" ||
      formValues.category === ""
    ) {
      return Alert.alert("Important!", "Please fill in all fields");
    }
    setLoading(true);

    try {
      const res = await addBudget(formValues, user.uid);
      if (!res.success) return Alert.alert("Error", res.msg);
      else {
        Alert.alert("Success", "Transaction added successfully");
        router.replace("/home");
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred. Please try again later");
    }

    setLoading(false);
  };
  const getChoices = () => {
    switch (formValues.category) {
      case "Income":
        return { choices: incomeChoices, icons: incomeIcons };
      default:
        return { choices: expenseChoices, icons: expenseIcons };
    }
  };

  return (
    <>
      <Modal animationType="slide" transparent={false}>
        <View className="bg-[#051728] h-screen w-screen px-5 flex flex-col justify-center gap-3 items-center">
          <View className="w-full h-[45%] flex flex-col justify-start items-center gap-">
            <View className="flex flex-row items-center w-full h-1/6 justify-between">
              <Link href="/home" disabled={loading}>
                <View className="flex flex-row items-center gap-2 w-1/2">
                  <AntDesign name="close" size={24} color="gray" />
                  <Text className="text-3xl text-slate-400 font-medium">
                    cancel
                  </Text>
                </View>
              </Link>
              <Pressable onPress={handleSave} disabled={loading}>
                <View className="flex flex-row items-center gap-2">
                  <AntDesign name="check" size={24} color="gray" />
                  <Text className="text-3xl text-slate-400 font-medium">
                    save
                  </Text>
                </View>
              </Pressable>
            </View>
            {loading ? (
              <View className="absolute top-1/3">
                <Text className="text-3xl text-slate-300 my-10 tracking-widest">We are submitting your data...</Text>
                <ActivityIndicator size={100} color="gray" />
              </View>
            ) : (
              <>
                <View className="w-full h-[15%] flex flex-row justify-between items-center gap-2 mb-3">
                  <Pressable
                    onPress={() => setVisible("category")}
                    className="w-1/2 h-4/5 border-2 border-slate-400 flex flex-row items-center justify-between rounded-2xl px-5"
                  >
                    <Text
                      className={`${formValues.category ? "text-2xl" : "text-2xl"
                        } text-slate-400 font-semibold`}
                    >
                      {/* FIRST DROPDOWN */}
                      {formValues.category ? formValues.category : "category"}
                    </Text>
                    <Ionicons name="caret-down" size={24} color="gray" />
                  </Pressable>
                  <Pressable
                    onPress={() => {
                      if (formValues.category === "") return Alert.alert("Attention!", "Please select a category");
                      setVisible("expense")
                    }}
                    className="w-1/2 h-4/5 border-2 border-slate-400 flex flex-row items-center justify-between rounded-2xl px-5 flex-1"
                  >
                    <Text
                      className={`${formValues.expenses ? "text-2xl" : "text-2xl"
                        } text-slate-400 font-semibold`}
                    >
                      {/* SECOND DROPDOWN */}
                      {formValues.expenses ? formValues.expenses : "allocation"}
                    </Text>
                    <Ionicons name="caret-down" size={24} color="gray" />
                  </Pressable>
                </View>
                <View className="w-full h-2/5 grid row-span-2">
                  <Text className="text-xl text-slate-400 tracking-wider font-semibold text-left  mb-1">
                    Description
                  </Text>
                  <TextInput
                    keyboardType="default"
                    editable
                    multiline
                    numberOfLines={2}
                    value={formValues.description}
                    onChangeText={(text) =>
                      setFormValues({ ...formValues, description: text })
                    }
                    placeholder="Enter description here..."
                    style={{ textAlignVertical: "top" }}
                    className="p-5 h-4/5 from w-full text-left border-slate-400 border-2 rounded-2xl relative text-2xl text-slate-300 tracking-wider placeholder:text-slate-400"
                  />
                </View>
                <View className="w-full h-1/6 grid row-span-2 mb-2">
                  <Text className="text-xl text-slate-400 font-bold tracking-wider text-left mb-2">
                    Transaction date
                  </Text>
                  <Pressable
                    onPress={() => setShowDatePicker(true)}
                    className="px-5 w-full h-full flex flex-row items-center justify-between border-slate-400 border-2 rounded-2xl relative text-2xl text-slate-300 tracking-wider placeholder:text-slate-400"
                  >
                    <Text className="text-2xl text-slate-300 tracking-wider">
                      {formValues.date.toLocaleDateString()}
                    </Text>
                    <Ionicons name="calendar" size={30} color="slategray" />
                  </Pressable>
                </View>
              </>
            )}
          </View>
          {!loading && (
            <View className="w-full h-1/2 flex flex-col gap-3 mt-2">
              <View className="w-full h-1/4 border-slate-400 border-2 flex flex-row items-center justify-between rounded-2xl">
                <Text className="text-right w-3/4 text-6xl font-semibold text-slate-300 placeholder:text-slate-400">
                 ₱ {formValues.value
                    ? Number(formValues.value).toLocaleString()
                    : "0"}
                </Text>
                <View className="w-1/4 h-full flex items-center justify-center">
                  <TouchableOpacity
                    onPress={() =>
                      setFormValues((prevValues) => ({
                        ...prevValues,
                        value: prevValues.value.slice(0, -1),
                      }))
                    }
                  >
                    <Ionicons name="backspace" size={50} color="slategray" />
                  </TouchableOpacity>
                </View>
              </View>
              <View className="w-full h-4/5 flex flex-wrap gap-2 pr-4">
                {numbers.map((item, index) => (
                  <TouchableOpacity
                    onPress={() => handlePress(item)}
                    key={index}
                    className="w-1/3 h-1/5 border-slate-400 border-2 rounded-2xl flex justify-center items-center "
                  >
                    <Text className="text-5xl font-regular text-slate-400">
                      {item}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}
        </View>
      </Modal>
      <Modal animationType="slide" transparent={false} visible={visible !== ""}>
        <View className="h-screen w-screen bg-slate-800 relative">
          <Pressable
            onPress={() => setVisible("")} className="bg-slate-400 py-5 px-8 rounded-full absolute bottom-16 right-8 z-10 flex flex-row items-center gap-5">
            <Ionicons
              name="close"
              size={32}
              color="black"
            />
            <Text className="text-slate-800 text-2xl font-semibold">Cancel</Text>
          </Pressable>
          <ScrollView className="max-h-5/6 h-5/6 w-full rounded-xl relative py-16 px-10">
            <Text className="text-4xl font-semibold mb-5 text-slate-200">
              Choose your {visible}
            </Text>
            {(visible === "expense" ? getChoices().choices : categoryChoices)
              // DROPDOWN CHOICES IE EXPENSE INCOME
              .map((item, index) => (
                <Pressable
                  className="border-b-2 border-slate-200 flex flex-row w-full items-center p-3"
                  key={index}
                  onPress={() => {
                    if (visible === "expense") {
                      setFormValues({ ...formValues, expenses: item });
                    } else {
                      handleCategoryChange(item);
                    }
                    setVisible("");
                  }}
                >
                  <Ionicons
                    name={
                      visible === "category"
                        ? categoryIcons[index] as any
                        : formValues.category === "Expense"
                          ? expenseIcons[index] as any
                          : incomeIcons[index] as any
                    }

                    size={30}
                    color="slategray"
                  />
                  <Text className="text-2xl text-slate-200 p-4">{item}</Text>
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
        />
      )}
    </>
  );
}
