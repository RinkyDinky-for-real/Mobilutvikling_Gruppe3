import { StyleSheet, Text, View } from "react-native";

export default function PlaceholderScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Placeholder</Text>
      <Text style={styles.title}>This is a placeholder screen for the second tab.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
  },
});
