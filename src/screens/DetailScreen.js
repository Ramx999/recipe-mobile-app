import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function DetailScreen({ route }) {
  const { id } = route.params;
  const [meal, setMeal] = useState(null);
  const [fav, setFav] = useState(false);

  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then(r => r.json())
      .then(j => setMeal(j.meals?.[0]));
    (async () => {
      const raw = await AsyncStorage.getItem('favorites');
      const list = raw ? JSON.parse(raw) : [];
      setFav(list.some(m => m.idMeal === id));
    })();
  }, [id]);

  const toggleFav = async () => {
    const raw = await AsyncStorage.getItem('favorites');
    const list = raw ? JSON.parse(raw) : [];
    const exists = list.some(m => m.idMeal === id);
    const next = exists
      ? list.filter(m => m.idMeal !== id)
      : [...list, { idMeal: meal.idMeal, strMeal: meal.strMeal, strMealThumb: meal.strMealThumb }];
    await AsyncStorage.setItem('favorites', JSON.stringify(next));
    setFav(!exists);
  };

  if (!meal) return <ActivityIndicator style={{ flex: 1 }} size="large" color="#ff6b35" />;

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: meal.strMealThumb }} style={styles.image} />
      <View style={styles.body}>
        <Text style={styles.title}>{meal.strMeal}</Text>
        <Text style={styles.meta}>{meal.strCategory} • {meal.strArea}</Text>
        <TouchableOpacity style={[styles.fav, fav && styles.favOn]} onPress={toggleFav}>
          <Text style={{ color: '#fff', fontWeight: '600' }}>{fav ? '★ Saved' : '☆ Save to Favorites'}</Text>
        </TouchableOpacity>
        <Text style={styles.h2}>Instructions</Text>
        <Text style={styles.body2}>{meal.strInstructions}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  image: { width: '100%', height: 240 },
  body: { padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold' },
  meta: { color: '#666', marginTop: 4 },
  fav: { backgroundColor: '#999', padding: 12, borderRadius: 8, alignItems: 'center', marginTop: 16 },
  favOn: { backgroundColor: '#ff6b35' },
  h2: { fontSize: 18, fontWeight: '600', marginTop: 20, marginBottom: 8 },
  body2: { lineHeight: 22, color: '#333' },
});
