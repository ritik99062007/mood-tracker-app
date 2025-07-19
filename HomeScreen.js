import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import { getStoredMoods } from '../../utils/storage';
import { useRouter } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';

export default function HomeScreen() {
  const [moods, setMoods] = useState([]);
  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      const load = async () => {
        const stored = await getStoredMoods();
        setMoods(stored);
      };
      load();
    }, [])
  );

  const today = new Date().toISOString().split('T')[0];
  const todayMood = moods.find((m) => m.date === today);

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 18, marginBottom: 10 }}>
        Today's Mood: {todayMood ? todayMood.mood : 'Not logged'}
      </Text>

      <Button title="Log Today's Mood" onPress={() => router.push('/logmood')} />

      <FlatList
        data={moods}
        keyExtractor={(item, index) => item?.id || `${item?.date}-${index}`}
        renderItem={({ item }) => (
          <Text style={{ marginVertical: 4 }}>
            {item.date}: {item.mood} {item.note ? `(${item.note})` : ''}
          </Text>
        )}
        style={{ marginVertical: 20 }}
      />

      <Button title="View Mood History" onPress={() => router.push('/moodhistory')} />
    </View>
  );
}
