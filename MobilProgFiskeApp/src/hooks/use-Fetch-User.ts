import { sendRequest } from '../databaseAPI';

export async function fetchSingleUser(AccountId: string){
    try{
        const Result = await sendRequest('user', 'GET', { userId: AccountId });
        return Result;
    }catch(Error){
        console.log('fetch failed', Error)
    };
}
