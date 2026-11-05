import { sendRequest } from '../databaseAPI';

export async function fetchUser(userId: string){
    const response = await sendRequest('user', 'GET', { userId: userId });
    if (!response.ok) {
        throw new Error(`Failed to fetch user: ${response.status}`);
    }
    return response.json();
}
