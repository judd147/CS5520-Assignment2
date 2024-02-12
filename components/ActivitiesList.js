import { StyleSheet, Text, View, FlatList } from 'react-native'
import React, { useContext } from 'react'
import { MaterialIcons } from '@expo/vector-icons'
import { ActivityContext } from '../ActivityContext'
import Color from './Color'

export default function ActivitiesList({ showAll }) {
  const { activities } = useContext(ActivityContext) // get data from context
  const data = showAll ? activities : activities.filter((item) => item.special) // determine what kind of activities to show
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({item}) => {
          return (
            <View style={styles.itemContainer}>
              <Text style={styles.title}>{item.title}</Text>
              <View style={styles.detailContainer}>
                {item.special && <MaterialIcons name="stars" size={24} color="gold" style={{padding: 2, margin: 3}}/>}
                <Text style={styles.detail}>{item.date}</Text>
                <Text style={styles.detail}>{item.duration}</Text>
              </View>
            </View>
          )
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
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