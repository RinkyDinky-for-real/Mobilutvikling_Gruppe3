import { Pressable } from "react-native";
import { ThemedText } from "./themed-text";
import { View } from "react-native";

export default function Button({ text, onPress }) {
    return (
        <View>
            <Pressable  onPress={onPress} role = "button"></Pressable>
            <ThemedText>{text}</ThemedText>
        </View>
    )
}