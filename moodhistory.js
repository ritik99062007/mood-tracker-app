import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { getStoredMoods } from '../utils/storage'; // ✅ Make sure this file exists

export default function MoodHistoryScreen() {
  const [moodHistory, setMoodHistory] = useState([]);

  useEffect(() => {
    const loadMoods = async () => {
      const moods = await getStoredMoods();
      // Sort by date descending (latest first)
      const sorted = moods.sort((a, b) => b.date.localeCompare(a.date));
      setMoodHistory(sorted);
    };

    loadMoods();
  }, []);

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>
        Mood History
      </Text>

      {moodHistory.length === 0 ? (
        <Text>No mood logs yet.</Text>
      ) : (
        <FlatList
          data={moodHistory}
          // ✅ More reliable key
          keyExtractor={(item, index) =>
            item?.id ? item.id : `${item.date}-${index}`
          }
          renderItem={({ item }) => (
            <View style={{ paddingVertical: 6 }}>
              <Text>
                {item.date}: {item.mood} {item.note ? `(${item.note})` : ''}
              </Text>
            </View>
          )}
        />
      )}
    </View>
  );
}
