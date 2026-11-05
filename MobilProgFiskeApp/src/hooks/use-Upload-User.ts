import { sendRequest } from '@/databaseAPI';


export async function UploadUser( username: string, passwordHash: string, favoriteFishingMethod: string, favoritePlace: string, favoriteFish: string){
    try{
        const response = await sendRequest('user', 'POST', { username, passwordHash, favoriteFishingMethod, favoritePlace, favoriteFish});
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