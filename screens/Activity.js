import React from 'react'
import { View, StyleSheet } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { AntDesign, MaterialIcons } from '@expo/vector-icons'
import AllActivity from './AllActivity'
import SpecialActivity from './SpecialActivity'
import Color from '../components/Color'
import PressableButton from "../components/PressableButton"

const Tab = createBottomTabNavigator();

export default function Activity({ navigation }) {
  const options = {
    headerTintColor: 'white',
    headerStyle: { backgroundColor: Color.headerBg, shadowOpacity: 0}, // remove default gap
    headerRight: () => (
      <PressableButton customStyle={styles.button} onPress={addHandler}>
        <AntDesign name="plus" size={24} color="white" />
      </PressableButton>
    ),
    tabBarActiveTintColor: Color.highlight,
    tabBarStyle: { backgroundColor: Color.headerBg, borderTopWidth: 0}, // remove default gap
  }
  const allActivityOptions = {
    tabBarIcon: ({ focused }) => (
      <MaterialIcons name="directions-run" size={24} color={focused ? Color.highlight : Color.bg}/>
    ),
  }
  const specialActivityOptions = {
    tabBarIcon: ({ focused }) => (
      <MaterialIcons name="stars" size={24} color={focused ? Color.highlight : Color.bg}/>
    ),
  }

  const addHandler = () => {
    navigation.navigate('Add An Activity')
  }

  return (
    // define the tab navigator and routes
    <Tab.Navigator screenOptions={options}>
      <Tab.Screen name="All Activities" component={AllActivity} options={allActivityOptions}/>
      <Tab.Screen name="Special Activities" component={SpecialActivity} options={specialActivityOptions}/>
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 0,
    paddingHorizontal: 0,
    marginRight: 8,
    backgroundColor: 'transparent'
  }
})