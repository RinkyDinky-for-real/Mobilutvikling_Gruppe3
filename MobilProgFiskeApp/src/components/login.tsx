import { TextInput } from "react-native";
import { View } from "react-native";
import { ThemedText } from "./themed-text";
import Button from "./Button";
import { useState } from "react";

export default function EmailPassword({ signUp, text, onSubmit, onForgottPassword, onSignup}) {
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [email, setEmail] = useState("");
    const [userName, setUserName] = useState("");
    function onPasswordChange(value) {
        setPassword(value);
    }
    function onEmailChange(value) {
        setEmail(value)
    }
    function onRepeatPasswordChange(value) {
        setRepeatPassword(value);
    }
    function onUserNameChange(value) {
        setUserName(value);
    }
    return (
        <View>
            <ThemedText>{text}</ThemedText>
            <ThemedText>email</ThemedText>
            <TextInput onChangeText={ onEmailChange}  keyboardType = "email-address" on></TextInput>
            {signUp && <ThemedText>user name</ThemedText>}
            { signUp && <TextInput  onChangeText =  {onUserNameChange}  ></TextInput>}
            <ThemedText>password</ThemedText>
            <TextInput secureTextEntry={true} onChangeText={ onPasswordChange}></TextInput>
            {signUp ? <View><ThemedText>repeat password</ThemedText><TextInput secureTextEntry={true} onChangeText={ onRepeatPasswordChange}  ></TextInput></View> : <Button text="Forgot password?"></Button>}
            <ThemedText>{signUp ? "Sign up" : "Sign in"}</ThemedText>
            <Button text={signUp ? "Sign up" : "sign in"} onPress={ onSignup}></Button>
        </View>
    )
}