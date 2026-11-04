import { View, Text, StyleSheet } from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';
import { colors } from '@/styles/global';


export default function PostDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <SafeAreaProvider>
      <SafeAreaProvider style={styles.container}>
        <Text style={styles.title}>Post Details</Text>
        <Text>Currently viewing post: {id}</Text>

      </SafeAreaProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: "flex-start",
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});