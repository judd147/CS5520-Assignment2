import React from "react";
import AddActivity from "../components/AddActivity";

export default function Edit({ route, navigation }) {
  // receive params from ActivitiesList item
  const { activityId, activityValue, durationValue, dateValue, specialValue } = route.params;

  return (
    <AddActivity
      route={route}
      navigation={navigation}
      activityId={activityId}
      activityValue={activityValue}
      durationValue={durationValue}
      dateValue={dateValue}
      dateObj={new Date(dateValue)}
      specialValue={specialValue}
    />
  );
}