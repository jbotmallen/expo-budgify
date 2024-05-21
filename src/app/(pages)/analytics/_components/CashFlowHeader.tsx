import { StyleSheet, Text, Pressable } from "react-native";
import React from "react";

export default function CashFlowHeader({ category, data, onPress, isActive }) {
  const secondTextStyle = data < 0 ? styles.textRed : styles.textGreen;
  const containerStyle = isActive
    ? [styles.container, styles.activeContainer]
    : styles.container;

  return (
    <Pressable style={containerStyle} onPress={onPress}>
      <Text
        style={styles.text}
        className="text-slate-400 font-bold w-full text-center"
      >
        {category}
      </Text>
      <Text style={secondTextStyle} className="font-bold w-full text-center">
        ₱
        {Number(data.toFixed(2)).toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </Text>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  container: {
    display: "flex",
    borderColor: "white",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
    height: "80%",
    width: "33%",
    padding: 10,
    backgroundColor: "#0008",
    borderRadius: 10,
  },
  text: {
    display: "flex",
    fontWeight: "800",
    fontSize: 14,
    justifyContent: "center",
  },
  textRed: {
    color: "red",
    fontSize: 18,
  },
  textGreen: {
    color: "green",
    fontSize: 18,
  },
  activeContainer: {
    backgroundColor: "#2d274f",
  },
});
