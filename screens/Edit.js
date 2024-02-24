import { StyleSheet, Text, View } from "react-native";
import React from "react";
import AddActivity from "../components/AddActivity";

export default function Edit({ route, navigation }) {
  const { activityValue, durationValue, dateValue } = route.params;

  return (
    <AddActivity
      navigation={navigation}
      activityValue={activityValue}
      durationValue={durationValue}
      dateValue={dateValue}
      dateObj={new Date(dateValue)}
    />
  );
}

const styles = StyleSheet.create({});