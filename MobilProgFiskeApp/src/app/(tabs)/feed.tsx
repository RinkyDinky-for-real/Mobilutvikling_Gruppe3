
import { useState } from 'react';
import { FlatList, StyleSheet, Text, View, useColorScheme, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

import PostCard from '@/components/postComponents/PostCard';
import type { Post } from "@/utils/post-schema"
import { Colors, MaxContentWidth, Spacing } from '@/constants/theme';
import { SmallMapCard } from '@/components/mapComponents/small-map-card';

type FeedPost = {
  id: string;
  name: string;
  time: string;
  longlat: [number, number];
};

type FeedPost = Post & {
  liked: boolean;
};

// Temporary posts
const initialPosts: Post[] = [
  { id: '1', name: 'Alex Fisher', time: '12 min ago', likesCount: 0 },
  { id: '2', name: 'Sam River', time: '1 hour ago', likesCount: 14 },
  { id: '3', name: 'Jamie Lake', time: '3 hours ago', likesCount: 2234 },
];

export default function FeedScreen() {

  const [posts, setPosts] = useState<FeedPost[]>(
    initialPosts.map((post) => ({
      ...post,
      liked: false,
  }))
);

  const isDark = useColorScheme() === 'dark';
  const colors = Colors[isDark ? 'dark' : 'light'];

function toggleLike(postId: string) {
  setPosts((currentPosts) =>
    currentPosts.map((post) => {
      // Ignore posts that weren't clicked
      if (post.id !== postId) {
        return post;
      }

      // Toggle whether this post is liked
      const liked = !post.liked;

      return {
        ...post,
        liked: liked,
        likesCount: post.likesCount + (liked ? 1 : -1),
      };
    })
  );
}

  function openPost(postId: string) {
    router.push({
      pathname: '/posts/[id]',
      params: { id: postId },
    });
  }

  return (
    <SafeAreaView
      style={[
        styles.safeArea,
        { backgroundColor: colors.background },
      ]}
      edges={['top']}
    >
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}

        renderItem={({ item }) => (
          <PostCard
            post={item}
            liked={item.liked}
            onToggleLike={() => toggleLike(item.id)}
            onOpen={() => openPost(item.id)}
          />
        )}

        ListHeaderComponent={
          <Text style={[styles.title, { color: colors.text }]}>
            Feed
          </Text>
        }

        ItemSeparatorComponent={() => (
          <View style={{ height: Spacing.three }} />
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
  },

  listContent: {
    width: '100%',
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
    paddingHorizontal: Spacing.three,
    paddingTop: Spacing.three,
    paddingBottom: Spacing.five,

  },

  title: {
    fontSize: 30,
    fontWeight: '700',
    marginBottom: Spacing.three,
  },
});
