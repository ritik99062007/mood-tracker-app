import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'mood_entries';

export async function getStoredMoods() {
  const json = await AsyncStorage.getItem(STORAGE_KEY);
  return json ? JSON.parse(json) : [];
}

export async function saveMood(moodEntry) {
  const current = await getStoredMoods();
  const filtered = current.filter(m => m.date !== moodEntry.date); // only one per day
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify([moodEntry, ...filtered]));
}
