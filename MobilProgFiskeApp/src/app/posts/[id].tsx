import { View, Text, StyleSheet, ActivityIndicator, ScrollView, Pressable, Alert } from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';
import { colors } from '@/styles/global';
import { Map, Camera } from '@maplibre/maplibre-react-native';
import { useCallback, useState } from 'react';
import { fetchSinglePost } from '@/hooks/use-Fetch-Posts';
import { Post } from '@/utils/postSchema';
import { useAuth } from '@/utils/context';
import { Spacing } from '@/constants/theme';
import { DeletePost } from '@/hooks/use-Delete-Post';


export default function PostDetails() {
  const { userId } = useAuth();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [postData, setPostData] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  //const isOwnerOfPost = postData?.userId === userId;
  useFocusEffect(
  useCallback(() => {
    let active = true;

    async function loadPost() {
      setLoading(true);

      try {
        if (!userId) {
          setPostData(null);
          return;
        }

        const result = await fetchSinglePost(id, userId);

        if (active) {
          setPostData(result[0] ?? null);
        }
      } catch (error) {
        console.error("Failed to load post data:", error);
        if (active) setPostData(null);
      } finally {
        if (active) setLoading(false);
      }
    }

    void loadPost();
    return () => {
      active = false;
    };
  }, [id, userId])
  );
  

  if (loading) {
  return <ActivityIndicator size="large" color={'#000000'} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} />;
  }
  if (!postData) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Post not found</Text>
      </View>
    );
  }
  async function handleDeletePost() {
    if (!userId) {
      Alert.alert("Delete failed", "You are not logged in");
      return; //det skal ikke være mulig å komme så langt uten å være innlogget uansett
    }
    
    try {
    await DeletePost(id, userId);
    router.back();
    } catch (error) {
    console.error("Failed to delete post:", error);
    Alert.alert("Delete failed", "Please try again.");
  }
  }

  return (
    <SafeAreaProvider>
      <ScrollView>
            <View style={styles.container}>
                <Text style={styles.title}>Title: {postData.title}</Text>
                <Map style={styles.postMap} logo={false} attribution={false} dragPan={false} touchZoom={false} doubleTapZoom={false} touchRotate={false} touchPitch={false} mapStyle={"https://tiles.openfreemap.org/styles/liberty"}>
                    <Camera center={[postData.longitude, postData.latitude]} zoom={5}/>
                </Map>
                <View style={styles.textContainer}>
                    <Text>Date:{postData.date}</Text>
                    <Text>Content:{postData.content}</Text>
                </View>
                <View style={styles.buttonContainer}>
                  <Pressable style={styles.returnButton} onPress={() => router.back()}>
                    <Text>Go back</Text>
                  </Pressable>
                  {true && (
                  <Pressable style={styles.deleteButton} onPress={() =>
                    Alert.alert("Delete post?", "This action cannot be undone.", [
                      { text: "Cancel", style: "cancel" },
                      {
                        text: "Delete",
                        style: "destructive",
                        onPress: () => void handleDeletePost(),
                      },
                    ])
                  }>
                    <Text>Delete post</Text>
                  </Pressable>   
                  )}
                </View>
            </View>
      </ScrollView>
        </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: "flex-start",
    marginHorizontal: 16,
    padding: 32,
    borderRadius: 10,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',

  },
  postMap: {
    flex: 1,
    minHeight: 200,
    maxHeight: 500,
    marginHorizontal: 16,
  },
  textContainer: {
    backgroundColor: colors.background,
    justifyContent: "flex-start",
    marginHorizontal: 16,
  },
  deleteButton: {
      backgroundColor: '#ff0000',
      borderRadius: 12,
      paddingVertical: Spacing.two,
      alignItems: 'center',
      marginTop: Spacing.one,
  },
  returnButton: {
      backgroundColor: '#888686',
      borderRadius: 12,
      paddingVertical: Spacing.two,
      alignItems: 'center',
      marginTop: Spacing.one,
  },
  buttonContainer: {
    backgroundColor: colors.background,
    marginHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
});