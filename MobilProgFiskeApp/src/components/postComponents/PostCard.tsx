import { Pressable, Text, View, StyleSheet } from 'react-native';
import type { Post } from "@/utils/post-schema"
import { globalStyles } from '@/styles/global';
import { Heart } from 'lucide-react-native';

type PostCardProps = {
  post: Post;
  liked: boolean;
  onToggleLike: () => void;
  onOpen?: () => void;
};

export default function PostCard({
  post,
  liked,
  onToggleLike,
  onOpen,
}: PostCardProps) {
    const {id, name, time, likesCount } = post;

  return (
    <View>
      <Pressable onPress={onOpen} disabled={!onOpen}>
        <Text>{name}</Text>
        <Text>{time}</Text>

        {/* placeholder box where PostImage goes */}
        <View 
          style={[styles.postImage, globalStyles.shadow ]}
        />
      </Pressable>

        {/* replace the heart unicode with heart icon from lucide*/}
      <Pressable onPress={onToggleLike}>
        <View style={styles.postInfo}>
          {liked ? <Heart fill={"red"}/> : <Heart fill={"#fff"}/> }
          <Text>{likesCount}</Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  postImage: {
    height: 200,
    backgroundColor: '#EEEEEE',
    borderRadius: 12,
  },
  postInfo: {
    flexDirection: "row",
    margin: 12,
    alignItems: "flex-end"
  }
});