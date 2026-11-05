import { StyleSheet, ScrollView, Alert, Modal, View, Text, TextInput, Pressable, FlatList, ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import { router } from 'expo-router';

import { postSchema, type Post } from "@/utils/postSchema"
import ProfileHeader from "@/components/profileComponents/ProfileHeader";
import { colors } from '@/styles/global';
import ProfileStats from "@/components/profileComponents/ProfileStats";
import ProfileInfo from "@/components/profileComponents/ProfileInfo";
import { fetchUser } from "@/hooks/use-Fetch-User";
import { EditUser } from "@/hooks/use-Edit-User";
import { fetchAllPostsFromUser, fetchPostsCountFromUser } from "@/hooks/use-Fetch-Posts";
import PostCard from '@/components/postComponents/PostCard';
import { useAuth } from "@/utils/context";

export default function ProfileScreen() {
  const { userId, signOut } = useAuth();

  const [profileData, setProfileData] = useState({
    username: "Loading...",
    spots: 0,
    favoriteFish: "Loading...",
    favoriteSpot: "Loading...",
    fishingStyle: "Loading...",
    posts: [] as unknown[],
  });
  
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
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
      userId!, // Might cause issues if userId is undefined, but we are assuming it's always defined when this function is called
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
    if (!userId) return;

    try {
      const userResponse = await fetchUser(userId);
      const user = Array.isArray(userResponse) ? userResponse[0] : userResponse;
      console.log("User Response:", userResponse);
      const postsCountResponse = await fetchPostsCountFromUser(userId);
      const postsResponse = await fetchAllPostsFromUser(userId);

      if (!user) {
      throw new Error("User not found");
      }

      setProfileData({
        username: user.userName,
        spots: postsCountResponse,
        favoriteFish: user.favoriteFish,
        favoriteSpot: user.favoritePlace,
        fishingStyle: user.favoriteFishingMethod,
        posts: postsResponse,
      });
  

    
    } catch (error) {
      console.error("Failed to load profile data:", error);
    }
  }

  useEffect(() => {
    void loadProfile();
  }, [userId]);

  useEffect(() => {
  if (!userId) {
    setPosts([]);
    setLoading(false);
    return;
  }
  const currentUserId = userId;
  let cancelled = false;

  async function loadPosts() {
    try {
      setLoading(true);
      setError(null);

      const fetchedPosts = await fetchAllPostsFromUser(currentUserId);
      const result = postSchema.array().safeParse(fetchedPosts);

      if (!result.success) {
        console.error("Invalid post data:", result.error);
        throw new Error("Invalid API response format");
      }

      if (!cancelled) setPosts(result.data);
    } catch (err) {
      console.error("Failed to load posts:", err);
      if (!cancelled) setError("Could not load posts.");
    } finally {
      if (!cancelled) setLoading(false);
    }
  }

  void loadPosts();

  return () => {
    cancelled = true;
  };
  }, [userId]);

    function openPost(postId: string) {
        router.push({
          pathname: '/posts/[id]',
          params: { id: postId },
        });
      }
  return (

    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        
        <FlatList
                data={posts}
                keyExtractor={(item) => item.postId}
        
                renderItem={({ item }) => (
                  <PostCard
                    post={item}
                    onOpen={() => openPost(item.postId)}
                  />
                )}
        
                ListHeaderComponent={
                  <View>
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
                    signOut={signOut}
                    />
                    <Text style={styles.title}>
                      My posts
                    </Text>
                  </View>
                }
        
                ListEmptyComponent={
                  loading ? (
                    <ActivityIndicator size="large" />
                  ) : (
                    <Text>
                      {error || "No posts available."}
                    </Text>
                  )
                }
        
                ItemSeparatorComponent={() => (
                  <View style={{ height: 16 }} />
                )}
        
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
              />
        
        <Modal
          visible={editVisible}
          backdropColor={colors.background}
          animationType="slide"
          onRequestClose={() => setEditVisible(false)}
        >
          <View style={styles.editcontainer}>
            
            <Text style={styles.edittitle} >Edit Profile</Text>
              <View>
                <Text style={styles.edittext}>Favorite fish</Text>
                  <TextInput
                    value={draft.favoriteFish}
                    onChangeText={(value) =>
                      setDraft((current) => ({ ...current, favoriteFish: value }))
                    }
                  />
              </View>
              <View>        
                <Text>Favorite spot</Text>
                <TextInput
                  value={draft.favoriteSpot}
                  onChangeText={(value) =>
                    setDraft((current) => ({ ...current, favoriteSpot: value }))
                  }
                />
              </View>
            <Text style={styles.edittext} >Fishing style</Text>
            <TextInput
              value={draft.fishingStyle}
              onChangeText={(value) =>
                setDraft((current) => ({ ...current, fishingStyle: value }))
              }
            />

            <Pressable onPress={() => void saveProfile()} disabled={saving}>
              <Text>{saving ? "Saving..." : "Save"}</Text>
            </Pressable>
            <Pressable onPress={() => setEditVisible(false)}>
              <Text>Cancel</Text>
            </Pressable>
          </View>
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
  edittitle:{
    fontSize: 48,
    fontWeight: "400",
  },
  edittext:{
    fontSize: 16,
    fontWeight: "400",
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
  listContent: {
    width: '100%',
    maxWidth: 800,
    alignSelf: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 32,

  },
});

