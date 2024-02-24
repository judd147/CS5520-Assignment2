import { StyleSheet, Text, View, FlatList, Pressable } from 'react-native'
import React, { useEffect, useContext, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { MaterialIcons } from '@expo/vector-icons'
//import { ActivityContext } from '../ActivityContext'
import Color from './Color'
import { collection, onSnapshot } from "firebase/firestore";
import { database } from "../firebase-files/firebaseSetup";

export default function ActivitiesList({ showAll }) {
  const navigation = useNavigation()
  const [activities, setActivities] = useState([])
  //const { activities, setActivities } = useContext(ActivityContext) // get data from context

  useEffect(() => {
    // setup listener to get real-time data
    onSnapshot(collection(database, "activities"), (querySnapshot) => {
      const newArary = []
      querySnapshot.forEach((doc) => {
        newArary.push({...doc.data(), id: doc.id}) // add an id field to a new object
        //console.log(doc.data())
      })
      setActivities(newArary)
      //console.log(newArary)
    });
  }, [])

  const data = showAll ? activities : activities.filter((item) => item.special) // determine what kind of activities to show
  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={{marginTop: 20}}
        data={data}
        renderItem={({item}) => {
          return (
            <Pressable 
            style={({ pressed }) => {
              return [pressed && {opacity: 0.5}]
            }}
            onPress={() => navigation.navigate("Edit", { // pass activity detail as params
              activityId: item.id,
              activityValue: item.title,
              durationValue: item.duration,
              dateValue: item.date,
            })}>
              <View style={styles.itemContainer}>
                <Text style={styles.title}>{item.title}</Text>
                <View style={styles.detailContainer}>
                  {item.special && <MaterialIcons name="stars" size={24} color="gold" style={{padding: 2, margin: 3}}/>}
                  <Text style={styles.detail}>{item.date}</Text>
                  <Text style={styles.detail}>{item.duration + ' min'}</Text>
                </View>
              </View>
            </Pressable>
          )
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  itemContainer: {
    width: 350,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 7,
    padding: 3,
    margin: 8,
    backgroundColor: Color.headerBg,
    elevation: 4, // Android
    shadowOffset: {width: 0.1, height: 0.1}, // iOS
    shadowOpacity: 0.2, // iOS
    shadowRadius: 3, // iOS
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Color.title,
    padding: 5,
    margin: 5,
  },
  detailContainer: {
    flexDirection: 'row',
    margin: 4,
  },
  detail: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Color.headerBg,
    padding: 5,
    margin: 3,
    backgroundColor: 'white'
  }
})