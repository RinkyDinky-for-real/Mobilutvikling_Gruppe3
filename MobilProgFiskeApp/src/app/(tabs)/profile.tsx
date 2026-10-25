import { StyleSheet, Text, ScrollView} from "react-native";
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import ProfileHeader from "@/components/profile/ProfileHeader";
import { colors } from '@/styles/global';
import ProfileStats from "@/components/profile/ProfileStats";

export default function ProfileScreen() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <ProfileHeader
            username="John Doe"
            profilePicture="https://picsum.photos/200"
            backgroundImage="https://picsum.photos/600/200"
            followersCount={100}
            catches={50}
            spots={25}
        />
        <ProfileStats
          followersCount={100}
          catches={50}
          spots={25}
        />
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.title}>Profile</Text>
          <Text style={styles.title}>This is the user profile screen.</Text>
        </ScrollView>
      </SafeAreaView>
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
    fontSize: 20,
    fontWeight: "600",
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  backgroundImage: {
    position: "absolute",
    top: 0,
  },
});
