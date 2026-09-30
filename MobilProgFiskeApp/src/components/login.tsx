import { TextInput } from "react-native";
import { View } from "react-native";
import { ThemedText } from "./themed-text";
import Button from "./Button";

export default function EmailPassword({ signUp, text, onSubmit, onForgottPassword, onSignup}) {

    return (
        <View>
            <ThemedText>{text}</ThemedText>
            <ThemedText>email</ThemedText>
            <TextInput keyboardType = "email-address"></TextInput>
            {signUp && <ThemedText>user name</ThemedText>}
            { signUp && <TextInput></TextInput>}
            <ThemedText>password</ThemedText>
            <TextInput secureTextEntry={true}></TextInput>
            {signUp ? <View><ThemedText>repeat password</ThemedText><TextInput secureTextEntry={true}></TextInput></View> : <Button text="Forgot password?"></Button>}
            <ThemedText>{signUp ? "Sign up" : "Sign in"}</ThemedText>
        </View>
    )
}