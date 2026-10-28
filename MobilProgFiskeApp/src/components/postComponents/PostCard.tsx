import { Pressable, Text, View, Image } from 'react-native';
import type { Post } from "@/utils/post-schema"

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
          style={{
            height: 200,
            backgroundColor: '#EEEEEE',
            borderRadius: 12,
          }}
        />
      </Pressable>

      <Pressable onPress={onToggleLike}>
        <Text>{liked ? '♥' : '♡'}</Text>
        <Text>{likesCount}</Text>
      </Pressable>
    </View>
  );
}