import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen({ navigation }) {
  const [lastBooking, setLastBooking] = useState(null);

  // Load last booking
  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const data = await AsyncStorage.getItem('lastBooking');
        if (data) setLastBooking(JSON.parse(data));
      } catch (e) {
        console.error('Error loading booking', e);
      }
    };

    // Load once and also when screen focuses
    fetchBooking();
    const unsubscribe = navigation.addListener('focus', fetchBooking);
    return unsubscribe;
  }, [navigation]);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    navigation.replace('Login');
  };

  const handleBookRide = () => {
    navigation.navigate('Booking');
  };

  const handlePastRides = () => {
    alert('Navigate to Past Rides Screen!');
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://img.icons8.com/color/96/motorcycle.png' }}
        style={styles.logo}
      />

      <Text style={styles.title}>Welcome to E-Ride</Text>
      <Text style={styles.subtitle}>Book safe and quick motorcycle rides</Text>

      <View style={styles.buttonContainer}>
        <Button title="Book a Ride" onPress={handleBookRide} />
      </View>

      <View style={styles.buttonContainer}>
        <Button title="View Past Rides" onPress={handlePastRides} />
      </View>

      {lastBooking && (
        <View style={styles.bookingBox}>
          <Text style={styles.bookingTitle}>Last Booking:</Text>
          <Text>Pickup: {lastBooking.pickup}</Text>
          <Text>Destination: {lastBooking.destination}</Text>
          <Text>Time: {new Date(lastBooking.time).toLocaleString()}</Text>
        </View>
      )}

      <View style={styles.logoutContainer}>
        <Button title="Logout" color="red" onPress={handleLogout} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 30,
    color: '#666',
    textAlign: 'center',
  },
  buttonContainer: {
    width: '80%',
    marginVertical: 10,
  },
  logoutContainer: {
    marginTop: 30,
    width: '60%',
  },
  bookingBox: {
    marginTop: 20,
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#f9f9f9',
    width: '90%',
  },
  bookingTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});
