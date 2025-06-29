import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DRIVERS } from './data/drivers';

export default function BookingScreen({ navigation }) {
  const [region, setRegion] = useState(null);
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [marker, setMarker] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Location permission is required.');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    })();
  }, []);

  const handleMapPress = (e) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    setMarker({ latitude, longitude });
  };

  const handleConfirm = async () => {
    if (!pickup || !destination) {
      Alert.alert('Error', 'Please fill both pickup and destination.');
      return;
    }

    // 1️⃣ Pick a random driver
    const randomDriver = DRIVERS[Math.floor(Math.random() * DRIVERS.length)];

    // 2️⃣ Store booking locally (with driver)
    const booking = {
      pickup,
      destination,
      marker,
      time: new Date().toISOString(),
      driver: randomDriver
    };

    await AsyncStorage.setItem('lastBooking', JSON.stringify(booking));

    // 3️⃣ Navigate to DriverAssignedScreen
    navigation.navigate('DriverAssigned', { driver: randomDriver });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Book Your Ride</Text>

      {region ? (
        <MapView
          style={styles.map}
          initialRegion={region}
          onPress={handleMapPress}
        >
          {marker && (
            <Marker coordinate={marker} title="Selected" />
          )}
        </MapView>
      ) : (
        <Text>Loading Map...</Text>
      )}

      <TextInput
        placeholder="Pickup location"
        value={pickup}
        onChangeText={setPickup}
        style={styles.input}
      />
      <TextInput
        placeholder="Destination"
        value={destination}
        onChangeText={setDestination}
        style={styles.input}
      />

      <Button title="Confirm Ride" onPress={handleConfirm} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  title: { fontSize: 24, textAlign: 'center', marginVertical: 10 },
  map: { flex: 1, marginBottom: 10 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginVertical: 5,
    borderRadius: 5,
  },
});
