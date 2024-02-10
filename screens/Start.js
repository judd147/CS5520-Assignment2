import { StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import Input from '../components/Input'
import Background from '../components/Background'

export default function Start({ navigation }) {
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [isValidEmail, setIsValidEmail] = useState(false)
  const [isValidPhone, setIsValidPhone] = useState(false)
  const [showEmailError, setShowEmailError] = useState(false)
  const [showPhoneError, setShowPhoneError] = useState(false)

  // Reset input and error messages
  const resetHandler = () => {
    setEmail('')
    setPhone('')
    setShowEmailError(false)
    setShowPhoneError(false)
  }

  // Show errors or navigate to Activity screen
  const startHandler = () => {
    if (isValidEmail && isValidPhone) {
      setShowEmailError(false)
      setShowPhoneError(false)
      navigation.navigate('Activity')
    }
    if (!isValidEmail) {
      setShowEmailError(true)
    } else {
      setShowEmailError(false)
    }
    if (!isValidPhone) {
      setShowPhoneError(true)
    } else {
      setShowPhoneError(false)
    }
  }

  return (
    <Background>
      <View style={styles.container}>
        <Input email={email} setEmail={setEmail} phone={phone} setPhone={setPhone} setIsValidEmail={setIsValidEmail} setIsValidPhone={setIsValidPhone}
          showEmailError={showEmailError} showPhoneError={showPhoneError} resetHandler={resetHandler} startHandler={startHandler}/>
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