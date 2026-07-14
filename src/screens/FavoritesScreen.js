import React, { useCallback, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function FavoritesScreen({ navigation }) {
  const [items, setItems] = useState([]);

  useFocusEffect(useCallback(() => {
    (async () => {
      const raw = await AsyncStorage.getItem('favorites');
      setItems(raw ? JSON.parse(raw) : []);
    })();
  }, []));

  if (items.length === 0) {
    return <View style={styles.center}><Text>No favorites yet ⭐</Text></View>;
  }

  return (
    <FlatList
      data={items}
      keyExtractor={(i) => i.idMeal}
      contentContainerStyle={{ padding: 12 }}
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Detail', { id: item.idMeal })}>
          <Image source={{ uri: item.strMealThumb }} style={styles.image} />
          <Text style={styles.name}>{item.strMeal}</Text>
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  card: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 8, borderRadius: 10, marginBottom: 10 },
  image: { width: 60, height: 60, borderRadius: 8, marginRight: 12 },
  name: { fontSize: 16, fontWeight: '500' },
});
