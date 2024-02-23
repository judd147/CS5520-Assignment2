import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native'
import Start from './screens/Start';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useContext } from 'react';
import { Ionicons } from '@expo/vector-icons'
import { ActivityProvider } from './ActivityContext';
import Activity from './screens/Activity';
import AddActivity from './screens/AddActivity';
import Color from './components/Color';
import PressableButton from "./components/PressableButton"

const Stack = createNativeStackNavigator();

export default function App() {
  const deleteHandler = () => {

  }
  // define the navigator and routes
  return (
    <ActivityProvider>
      <NavigationContainer>
        <StatusBar style="auto" />
        <Stack.Navigator initialRouteName="Start">
          <Stack.Screen name="Start" component={Start} options={{ headerShown: false }}/>
          <Stack.Screen name="Activity" component={Activity} options={{ headerShown: false }}/>
          <Stack.Screen name="Add An Activity" component={AddActivity} options={{ 
            headerTintColor: 'white',
            headerStyle: { backgroundColor: Color.headerBg, shadowOpacity: 0},
            headerBackTitleVisible: false
            }}/>
          <Stack.Screen name="Edit" component={AddActivity} options={{ 
            headerTintColor: 'white',
            headerStyle: { backgroundColor: Color.headerBg, shadowOpacity: 0},
            headerBackTitleVisible: false,
            headerRight: () => (
              <PressableButton customStyle={styles.button} onPress={deleteHandler}>
                <Ionicons name="trash" size={24} color="white" />
              </PressableButton>
            )
            }}/>
        </Stack.Navigator>
      </NavigationContainer>
    </ActivityProvider>
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