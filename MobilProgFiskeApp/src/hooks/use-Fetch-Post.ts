import { sendRequest} from "@/databaseAPI";


export function fetchSinglePost(PostId: string){

    try{
        const Result = sendRequest('Posts', 'GET', PostId);
        return Result;
    }catch(Error){
        console.log('fetch failed', Error)
    };
}