import { StyleSheet, Text, View } from "react-native";
import React from "react";
import AddActivity from "../components/AddActivity";

export default function Add({ navigation }) {
  return (
    <AddActivity
      navigation={navigation}
      activityValue={null}
      durationValue={null}
      dateValue={''}
      dateObj={new Date()}
    />
  );
}

const styles = StyleSheet.create({});