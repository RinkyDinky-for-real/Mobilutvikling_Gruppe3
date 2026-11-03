import { useContext } from "react";
import AuthContextProvider, { AuthContext } from "../utils/context";
import { Redirect } from "expo-router";

function Checker() {
    
    const { userId, setUserId } = useContext(AuthContext)
    
    let path = ""
    if (userId) {
        path = "./(tabs)"
    }
    else {
        path = "./login"
    }
    return (<Redirect href = {path}></Redirect>)
}
export default function Main() {
    return(<AuthContextProvider><Checker></Checker></AuthContextProvider>)
}
