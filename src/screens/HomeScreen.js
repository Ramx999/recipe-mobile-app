import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { useRecipes } from '../api/recipes';

export default function HomeScreen({ navigation }) {
  const { data, loading, error, reload } = useRecipes();

  if (loading) return <ActivityIndicator style={{ flex: 1 }} size="large" color="#ff6b35" />;
  if (error) {
    return (
      <View style={styles.center}>
        <Text style={{ color: 'red' }}>Failed to load recipes</Text>
        <TouchableOpacity onPress={reload} style={styles.retry}><Text style={{ color: '#fff' }}>Retry</Text></TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>🍲 RecipeApp</Text>
      </View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.idMeal}
        contentContainerStyle={{ padding: 12 }}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Detail', { id: item.idMeal })}>
            <Image source={{ uri: item.strMealThumb }} style={styles.image} />
            <View style={{ flex: 1, padding: 12 }}>
              <Text style={styles.name}>{item.strMeal}</Text>
              <Text style={styles.chev}>Tap to view →</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f7f7f7' },
  header: { padding: 16, backgroundColor: '#ff6b35' },
  logo: { color: '#fff', fontSize: 22, fontWeight: 'bold' },
  card: { flexDirection: 'row', backgroundColor: '#fff', borderRadius: 12, marginBottom: 12, overflow: 'hidden', elevation: 2 },
  image: { width: 100, height: 100 },
  name: { fontSize: 16, fontWeight: '600' },
  chev: { color: '#ff6b35', marginTop: 8 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  retry: { marginTop: 12, backgroundColor: '#ff6b35', padding: 10, borderRadius: 8 },
});
