import { StatusBar } from 'expo-status-bar';
import Start from './screens/Start';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Activity from './screens/Activity';
import AddActivity from './screens/AddActivity';
import Color from './components/Color';

const Stack = createNativeStackNavigator();

export default function App() {
  // define the navigator and routes
  return (
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}