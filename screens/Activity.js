import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AllActivity from './AllActivity'
import SpecialActivity from './SpecialActivity'

const Tab = createBottomTabNavigator();

export default function Activity() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="All Activities" component={AllActivity} />
      <Tab.Screen name="Special Activities" component={SpecialActivity} />
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({})