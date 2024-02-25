import { StatusBar } from 'expo-status-bar';
import { Alert, StyleSheet } from 'react-native'
import Start from './screens/Start';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons'
//import { ActivityProvider } from './ActivityContext';
import Activity from './screens/Activity';
import Edit from './screens/Edit';
import Add from './screens/Add';
import Color from './components/Color';
import PressableButton from "./components/PressableButton"
import { deletefromDB } from "./firebase-files/firebaseHelper";

const Stack = createNativeStackNavigator();

export default function App() {
  const deleteHandler = (route, navigation) => {
    // alert user to confirm deletion
    Alert.alert('Delete', 'Are you sure you want to delete this item?', [
      {
        text: 'No',
        onPress: undefined
      },
      {
        text: 'Yes',
        onPress: () => {
          const { activityId } = route.params;
          deletefromDB(activityId) // delete from firestore
          navigation.goBack()
        }
      }
    ])
  }

  // define the navigator and routes
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={Start} options={{ headerShown: false }}/>
        <Stack.Screen name="Activity" component={Activity} options={{ headerShown: false }}/>
        <Stack.Screen name="Add An Activity" component={Add} options={{ 
          headerTintColor: 'white',
          headerStyle: { backgroundColor: Color.headerBg, shadowOpacity: 0},
          headerBackTitleVisible: false
          }}/>
        <Stack.Screen name="Edit" component={Edit} options={({ route, navigation }) => ({ // pass screen props to the options
          headerTintColor: 'white',
          headerStyle: { backgroundColor: Color.headerBg, shadowOpacity: 0},
          headerBackTitleVisible: false,
          headerRight: () => (
            <PressableButton customStyle={styles.button} onPress={() => deleteHandler(route, navigation)}>
              <Ionicons name="trash" size={24} color="white" />
            </PressableButton>
          )
          })}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 0,
    paddingHorizontal: 0,
    marginRight: 8,
    backgroundColor: 'transparent'
  }
})