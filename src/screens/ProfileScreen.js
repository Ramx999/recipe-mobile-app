import React, { useCallback, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProfileScreen({ navigation }) {
  const [user, setUser] = useState(null);

  useFocusEffect(useCallback(() => {
    (async () => {
      const raw = await AsyncStorage.getItem('user');
      setUser(raw ? JSON.parse(raw) : null);
    })();
  }, []));

  const logout = async () => {
    await AsyncStorage.removeItem('session');
    navigation.replace('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.avatar}>👤</Text>
      <Text style={styles.name}>{user?.username || 'Guest'}</Text>
      <Text style={styles.email}>{user?.email}</Text>
      <TouchableOpacity style={styles.btn} onPress={logout}>
        <Text style={{ color: '#fff', fontWeight: '600' }}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  avatar: { fontSize: 80 },
  name: { fontSize: 22, fontWeight: 'bold', marginTop: 8 },
  email: { color: '#666', marginTop: 4 },
  btn: { backgroundColor: '#ff6b35', padding: 12, paddingHorizontal: 32, borderRadius: 8, marginTop: 24 },
});
