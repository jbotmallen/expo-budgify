import {
  View,
  Text,
  Pressable,
  Alert,
  ActivityIndicator,
  ScrollView,
  TextInput,
  Modal,
} from "react-native";
import DatePicker from "@react-native-community/datetimepicker";
import React, { useEffect, useMemo, useState } from "react";
import { expenseChoices, expenseIcons, recordTags } from "@/constants/constants";
import { useAuth } from "@/utils/context/AuthContext";
import { useBudget } from "@/utils/context/BudgetContext";
import { Picker } from "@react-native-picker/picker";
import {
  convertDateToString,
  convertTimeToDate,
  numberWithCommas,
} from "../../../constants/functions";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function Records() {
  const [selected, setSelected] = useState("Expense");
  const [records, setRecords] = useState([]);
  
  const [editing, setEditing] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [editValues, setEditValues] = useState({
    id: '',
    description: '',
    date: new Date(),
    expenses: "",
    value: '',
  })
  const [sortBy, setSortBy] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const { user } = useAuth();
  const { getBudget, deleteBudget, editBudget, loading } = useBudget();

  useEffect(() => {
    const fetchRecords = async () => {
      const data = await getBudget(user.uid);
      setRecords(data);
    };

    fetchRecords();
  }, []);

  const filteredRecords = useMemo(() => {
    const filtered = records.filter((record) =>
      selected.toLowerCase().includes(record.category.toLowerCase())
    );

    if (searchTerm) {
      return filtered.filter((record) =>
        record.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return filtered;
  }, [records, selected, searchTerm]);

  const handleSearchTermInput = (text) => {
    setSearchTerm(text);
  };

  const sortedRecords = useMemo(() => {
    const filtered = filteredRecords;

    let sorted = [...filtered];
    if (sortBy === "AlphabeticalAtoZ") {
      sorted.sort((a, b) => a.description.localeCompare(b.description));
    } else if (sortBy === "AlphabeticalZtoA") {
      sorted.sort((a, b) => b.description.localeCompare(a.description));
    } else if (sortBy === "AmountAsc") {
      sorted.sort((a, b) => a.value - b.value);
    } else if (sortBy === "AmountDesc") {
      sorted.sort((a, b) => b.value - a.value);
    } else if (sortBy === "DateAsc") {
      sorted.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateA.getTime() - dateB.getTime();
      });
    } else if (sortBy === "DateDesc") {
      sorted.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateB.getTime() - dateA.getTime();
      });
    }

    return sorted;
  }, [filteredRecords, sortBy]);

  const handleDelete = (id: string) => {
    Alert.alert(
      "Delete Record",
      "Are you sure you want to delete this record?",
      [
        {
          text: "Yes",
          onPress: async () => {
            try {
              const res = await deleteBudget(user.uid, id);
              if (res.success) {
                router.replace("/records");
                return Alert.alert(
                  "Success",
                  "Record has been deleted successfully."
                );
              }
            } catch (error) {
              return Alert.alert(
                "Error",
                "An error occured while deleting the record."
              );
            }
          },
        },
        {
          text: "No",
        },
      ]
    );
  };

  const handleEditPress = (values: any) => {
    if (editing && editValues.id !== "") {
      setEditing(false);
      setEditValues({ id: "", description: "", date: new Date(), expenses: "", value: "" });
    } else {
      const convertedDate = convertTimeToDate(values.date);
      setEditing(true);
      setEditValues({
        id: values.id,
        description: '',
        date: convertedDate,
        expenses: values.expenses,
        value: '',
      });
    }
  };

  const handleEditSubmit = () => {
    try {
      if (!editValues.description)
        return Alert.alert(
          "Something went wrong!",
          "Description is required. Please input a description."
        );
      if (!editValues.value)
        return Alert.alert(
          "Something went wrong!",
          "Value is required. Please input a value."
        );

      const res = editBudget(user.uid, editValues);
      if (res) {
        router.replace("/records");
        return Alert.alert("Success", "Record has been updated successfully.");
      }
    } catch (error) {
      return Alert.alert(
        "Error",
        "An error occured while updating the record."
      );
    }
  };

  const handleDateChange = (event, selectedDate: Date) => {
    const currentDate = selectedDate || editValues.date;
    setEditValues({ ...editValues, date: currentDate });
    setShowDatePicker(false);
  };

  return (
    <View className="bg-slate-800 h-screen w-screen px-5 flex flex-col gap-5">
      <View className="w-full h-[8%] flex flex-row items-end justify-start gap-2">
        <Ionicons name="book" size={32} color="slategray" className="mr-3"/>
        <Text className="text-4xl text-slate-300 font-medium tracking-widest">
          Your
        </Text>
        <Text className="text-4xl text-slate-300 font-bold tracking-widest">
          records
        </Text>
      </View>

      <View
        className="h-[5%] w-full justify-start items-center flex flex-row"
      >
        <Picker
          selectedValue={sortBy}
          style={{
            height: 50,
            borderRadius: 20,
            width: "50%",
            color: "white",
            fontSize: 12,
            backgroundColor: "transparent",
            borderColor: "white",
          }}
          dropdownIconColor="white"
          onValueChange={(itemValue) => setSortBy(itemValue)}
        // prompt="Sort by"
        >
          <Picker.Item
            label="Alphabetical (Ascending)"
            value="AlphabeticalAtoZ"
            style={{ fontSize: 20 }}
          />
          <Picker.Item
            label="Alphabetical (Descending)"
            value="AlphabeticalZtoA"
            style={{ fontSize: 20 }}
          />

          <Picker.Item
            label="Amount (Ascending)"
            value="AmountAsc"
            style={{ fontSize: 20 }}
          />
          <Picker.Item
            label={`Amount (Descending)`}
            value="AmountDesc"
            style={{ fontSize: 20 }}
          />
        </Picker>
        <View
          style={{
            flexDirection: "row",
            flex: 1,
            alignItems: "center",
            borderBottomWidth: 1,
            borderColor: "gray",
            padding: 0,
            justifyContent: "space-between",
          }}
        >
          {/* <Text className="text-white">Search</Text> */}
          <TextInput
            placeholder="Search"
            style={{
              flex: 1,
              color: "white",
            }}
            placeholderTextColor="gray"
            onChangeText={handleSearchTermInput}
            value={searchTerm}
          ></TextInput>
          <Pressable onPress={() => setSearchTerm("")}>
            <Ionicons name="close" size={20} color="white" />
          </Pressable>
        </View>
      </View>
      {loading ? (
        <ActivityIndicator size={100} color="white" />
      ) : (
        <>
          <View className="w-full h-[5%] flex flex-row justify-end gap-2 px-1">
            {recordTags.map((tag) => (
              <TagPressables
                title={tag}
                selected={selected}
                setSelected={setSelected}
                key={tag}
              />
            ))}
          </View>
          <ScrollView className="w-full max-h-[56%] pt-3 mb-0">
            {sortedRecords.length <= 0 ? (
              <Text className="mx-auto text-gray-300 text-5xl mt-10">
                No data found.
              </Text>
            ) : (
              sortedRecords.map((record) => (
                <View
                  className="w-full h-fit max-h-44 border-2 border-slate-400 rounded-3xl flex flex-row justify-between items-center py-4 px-6 mb-3"
                  key={record.id}
                >
                  <View className="w-3/4 h-full flex flex-col justify-center item-start">
                    {editing && editValues.id === record.id ? (
                      <View className="flex flex-col justify-between items-start h-full gap-2 pb-5">
                        <TextInput
                          placeholder={record.description || "Description"}
                          multiline
                          numberOfLines={1}
                          value={editValues.description}
                          onChangeText={(text) => setEditValues({ ...editValues, description: text })}
                          className="text-3xl text-slate-400 font-bold placeholder:text-slate-500 border-b-2 border-slate-400 w-5/6"
                        />
                        <Pressable onPress={() => setShowDatePicker(true)}>
                          <Text className="text-lg text-slate-400 font-semibold">
                            {editValues.date.toDateString()}
                          </Text>
                        </Pressable>
                        <Pressable
                          onPress={() => setOpenModal(true)}
                          className="py-0.5 px-3 w-1/2 bg-slate-300 justify-start items-center flex flex-row rounded-lg"
                        >
                          <Text className="text-base text-slate-900 font-semibold bg-blue-200 w-full text-center px-3 py-0.5 rounded-full">{editValues.expenses}</Text>
                        </Pressable>
                      </View>
                    ) : (
                      <>
                        <Text className="text-3xl text-slate-400 font-bold">
                          {record.description}
                        </Text>
                        <Text className="text-lg text-slate-400 font-semibold mb-4">
                          {convertDateToString(record.date)}
                        </Text>
                        <Text className="text-base text-slate-900 font-semibold bg-blue-200 max-w-[45%] text-center px-3 py-0.5 rounded-full">
                          {record.expenses}
                        </Text>
                      </>
                    )}
                  </View>
                  <View className="w-1/4 h-full flex flex-col items-end justify-around">
                    <View className="w-full flex flex-row items-center justify-end gap-3">
                      {editing && editValues.id === record.id ? (
                        <>
                          <Pressable onPress={() => handleEditSubmit()}>
                            <Ionicons
                              name="checkmark"
                              size={40}
                              color="skyblue"
                            />
                          </Pressable>
                          <Pressable onPress={() => handleEditPress(record)}>
                            <Ionicons name="close" size={40} color="red" />
                          </Pressable>
                        </>
                      ) : (
                        <>
                          <Pressable onPress={() => handleEditPress(record)}>
                            <Ionicons name="pencil" size={40} color="skyblue" />
                          </Pressable>
                          <Pressable onPress={() => handleDelete(record.id)}>
                            <Ionicons
                              name="trash"
                              size={40}
                              color="slategray"
                            />
                          </Pressable>
                        </>
                      )}
                    </View>
                    {editing && editValues.id === record.id ? (
                      <TextInput
                        keyboardType="numeric"
                        placeholder={`₱ ${numberWithCommas(record.value)}` || "Value"}
                        onChangeText={(text) => setEditValues({ ...editValues, value: text })}
                        className="text-2xl text-slate-400 font-bold placeholder:text-slate-500 border-b-2 border-slate-400 w-full"
                      />
                    ) : (
                      <Text
                        className={`text-2xl font-semibold ${record.category === "Income"
                          ? "text-green-500"
                          : "text-red-400"
                          }`}
                      >
                        {record.category === "Income" ? "+ " : "- "}₱
                        {numberWithCommas(Number(record.value).toFixed(0))}
                      </Text>
                    )}
                  </View>
                </View>
              ))
            )}
          </ScrollView>
          {showDatePicker &&
            <DatePicker
              value={editValues.date}
              mode="date"
              display="default"
              onChange={handleDateChange}
              maximumDate={new Date()}
            />
          }
          <Modal animationType="slide" transparent={false} visible={editing && openModal}>
            <View className="h-screen w-screen bg-slate-800 relative">
              <Ionicons
                name="close"
                size={60}
                color="gray"
                onPress={() => setOpenModal(false)}
                className="absolute top-12 right-8 z-10"
              />
              <ScrollView className="max-h-5/6 h-5/6 w-full rounded-xl relative py-16 px-10">
                <Text className="text-4xl font-semibold mb-5 text-slate-200">
                  <AntDesign name="bars" size={32} /> Choose your expense
                </Text>
                {expenseChoices.map(
                  (item, index) => (
                    <Pressable
                      className="border-b-2 border-slate-200 flex flex-row w-full items-center p-3"
                      key={index}
                      onPress={() => {
                        setEditValues({ ...editValues, expenses: item });
                        setOpenModal(false);
                      }}
                    >
                      <Ionicons
                        name={expenseIcons[index] as
                          "fast-food"
                          | "car"
                          | "medkit"
                          | "tennisball"
                          | "school"
                          | "add-circle"
                        } size={40} color='slategray'
                      />
                      <Text className="text-3xl text-slate-200 p-8">
                        {item}
                      </Text>
                    </Pressable>
                  )
                )}
              </ScrollView>
            </View>
          </Modal>
        </>
      )}
    </View>
  );
}

const TagPressables = ({ title, selected, setSelected }) => {
  return (
    <Pressable
      onPress={() => setSelected(title)}
      className={`${selected === title ? "bg-slate-300" : "bg-slate-500"
        } h-full py-2 w-32 rounded-full flex flex-row justify-center items-center transition-all duration-300`}
    >
      <Text className="text-xl text-slate-900 font-semibold text-center">
        {title}
      </Text>
    </Pressable>
  );
};
