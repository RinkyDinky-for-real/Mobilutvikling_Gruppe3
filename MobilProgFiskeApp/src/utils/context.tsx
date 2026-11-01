import React, { createContext, useState } from "react";
type AuthContextType = {
    "userId": string,
    "setUserId": React.Dispatch<React.SetStateAction<string>>
}
export const AuthContext = createContext<AuthContextType | null>(null)
export default function AuthContextProvider({ children}) {
    const [userId, setUserId] = useState("")
    return (<AuthContext.Provider value={{ userId, setUserId }}>{children}</AuthContext.Provider>)
}