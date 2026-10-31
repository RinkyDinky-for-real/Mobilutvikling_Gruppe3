import { sendRequest} from "@/databaseAPI";



export async function fetchSinglePost(PostId: string){
    try{
        const Result = await sendRequest('post', 'GET', { userId: PostId });
        return Result;
    }catch(Error){
        console.log('fetch failed', Error)
    };
}

export async function fetchAllPostsFromUser(AccountId: string){
    const response = await sendRequest("post", "GET", { userId: AccountId });
    if (!response.ok) {
        throw new Error(`Failed to fetch posts: ${response.status}`);
    }
    return response.json();
}



    