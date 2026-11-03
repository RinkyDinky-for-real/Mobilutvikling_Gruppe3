import { sendRequest } from '../databaseAPI';

export async function fetchUser(AccountId: string){
    const response = await sendRequest('user', 'GET', { userId: AccountId });
    if (!response.ok) {
        throw new Error(`Failed to fetch user: ${response.status}`);
    }
    return response.json();
}
