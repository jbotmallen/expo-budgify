import { StyleSheet, Text, Pressable } from "react-native";
import React from "react";

export default function CashFlowHeader({ category, data, onPress, isActive }) {
  const secondTextStyle = data < 0 ? styles.textRed : styles.textGreen;
  const containerStyle = isActive
    ? [styles.container, styles.activeContainer]
    : styles.container;

  return (
    <Pressable style={containerStyle} onPress={onPress}>
      <Text style={styles.text} className="text-slate-400 ">
        {category}
      </Text>
      <Text style={secondTextStyle} className="font-bold">
        {" "}
        ₱{" "}
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
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
    height: "100%",
    width: "33%",
    padding: 10,
    backgroundColor: "#0008",
    borderRadius: 10,
  },
  text: {
    display: "flex",
    fontWeight: "500",
    fontSize: 22,
    justifyContent: "center",
  },
  textRed: {
    color: "red",
    fontSize: 20,
  },
  textGreen: {
    color: "green",
    fontSize: 20,
  },
  activeContainer: {
    backgroundColor: "#2d274f",
  },
});
