import { StyleSheet, View } from 'react-native'
import React from 'react'
import ActivitiesList from '../components/ActivitiesList'
import Color from '../components/Color'

export default function AllActivity() {
  return (
    <View style={styles.container}>
      <ActivitiesList showAll={true}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.bg,
  }
})