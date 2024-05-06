import { Text, View } from "react-native";
import React, { useState } from "react";
import { Entypo } from "@expo/vector-icons";
export default function MonthYearView({ onMonthYearChange }) {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const handleLeftClick = () => {
    const prevMonth = selectedMonth === 0 ? 11 : selectedMonth - 1;
    const prevYear = selectedMonth === 0 ? selectedYear - 1 : selectedYear;
    setSelectedMonth(prevMonth);
    setSelectedYear(prevYear);
    onMonthYearChange(prevMonth, prevYear);
  };

  const handleRightClick = () => {
    const nextMonth = selectedMonth === 11 ? 0 : selectedMonth + 1;
    const nextYear = selectedMonth === 11 ? selectedYear + 1 : selectedYear;
    setSelectedMonth(nextMonth);
    setSelectedYear(nextYear);
    onMonthYearChange(nextMonth, nextYear);
  };

  return (
    <View className="w-full py-5 flex-row justify-between px-5 bg-slate-900">
      <Entypo
        name="chevron-left"
        size={24}
        color="white"
        onPress={handleLeftClick}
      />
      <Text className="self-center text-2xl text-slate-200 font-bold">
        {`${getMonthName(selectedMonth)} ${selectedYear}`}
      </Text>
      <Entypo
        name="chevron-right"
        size={24}
        color="white"
        onPress={handleRightClick}
      />
    </View>
  );
}
const getMonthName = (monthIndex) => {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return monthNames[monthIndex];
};
