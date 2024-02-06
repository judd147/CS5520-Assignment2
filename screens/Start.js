import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Input from '../components/Input'
import Background from '../components/Background'

const Tab = createBottomTabNavigator();

export default function Start({ navigation }) {
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')

  const resetHandler = () => {
    setEmail('')
    setPhone('')
  }

  const startHandler = () => {
    navigation.navigate('Activity')
  }

  return (
    <Background>
      <View style={styles.container}>
        <Input email={email} setEmail={setEmail} phone={phone} setPhone={setPhone}
          resetHandler={resetHandler} startHandler={startHandler}/>
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
})