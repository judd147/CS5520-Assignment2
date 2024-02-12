import React from 'react'
import { View, StyleSheet, Button } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import AllActivity from './AllActivity'
import SpecialActivity from './SpecialActivity'
import Color from '../components/Color'

const Tab = createBottomTabNavigator();

export default function Activity({ navigation }) {
  const options = {
    headerTintColor: 'white',
    headerStyle: { backgroundColor: Color.headerBg, shadowOpacity: 0}, // remove default gap
    headerRight: () => (
      <View style={styles.button}>
        <Button title='Add' onPress={addHandler} color={Color.highlight} />
      </View>
    ),
    tabBarActiveTintColor: Color.highlight,
    tabBarStyle: { backgroundColor: Color.headerBg, borderTopWidth: 0}, // remove default gap
  }

  const addHandler = () => {
    navigation.navigate('Add An Activity')
  }

  return (
    // define the tab navigator and routes
    <Tab.Navigator screenOptions={options}>
      <Tab.Screen name="All Activities" component={AllActivity} />
      <Tab.Screen name="Special Activities" component={SpecialActivity} />
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  button: {
    marginRight: 8
  }
})