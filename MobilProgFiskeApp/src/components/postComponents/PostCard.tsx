import { Pressable, Text, View, StyleSheet } from 'react-native';
import type { Post } from "@/utils/postSchema"
import { globalStyles } from '@/styles/global';

type PostCardProps = {
  post: Post;
  onOpen?: () => void;
};

export default function PostCard({
  post,
  onOpen
}: PostCardProps) {
    const {postid, userid, title, content, longitude, latitude, date } = post;

  return (
    <View>
      <Pressable onPress={onOpen} disabled={!onOpen}>
        <Text>{postid}</Text>
        <Text>{userid}</Text>
        <Text>{title}</Text>
        <Text>{content}</Text>
        <Text>{longitude}</Text>
        <Text>{latitude}</Text>
        <Text>{date}</Text>

        {/* placeholder box where PostImage goes */}
        <View style={[styles.postImage, globalStyles.shadow ]}/>
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