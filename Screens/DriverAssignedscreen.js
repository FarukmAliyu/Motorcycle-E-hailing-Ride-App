import React from 'react';
import { View, Text, Image, Button, StyleSheet, Alert } from 'react-native';

export default function DriverAssignedScreen({ route, navigation }) {
  const driver = route?.params?.driver;

  if (!driver) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>No driver assigned</Text>
        <View style={styles.buttonContainer}>
          <Button title="Back to Home" onPress={() => navigation.replace('Home')} />
        </View>
      </View>
    );
  }

  const handleCall = () => {
    Alert.alert('Calling Driver', `Dialing ${driver.phone}...`);
  };

  const handleChat = () => {
    Alert.alert('Chat', `Opening chat with ${driver.name}...`);
  };

  const handleBack = () => {
    navigation.replace('Home');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Driver Assigned!</Text>
      <Image source={{ uri: driver.photo }} style={styles.photo} />
      <Text style={styles.name}>{driver.name}</Text>
      <Text style={styles.detail}>Rating: {driver.rating} ⭐</Text>
      <Text style={styles.detail}>Bike: {driver.bike}</Text>
      <Text style={styles.detail}>Phone: {driver.phone}</Text>

      <View style={styles.buttonContainer}>
        <Button title="Call Driver" onPress={handleCall} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Chat with Driver" onPress={handleChat} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Back to Home" color="green" onPress={handleBack} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, alignItems: 'center', backgroundColor: '#f7f7f7' },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 20 },
  photo: { width: 150, height: 150, borderRadius: 75, marginBottom: 15 },
  name: { fontSize: 22, fontWeight: 'bold' },
  detail: { fontSize: 16, marginVertical: 3 },
  buttonContainer: { marginVertical: 8, width: '80%' },
});
