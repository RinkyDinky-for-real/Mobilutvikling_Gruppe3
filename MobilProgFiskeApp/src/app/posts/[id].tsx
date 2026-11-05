import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import { useFocusEffect, useLocalSearchParams } from 'expo-router';
import { colors } from '@/styles/global';
import { Map, Camera } from '@maplibre/maplibre-react-native';
import { useCallback, useState } from 'react';
import { fetchSinglePost } from '@/hooks/use-Fetch-Posts';
import { Post } from '@/utils/postSchema';
import { useAuth } from '@/utils/context';


export default function PostDetails() {
  const { userId } = useAuth();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [postData, setPostData] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  async function fetchPostData(postId: string) {
    if (!userId) {
    setPostData(null);
    setLoading(false);
    return;
    }
    try {
      const post = await fetchSinglePost(postId, userId);
      if (post) {
        setPostData(post);
      } else {
        console.error("Post not found");
      }
    } catch (error) {
      console.error("Failed to fetch post data:", error);
    }
  };
  useFocusEffect(
  useCallback(() => {
        try {
          fetchPostData(id);
        } catch (error) {
          console.error("Failed to load post data:", error);
        }finally {
          setLoading(false);
        }
      }, [id])
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
  return (
    <SafeAreaProvider>
            <View style={styles.container}>
                <Text style={styles.title}>Post details:</Text>
                <Map logo={false} attribution={false} dragPan={false} touchZoom={false} doubleTapZoom={false} touchRotate={false} touchPitch={false} mapStyle={"https://tiles.openfreemap.org/styles/liberty"}>
                    <Camera center={[postData.longitude, postData.latitude]} zoom={5}/>
                </Map>
                <View>
                    <Text>Title:{postData.title}</Text>
                    <Text>Date:{postData.date}</Text>
                    <Text>User:{postData.userName}</Text>
                    <Text>Content:{postData.content}</Text>
                </View>

            </View>
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