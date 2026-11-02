import { sendRequest } from '@/databaseAPI';


export async function UploadUser( userId: string ,username?: string, PassWordHash?: string, FavoriteFishingMethod?: string, FavoritePlace?: string, FavoriteFish?: string){
    try{
        const response = await sendRequest('user', 'PATCH', { userId ,username, PassWordHash, FavoriteFishingMethod, FavoritePlace, FavoriteFish});
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