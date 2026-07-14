import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Switch } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SettingsScreen({ navigation }) {
  const [darkMode, setDarkMode] = React.useState(false);
  const [notif, setNotif] = React.useState(true);

  React.useEffect(() => {
    (async () => {
      const s = await AsyncStorage.getItem('settings');
      if (s) {
        const parsed = JSON.parse(s);
        setDarkMode(!!parsed.darkMode);
        setNotif(parsed.notif !== false);
      }
    })();
  }, []);

  const save = async (next) => {
    await AsyncStorage.setItem('settings', JSON.stringify(next));
  };

  const items = [
    { label: '🔔 Notifications', screen: 'Notifications' },
    { label: '👤 Account', screen: null },
    { label: '🌐 Language', screen: null },
    { label: 'ℹ️ About', screen: null },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.label}>Dark mode</Text>
        <Switch value={darkMode} onValueChange={(v) => { setDarkMode(v); save({ darkMode: v, notif }); }} />
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Enable notifications</Text>
        <Switch value={notif} onValueChange={(v) => { setNotif(v); save({ darkMode, notif: v }); }} />
      </View>
      {items.map((it) => (
        <TouchableOpacity key={it.label} style={styles.item}
          onPress={() => it.screen && navigation.navigate(it.screen)}>
          <Text style={styles.label}>{it.label}</Text>
          <Text style={{ color: '#999' }}>›</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f7f7f7', paddingTop: 12 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    backgroundColor: '#fff', padding: 16, marginBottom: 1 },
  item: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    backgroundColor: '#fff', padding: 16, marginBottom: 1 },
  label: { fontSize: 16 },
});
