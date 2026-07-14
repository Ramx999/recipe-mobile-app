import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import * as Notifications from 'expo-notifications';

export default function NotificationsScreen() {
  const [status, setStatus] = useState('');

  const sendTestNotification = async () => {
    const perm = await Notifications.getPermissionsAsync();
    if (perm.status !== 'granted') {
      const req = await Notifications.requestPermissionsAsync();
      if (req.status !== 'granted') {
        Alert.alert('Permission required', 'Enable notifications in system settings.');
        return;
      }
    }
    await Notifications.scheduleNotificationAsync({
      content: {
        title: '🍲 RecipeApp',
        body: 'This is a test notification!',
        data: { type: 'test' },
      },
      trigger: { seconds: 2 },
    });
    setStatus('Notification scheduled — will appear in 2 seconds.');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notifications</Text>
      <Text style={styles.desc}>Trigger a local notification to test the setup.</Text>
      <TouchableOpacity style={styles.btn} onPress={sendTestNotification}>
        <Text style={styles.btnText}>Send Test Notification</Text>
      </TouchableOpacity>
      {status ? <Text style={styles.status}>{status}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 8 },
  desc: { color: '#666', marginBottom: 24 },
  btn: { backgroundColor: '#ff6b35', padding: 14, borderRadius: 8, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: '600', fontSize: 16 },
  status: { marginTop: 16, color: 'green', textAlign: 'center' },
});
