import { StyleSheet, Text, View, TextInput, Button } from 'react-native'
import React, { useState, useEffect } from 'react'
import Error from './Error'
import Color from './Color'

export default function Input({ email, setEmail, phone, setPhone, resetHandler, startHandler }) {
  
  const [enabled, setEnabled] = useState(false)

  // disable start button until user types
  useEffect(() => {
    if (email || phone) {
      setEnabled(true)
    } else {
      setEnabled(false)
    }
  }, [email, phone])

  const handleEmailChange = (changedText) => {
    console.log('User is typing:', changedText)
    setEmail(changedText)
  }

  const handlePhoneChange = (changedText) => {
    console.log('User is typing:', changedText)
    setPhone(changedText)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Email Address</Text>
      <TextInput style={styles.input} value={email} onChangeText={handleEmailChange}/>
      {/* <Error showError={showNameError} keyword='name'/> */}
      <Text style={styles.text}>Phone Number</Text>
      <TextInput style={styles.input} value={phone} onChangeText={handlePhoneChange} keyboardType='numeric' maxLength={10}/>
      {/* <Error showError={showNumberError} keyword='number'/> */}
      
      <View style={styles.button}>
        <Button title='Reset' onPress={resetHandler} color={Color.redButton}/>
        <Button title='Start' onPress={startHandler} disabled={!enabled}/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 250,
    margin: 5,
    padding: 5,
    justifyContent: 'space-evenly',
  },
  text: {
    color: Color.primary,
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 2,
    borderColor: Color.primary,
    borderRadius: 7,
    //textAlign: 'center',
    fontSize: 18,
    color: Color.primary,
    padding: 3,
    backgroundColor: '#4c669f'
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  }
})