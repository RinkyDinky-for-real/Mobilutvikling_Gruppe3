import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View, useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, MaxContentWidth, Spacing } from '@/constants/theme';
import { colors, globalStyles } from '@/styles/global';

type PostHeaderProps = {
    id: number;
    name: string;
    time: string;
}

export default function({
    id,
    name, 
    time,
}: PostHeaderProps) {
    return (
        <View>
            <View>
                <Text>
                    {name}
                </Text>
                <Text>
                    {time}
                </Text>
            </View>
        </View>
    );
}