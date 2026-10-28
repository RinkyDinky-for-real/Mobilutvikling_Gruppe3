import { useState } from 'react';
import {Pressable,ScrollView,StyleSheet,Text,View,useColorScheme,} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Colors, MaxContentWidth, Spacing } from '@/constants/theme';
import { SmallMapCard } from '@/components/mapComponents/small-map-card';

type FeedPost = {
  id: string;
  name: string;
  time: string;
  longlat: [number, number];
};

const posts = [
  { id: '1', name: 'Alex Fisher', time: '12 min ago', longlat: [10.757933, 59.911491] },
  { id: '2', name: 'Sam River', time: '1 hour ago', longlat: [5.325919, 59.913991] },
  { id: '3', name: 'Jamie Lake', time: '3 hours ago', longlat: [15.757933, 79.912491] },
] satisfies FeedPost[];

export default function FeedScreen() {
  const [likedPosts, setLikedPosts] = useState<string[]>([]);
  const isDark = useColorScheme() === 'dark';
  const colors = Colors[isDark ? 'dark' : 'light'];
  const cardColor = isDark ? '#1C1D1F' : '#FFFFFF';

  function toggleLike(postId: string) {
    setLikedPosts((current) =>
      current.includes(postId)
        ? current.filter((id) => id !== postId)
        : [...current, postId],
    );
  }

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          <Text style={[styles.title, { color: colors.text }]}>Feed</Text>

          {posts.map((post) => {
            const liked = likedPosts.includes(post.id);

            return (
              <View key={post.id} style={[styles.post, { backgroundColor: cardColor }]}>
                <View style={styles.postHeader}>
                  <View style={styles.author}>
                    <Text style={[styles.text, styles.semiboldText, { color: colors.text }]}>
                      {post.name}
                    </Text>
                    <Text style={[styles.smallText, { color: colors.textSecondary }]}>
                      {post.time}
                    </Text>
                  </View>
                </View>

                <SmallMapCard longlat={post.longlat} />

                <View style={styles.actions}>
                  <Pressable
                    onPress={() => toggleLike(post.id)}>
                    <Text style={[styles.text, styles.likeText, liked && styles.liked]}>
                      {liked ? '♥' : '♡'} {liked ? '1' : '0'}
                    </Text>
                  </Pressable>
                  <Text style={[styles.text, { color: colors.textSecondary }]}>
                    Comment
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    alignItems: 'center',
    paddingBottom: Spacing.five,
  },
  content: {
    width: '100%',
    maxWidth: MaxContentWidth,
    paddingHorizontal: Spacing.three,
    paddingTop: Spacing.three,
    gap: Spacing.three,
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
  },
  post: {
    padding: Spacing.three,
    borderRadius: 18,
    gap: Spacing.three,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  author: {
    flex: 1,
    marginLeft: 10,
    gap: 2,
  },
  text: {
    fontSize: 14,
  },
  semiboldText: {
    fontWeight: '600',
  },
  smallText: {
    fontSize: 12,
  },
  menu: {
    fontSize: 22,
    fontWeight: '700',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  likeText: {
    color: '#69736D',
    fontSize: 16,
  },
  liked: {
    color: '#E25F5F',
  },
});
