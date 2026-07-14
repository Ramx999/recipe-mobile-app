import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    setError('');
    try {
      const raw = await AsyncStorage.getItem('user');
      if (!raw) {
        setError('No account found. Please sign up first.');
        return;
      }
      const user = JSON.parse(raw);
      if (user.email !== email || user.password !== password) {
        setError('Invalid email or password');
        return;
      }
      await AsyncStorage.setItem('session', JSON.stringify({ email, loggedInAt: Date.now() }));
      navigation.replace('Home');
    } catch (e) {
      setError('Login failed. Try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back</Text>
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail}
        keyboardType="email-address" autoCapitalize="none" />
      <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.link}>Don't have an account? Sign up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: 'center', backgroundColor: '#fff' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 24, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 12, marginBottom: 12 },
  button: { backgroundColor: '#ff6b35', padding: 14, borderRadius: 8, alignItems: 'center', marginTop: 8 },
  buttonText: { color: '#fff', fontWeight: '600', fontSize: 16 },
  link: { color: '#ff6b35', textAlign: 'center', marginTop: 16 },
  error: { color: 'red', marginBottom: 8, textAlign: 'center' },
});
