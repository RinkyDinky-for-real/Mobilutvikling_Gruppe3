import { createContext, useState } from "react";

export const AuthContext = createContext("")
export default function AuthContextProvider() {
    const [userId, setUserId] = useState("")
    return (<AuthContext.Provider value={{userId, setUserId}}></AuthContext.Provider>)
}