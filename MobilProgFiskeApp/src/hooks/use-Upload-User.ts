import { sendRequest } from '@/databaseAPI';


export async function UploadUser( username: string, passwordHash: string){
    try{
        const headers: Record<string, string> = { username, passwordHash };
        const response = await sendRequest('user', 'POST', headers );
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