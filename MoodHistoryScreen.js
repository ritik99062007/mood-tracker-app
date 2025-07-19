import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { getStoredMoods } from '../../utils/storage'; // ✅ corrected path

export default function MoodHistoryScreen() {
  const [moods, setMoods] = useState([]);

  useEffect(() => {
    getStoredMoods().then(setMoods);
  }, []);

  return (
    <View style={{ padding: 16 }}>
      <FlatList
        data={moods}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ padding: 8, borderBottomWidth: 1 }}>
            <Text>{item.date} - {item.mood}</Text>
            {item.note ? <Text>Note: {item.note}</Text> : null}
          </View>
        )}
      />
    </View>
  );
}
