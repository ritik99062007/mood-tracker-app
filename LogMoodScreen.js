import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity } from 'react-native';
import { saveMood } from '../../utils/storage'; // ✅ fixed import path
import { useRouter } from 'expo-router'; // ✅ use expo-router navigation
import { v4 as uuidv4 } from 'uuid';

const moods = ['😊', '😐', '😞', '😡', '😴'];

export default function LogMoodScreen() {
  const [selectedMood, setSelectedMood] = useState(null);
  const [note, setNote] = useState('');
  const router = useRouter(); // ✅ useRouter instead of useNavigation

  const handleSave = async () => {
    if (!selectedMood) return;
    const newMood = {
      id: uuidv4(),
      date: new Date().toISOString().split('T')[0],
      mood: selectedMood,
      note,
    };
    await saveMood(newMood);
    router.back(); // ✅ go back using Expo Router
  };

  return (
    <View style={{ padding: 16 }}>
      <Text>Select Mood:</Text>
      <View style={{ flexDirection: 'row' }}>
        {moods.map((mood) => (
          <TouchableOpacity key={mood} onPress={() => setSelectedMood(mood)}>
            <Text style={{ fontSize: 30, margin: 10 }}>{mood}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TextInput
        placeholder="Optional note..."
        onChangeText={setNote}
        style={{ borderWidth: 1, padding: 8, marginVertical: 10 }}
      />
      <Button title="Save Mood" onPress={handleSave} />
    </View>
  );
}
