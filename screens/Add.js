import React from "react";
import AddActivity from "../components/AddActivity";

export default function Add({ route, navigation }) {
  return (
    <AddActivity
      route={route}
      navigation={navigation}
      activityValue={null}
      durationValue={null}
      dateValue={''}
      dateObj={new Date()}
    />
  );
}