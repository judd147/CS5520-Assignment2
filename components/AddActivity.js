import { StyleSheet, Text, TextInput, View, Pressable, Alert } from 'react-native'
import React, { useState, useContext } from 'react'
import DropDownPicker from 'react-native-dropdown-picker'
import DateTimePicker from '@react-native-community/datetimepicker'
import Checkbox from 'expo-checkbox'
//import { ActivityContext } from '../ActivityContext'
import Color from '../components/Color'
import PressableButton from "../components/PressableButton"
import { writeToDB, updateDB } from "../firebase-files/firebaseHelper";

export default function AddActivity({ route, navigation, activityId, activityValue, 
  durationValue, dateValue, dateObj, specialValue }) {
  //const { activities, setActivities } = useContext(ActivityContext)
  // states for dropdown picker
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState(activityValue) // initialize with prop
  const [items, setItems] = useState([
    {label: 'Walking', value: 'Walking'},
    {label: 'Running', value: 'Running'},
    {label: 'Swimming', value: 'Swimming'},
    {label: 'Weights', value: 'Weights'},
    {label: 'Yoga', value: 'Yoga'},
    {label: 'Cycling', value: 'Cycling'},
    {label: 'Hiking', value: 'Hiking'},
  ])
  const [duration, setDuration] = useState(durationValue) // initialize with prop
  // states for datetime picker
  const [date, setDate] = useState(dateObj) // initialize with prop
  const [dateString, setDateString] = useState(dateValue) // initialize with prop
  const [mode, setMode] = useState('date')
  const [show, setShow] = useState(false)
  const dateOptions = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  // checkbox state
  const [checked, setChecked] = useState(false)

  const handleDurationChange = (changedText) => {
    //console.log('User is typing:', changedText)
    setDuration(changedText)
  }

  const handleDateInput = () => {
    if (!dateString) {
      setDateString(date.toLocaleDateString(undefined, dateOptions).replaceAll(',', '')) // set to today if empty
    }
    setShow(!show)
  }

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    //console.log(event.type)
    setShow(false) // hide calendar after selection
    setDate(currentDate)
    setDateString(currentDate.toLocaleDateString(undefined, dateOptions).replaceAll(',', '')) // format date string
  }

  const saveHandler = () => {
    // disallow empty input or invalid duration
    if (!value || !duration || !/^\d+$/.test(duration) || duration <= 0 || !dateString) {
      Alert.alert('Invalid Input', 'Please check your input values.')
    } else if (route.name === 'Add An Activity') {
      // construct a new activity object
      const special = (value === 'Running' || value === 'Weights') && (duration > 60)
      const newActivity = {
        'title': value,
        'duration': duration,
        'dateObj': date,
        'date': dateString,
        'special': special
      }
      //setActivities([...activities, newActivity]) // update the context
      writeToDB(newActivity) // write to firebase
      navigation.goBack()
    } else if (route.name === 'Edit') {
      const special = (value === 'Running' || value === 'Weights') && (duration > 60)
      const newActivity = {
        'title': value,
        'duration': duration,
        'dateObj': date,
        'date': dateString,
        'special': checked ? false : special // if user approves, unmark special; if previously approved, mark special again
      }
      // alert user to save changes
      Alert.alert('Important', 'Are you sure you want to save these changes?', [
        {
          text: 'No',
          onPress: undefined
        },
        {
          text: 'Yes',
          onPress: () => {
            updateDB(activityId, newActivity) // update firebase
            navigation.goBack()
          }
        }
      ])
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
        <Pressable 
          style={({ pressed }) => {
            return [pressed && {opacity: 0.5}]
          }}
          onPress={handleDateInput}>
          {/* make TextInput pressable */}
          <View pointerEvents="none">
            <TextInput style={styles.input} value={dateString}/>
          </View>
        </Pressable>
        {show && <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          display={'inline'} // ios
          is24Hour={true}
          onChange={handleDateChange}
        />}
        <View style={styles.bottomContainer}>
          {specialValue && route.name === 'Edit' && <View style={styles.checkboxContainer}>
            <Text style={styles.text}>This item is marked as special. Select the checkbox if you would like to approve it.</Text>
            <Checkbox
              value={checked}
              onValueChange={() => setChecked(!checked)}
              style={styles.checkbox}>
            </Checkbox>
          </View>}
          <View style={styles.button}>
            <PressableButton customStyle={{backgroundColor: Color.redButton}} onPress={() => navigation.goBack()}>
              <Text style={styles.buttonText}>Cancel</Text>
            </PressableButton>
            <PressableButton onPress={saveHandler}>
              <Text style={styles.buttonText}>Save</Text>
            </PressableButton>
          </View>
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
  buttonText: {
    color: 'white'
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
  bottomContainer: {
    marginTop: 250,
  },
  checkboxContainer: {
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  checkbox: {
    alignSelf: 'center',
    borderColor: Color.addText,
    margin: 5,
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  }
})