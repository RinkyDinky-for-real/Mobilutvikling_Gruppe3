import { StyleSheet, ScrollView, Alert, Modal, View, TextInput, Pressable } from "react-native";
import { useEffect, useState } from "react";
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import ProfileHeader from "@/components/profileComponents/ProfileHeader";
import { colors } from '@/styles/global';
import ProfileStats from "@/components/profileComponents/ProfileStats";
import ProfileInfo from "@/components/profileComponents/ProfileInfo";
import RecentCatches from "@/components/profileComponents/RecentCatches";
import { fetchUser } from "@/hooks/use-Fetch-User";
import { EditUser } from "@/hooks/use-Edit-User";
import { fetchAllPostsFromUser, fetchPostsCountFromUser } from "@/hooks/use-Fetch-Posts";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";

export default function ProfileScreen() {
  const userId = "1133794227705107";

  const [profileData, setProfileData] = useState({
    username: "Loading...",
    spots: 0,
    favoriteFish: "Loading...",
    favoriteSpot: "Loading...",
    fishingStyle: "Loading...",
    posts: [] as unknown[],
  });
  
  const [editVisible, setEditVisible] = useState(false);
  const [draft, setDraft] = useState({
  favoriteFish: "",
  favoriteSpot: "",
  fishingStyle: "",
  });
  const [saving, setSaving] = useState(false);

  function openEditForm() {
  setDraft({
    favoriteFish: profileData.favoriteFish,
    favoriteSpot: profileData.favoriteSpot,
    fishingStyle: profileData.fishingStyle,
  });
  setEditVisible(true);
}
  async function saveProfile() {
  setSaving(true);
  try {
    await EditUser(
      userId,
      undefined, // username
      undefined,
      draft.fishingStyle,
      draft.favoriteSpot,
      draft.favoriteFish,
    );

    setProfileData((current) => ({ ...current, ...draft }));
    setEditVisible(false);
  } catch {
    Alert.alert("Couldn't save profile", "Please try again.");
  } finally {
    setSaving(false);
    loadProfile();
  }
}

  async function loadProfile() {
    try {
      const userId = "1133794227705107";
      const userResponse = await fetchUser(userId);
      const user = Array.isArray(userResponse) ? userResponse[0] : userResponse;

      if (!user) {
        throw new Error("User not found");
      }
      console.log("User Response:", userResponse);
      const postsCountResponse = await fetchPostsCountFromUser(userId);
      const postsResponse = await fetchAllPostsFromUser(userId);

      setProfileData({
        username: user.UserName,
        spots: postsCountResponse,
        favoriteFish: user.FavoriteFish,
        favoriteSpot: user.FavoritePlace,
        fishingStyle: user.FavoriteFishingMethod,
        posts: postsResponse,
      });
  

    
    } catch (error) {
      console.error("Failed to load profile data:", error);
    }
  }

  useEffect(() => {
    void loadProfile();
  }, []);

  return (

    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
        <ProfileHeader
            username={profileData.username}
            profilePicture="https://picsum.photos/200"
            backgroundImage="https://picsum.photos/600/200"
            spots={profileData.spots}
        />
        <ProfileStats
          spots={profileData.spots}
        />
        <ProfileInfo
          favoriteFish={profileData.favoriteFish}
          favoriteSpot={profileData.favoriteSpot}
          fishingStyle={profileData.fishingStyle}
          onEdit={openEditForm}
        />
        <RecentCatches/>
        </ScrollView>
        <Modal
          visible={editVisible}
          backdropColor={colors.background}
          animationType="slide"
          onRequestClose={() => setEditVisible(false)}
        >
          <ThemedView style={styles.editcontainer}>
            
            <ThemedText type="title">Edit Profile</ThemedText>
              <ThemedView>
                <ThemedText>Favorite fish</ThemedText>
                  <TextInput
                    value={draft.favoriteFish}
                    onChangeText={(value) =>
                      setDraft((current) => ({ ...current, favoriteFish: value }))
                    }
                  />
              </ThemedView>
              <ThemedView>        
                <ThemedText>Favorite spot</ThemedText>
                <TextInput
                  value={draft.favoriteSpot}
                  onChangeText={(value) =>
                    setDraft((current) => ({ ...current, favoriteSpot: value }))
                  }
                />
              </ThemedView>
            <ThemedText>Fishing style</ThemedText>
            <TextInput
              value={draft.fishingStyle}
              onChangeText={(value) =>
                setDraft((current) => ({ ...current, fishingStyle: value }))
              }
            />

            <Pressable onPress={() => void saveProfile()} disabled={saving}>
              <ThemedText>{saving ? "Saving..." : "Save"}</ThemedText>
            </Pressable>
            <Pressable onPress={() => setEditVisible(false)}>
              <ThemedText>Cancel</ThemedText>
            </Pressable>
          </ThemedView>
        </Modal>
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
  editcontainer: {
    marginTop: 20,
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
    alignItems: "stretch",
    justifyContent: "center",
  },
  backgroundImage: {
    position: "absolute",
    top: 0,
  },
});

