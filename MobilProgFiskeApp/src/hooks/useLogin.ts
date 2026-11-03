import { sendRequest } from "../databaseAPI";

export async function login(userName: String, password: String) {
    try {
        res = await sendRequest("user/getuserid", "GET", { "userName": userName, "passwordHash", password })
    }
    catch {
        throw console.error("Unable to get user id")
    }
}