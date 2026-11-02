import { sendRequest } from '@/databaseAPI';


export async function UploadUser( username: string, PassWordHash: string, FavoriteFishingMethod: string, FavoritePlace: string, FavoriteFish: string){
    try{
        const response = await sendRequest('user', 'POST', { username, PassWordHash, FavoriteFishingMethod, FavoritePlace, FavoriteFish});
        if (!response.ok) {
        const details = await response.text();
        throw new Error(`Upload failed: ${response.status} ${response.statusText}. ${details}`);
        }
    return response;
    } catch (error) {
    console.error('Upload failed', error)
    throw error
    }
}