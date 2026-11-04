import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View, useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, MaxContentWidth, Spacing } from '@/constants/theme';
import { colors, globalStyles } from '@/styles/global';

import type { Post } from '@/utils/postSchema'

type PostHeaderProps = {
    post: Post;
};

// make it so it recieves a post ID instead og a whole post. Then access Database to load the post.

export default function PostHeader({post}: PostHeaderProps) {
    const {id, name, time, likesCount} = post;

    return (
        <View>
            <Text>
                {name}
            </Text>
        </View>
    )
}