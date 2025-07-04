import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './Screens/LoginScreen';
import RegisterScreen from './Screens/Registerscreen';
import HomeScreen from './Screens/Homescreen';
import BookingScreen from './Screens/Bookingscreen';
import DriverAssignedScreen from './Screens/DriverAssignedscreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name= "Booking" component={BookingScreen} />
        <Stack.Screen name="DriverAssigned" component={DriverAssignedScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
