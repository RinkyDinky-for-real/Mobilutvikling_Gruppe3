
import { useState, useEffect, Activity } from 'react';
import { ActivityIndicator,FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { colors } from '@/styles/global';

import { postSchema, type Post } from "@/utils/postSchema"
import PostCard from '@/components/postComponents/PostCard';
import { fetchRandomPosts } from '@/hooks/use-Fetch-Posts';
import { useAuth } from '@/utils/context';

export default function FeedScreen() {

  const { userId } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) {
      setPosts([]);
      setLoading(false);
      return;
    }

    let cancelled = false;

    async function loadPosts() {
      try {
        setLoading(true);
        setError(null);

        const fetchedPosts = await fetchRandomPosts(20);

        console.log("API Response:", fetchedPosts);

        const result = postSchema.array().safeParse(fetchedPosts);

        if (!result.success) {
          console.error("Invalid post data:", result.error);
          throw new Error("Invalid API response format");
        }

        if (!cancelled) {
          setPosts(result.data);
        }
      } catch (err) {
        console.error("Failed to load posts:", err);

        if (!cancelled) {
          setError("Could not load posts.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadPosts();

    return () => {
      cancelled = true;
    };
  }, [userId]);

  // Replace later with use-fetch-posts hook to fetch a single post and navigate to the post page
  function openPost(postId: string) {
    router.push({
      pathname: '/post',
      params: { id: postId },
    });
  }

  return (
    <SafeAreaView
      style={styles.safeArea}
      edges={['top']}
    >
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
          <Text style={styles.title}>
            Feed
          </Text>
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background
  },

  listContent: {
    width: '100%',
    maxWidth: 800,
    alignSelf: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 32,

  },

  title: {
    fontSize: 30,
    fontWeight: '700',
    marginBottom: 16,
    color: colors.text
  },
});
