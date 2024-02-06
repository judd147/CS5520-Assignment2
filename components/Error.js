import { Text, View } from 'react-native'
import React from 'react'

export default function Error({ showError, keyword }) {
  if (showError) {
    return (
      <View>
        <Text style={{color: 'darkred'}}>Please enter a valid {keyword}</Text>
      </View>
    )
  }
}