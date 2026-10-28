import { useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useColorScheme,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, MaxContentWidth, Spacing } from '@/constants/theme';
import { router } from 'expo-router'
import PostCard from '@/components/postComponents/PostCard';

const posts = [
  { id: '1', name: 'Alex Fisher', time: '12 min ago' },
  { id: '2', name: 'Sam River', time: '1 hour ago' },
  { id: '3', name: 'Jamie Lake', time: '3 hours ago' },
];

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
  imagePlaceholder: {
    width: '100%',
    aspectRatio: 1.2,
    borderRadius: 12,
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
