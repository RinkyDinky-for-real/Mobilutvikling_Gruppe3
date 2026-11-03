import { sendRequest } from '@/databaseAPI';


export async function EditUser( userId: string ,username?: string, PassWordHash?: string, FavoriteFishingMethod?: string, favoriteFishingPlace?: string, FavoriteFish?: string){
    try{
        const headers: Record<string, string> = { userId };
            if (username !== undefined) headers.username = username;
            if (PassWordHash !== undefined) headers.PassWordHash = PassWordHash;
            if (FavoriteFishingMethod !== undefined) headers.FavoriteFishingMethod = FavoriteFishingMethod;
            if (favoriteFishingPlace !== undefined) headers.favoriteFishingPlace = favoriteFishingPlace;
            if (FavoriteFish !== undefined) headers.FavoriteFish = FavoriteFish;
        console.log('headers', headers)
        const response = await sendRequest("user", "PATCH", headers);
        if (!response.ok) {
        const details = await response.text();
        throw new Error(`Udate failed: ${response.status} ${response.statusText}. ${details}`);
        }
    return response;
    } catch (error) {
    console.error('Update failed', error)
    throw error
    }
}