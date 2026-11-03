import { useContext } from "react";
import AuthContextProvider, { AuthContext } from "../utils/context";
import { Redirect } from "expo-router";

function Checker() {
    
    const { userId, setUserId } = useContext(AuthContext)
    // todo, check the secure store if the userId is located there, and if so, update the context
    let path = ""
    if (userId) {
        path = "./(tabs)"
    }
    else {
        path = "./login"
    }
    return (<Redirect href = "/login"></Redirect>)
}
export default function Main() {
    return(<AuthContextProvider><Checker</AuthContextProvider>)
}
