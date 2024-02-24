import { StyleSheet, Text, View } from "react-native";
import React from "react";
import AddActivity from "../components/AddActivity";

export default function Edit({ route, navigation }) {
  const { activityId, activityValue, durationValue, dateValue } = route.params;

  return (
    <AddActivity
      navigation={navigation}
      activityId={activityId}
      activityValue={activityValue}
      durationValue={durationValue}
      dateValue={dateValue}
      dateObj={new Date(dateValue)}
    />
  );
}

const styles = StyleSheet.create({});