import { View, Text, StyleSheet } from 'react-native';
import { colors } from '@/styles/global';
import CatchCard from './CatchCard';

export default function RecentCatches() {
  const recentCatches = [
    {
      id: "1",
      imageUrl: "https://picsum.photos/500/320",
      species: "Salmon",
      weight: 2.5,
      date: "2023-10-01"
    },
    {
      id: "2",
      imageUrl: "https://picsum.photos/200/300",
      species: "Trout",
      weight: 1.8,
      date: "2023-10-02"
    },
    {
      id: "3",
        imageUrl: "https://picsum.photos/300/200",
        species: "Bass",
        weight: 3.2,
        date: "2023-10-03"
    },
    {
      id: "4",
      imageUrl: "https://picsum.photos/400/300",
        species: "Pike",
        weight: 4.0,
        date: "2023-10-04"
    },
    {
      id: "5",
      imageUrl: "https://picsum.photos/300/400",
        species: "Catfish",
        weight: 5.5,
        date: "2023-10-05"
    }
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recent Catches</Text>
      <View style={styles.catchesContainer}>
        {recentCatches.map((catchItem) => (
          <CatchCard key={catchItem.id} {...catchItem} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    width: "90%",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  catchesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    marginBottom: 10,
  },
});
