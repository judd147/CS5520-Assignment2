import { StyleSheet, Text, TextInput, View, Button } from 'react-native'
import React, { useState } from 'react'
import DropDownPicker from 'react-native-dropdown-picker'
import DateTimePicker from '@react-native-community/datetimepicker'
import Color from '../components/Color'

export default function AddActivity() {
  const [duration, setDuration] = useState(null)
  // states for dropdown picker
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState(null)
  const [items, setItems] = useState([
    {label: 'Walking', value: 'Walking'},
    {label: 'Running', value: 'Running'},
    {label: 'Swimming', value: 'Swimming'},
    {label: 'Weights', value: 'Weights'},
    {label: 'Yoga', value: 'Yoga'},
    {label: 'Cycling', value: 'Cycling'},
    {label: 'Hiking', value: 'Hiking'},
  ])
  // states for datetime picker
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const handleDurationChange = (changedText) => {
    console.log('User is typing:', changedText)
    setDuration(changedText)
  }

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  return (
    <View style={styles.container}>
      <View style={styles.group}>
        <Text style={styles.text}>Activity *</Text>
        <DropDownPicker style={styles.dropdown} textStyle={styles.dropdownText}
        open={open}
        value={value}
        items={items}
        placeholder="Select An Activity"
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        />
        <Text style={styles.text}>Duration (min) *</Text>
        <TextInput style={styles.input} value={duration} onChangeText={handleDurationChange} keyboardType='numeric'/>
        <Text style={styles.text}>Date *</Text>
        <TextInput style={styles.input} value={date.toLocaleString()} onFocus={() => setShow(true)}/>
        {show && <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          display={'inline'}
          is24Hour={true}
          onChange={handleDateChange}
        />}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.bg,
    padding: 20,
  },
  group: {
    marginTop: 30,
  },
  text: {
    color: Color.addText,
    fontSize: 16,
    fontWeight: 'bold',
    margin: 3
  },
  dropdown: {
    borderRadius: 7,
    backgroundColor: Color.addInputBg,
    marginBottom: 25 // enforce seperation between inputs
  },
  dropdownText: {
    color: Color.addText,
    fontSize: 16
  },
  input: {
    borderWidth: 2,
    borderColor: Color.addText,
    borderRadius: 7,
    fontSize: 18,
    color: Color.addText,
    padding: 3,
    backgroundColor: Color.addInputBg,
    marginBottom: 25 // enforce seperation between inputs
  },
})