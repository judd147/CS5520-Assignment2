import { StyleSheet, Text, TextInput, View, Button, Alert } from 'react-native'
import React, { useState, useContext } from 'react'
import DropDownPicker from 'react-native-dropdown-picker'
import DateTimePicker from '@react-native-community/datetimepicker'
import { ActivityContext } from '../ActivityContext'
import Color from '../components/Color'

export default function AddActivity({ navigation }) {
  const [duration, setDuration] = useState(null)
  // activity context
  const { activities, setActivities } = useContext(ActivityContext)
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
  const [date, setDate] = useState(new Date())
  const [dateString, setDateString] = useState('')
  const [mode, setMode] = useState('date')
  const [show, setShow] = useState(false)
  const dateOptions = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  const handleDurationChange = (changedText) => {
    console.log('User is typing:', changedText)
    setDuration(changedText)
  }

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false); // hide calendar after selection
    setDate(currentDate);
    setDateString(currentDate.toLocaleDateString(undefined, dateOptions).replaceAll(',', '')) // format date string
  };

  const saveHandler = () => {
    // no empty input or invalid duration
    if (!value || !duration || !/^\d+$/.test(duration) || duration <= 0 || !dateString) {
      Alert.alert('Invalid Input', 'Please check your input values.')
    } else {
      const newActivity = {
        'title': value,
        'duration': duration + ' min',
        'date': dateString,
        'special': false
      }
      setActivities([...activities, newActivity]) // update the context
      navigation.goBack()
    }
  }

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
        <TextInput style={styles.input} value={dateString} onFocus={() => setShow(true)}/>
        {show && <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          display={'inline'} /* ios */
          is24Hour={true}
          onChange={handleDateChange}
        />}
        <View style={styles.button}>
          <Button title='Cancel' onPress={() => navigation.goBack()} color={Color.redButton}/>
          <Button title='Save' onPress={saveHandler} color={Color.addText}/>
        </View>
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
  button: {
    marginTop: 250, // place buttons at bottom
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  }
})