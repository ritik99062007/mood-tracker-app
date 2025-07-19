import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { saveMood } from '../utils/storage';
import { useRouter } from 'expo-router';

export default function LogMoodScreen() {
  const [mood, setMood] = useState('');
  const [note, setNote] = useState('');
  const router = useRouter();

  const handleSave = async () => {
    if (!mood) return;

    const moodEntry = {
      id: Date.now().toString(), // Unique ID
      date: new Date().toISOString().split('T')[0], // Format: YYYY-MM-DD
      mood: mood,
      note: note,
    };

    await saveMood(moodEntry);
    router.replace('/'); // Go back to Home
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 18, marginBottom: 8 }}>How are you feeling today?</Text>

      <TextInput
        placeholder="Enter your mood (e.g., Happy, Sad)"
        value={mood}
        onChangeText={setMood}
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          padding: 8,
          marginBottom: 12,
          borderRadius: 6,
        }}
      />

      <TextInput
        placeholder="Optional note"
        value={note}
        onChangeText={setNote}
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          padding: 8,
          marginBottom: 12,
          borderRadius: 6,
        }}
      />

      <Button title="Save Mood" onPress={handleSave} />
    </View>
  );
}
