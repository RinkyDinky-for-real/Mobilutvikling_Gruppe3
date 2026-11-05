import { colors, globalStyles } from '@/styles/global';
import type { Post } from "@/utils/postSchema";
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { SmallMapCard } from '@/components/mapComponents/small-map-card';

type PostCardProps = {
  post: Post;
  onOpen?: () => void;
};

export default function PostCard({
  post,
  onOpen
}: PostCardProps) {
    const { title, longitude, latitude, date } = post;

  return (
    <View style={[styles.postContainer, globalStyles.shadow]}>
      <Pressable onPress={onOpen} disabled={!onOpen}>
        <Text style={styles.title}>{title}</Text>
        <SmallMapCard longlat={[longitude, latitude]} zoom={10} />
        <View style={styles.postInfoContainer}>
          <Text> Uploaded: {date}</Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  postContainer: {
    justifyContent: "space-between",
    borderRadius: 10,
    marginHorizontal: 6,
    alignItems: "center",
    backgroundColor: colors.primary,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 16,
  },
  postInfoContainer: {
    flexDirection: "column",
    margin: 16,
  }
});