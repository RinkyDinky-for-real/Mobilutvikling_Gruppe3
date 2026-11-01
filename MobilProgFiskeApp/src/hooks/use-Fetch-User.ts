import { sendRequest } from '../databaseAPI';

export async function fetchUser(AccountId: string){
    try{
        const Result = await sendRequest('user', 'GET', { userId: AccountId });
        return Result;
    }catch(Error){
        console.log('fetch failed', Error)
    };
}
