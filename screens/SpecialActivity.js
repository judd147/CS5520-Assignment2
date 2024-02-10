import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ActivitiesList from '../components/ActivitiesList'
import Color from '../components/Color'

export default function SpecialActivity() {
  return (
    <View style={styles.container}>
      <ActivitiesList />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.bg,
  }
})