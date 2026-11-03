import { sendRequest} from "@/databaseAPI";



export async function fetchSinglePost(PostId: string){
    const response = await sendRequest('getpost', 'GET', { postid: PostId });
    if (!response.ok) {
        throw new Error(`Failed to fetch post: ${response.status}`);
    }
    return response.json();
}

export async function fetchAllPostsFromUser(AccountId: string){
    const response = await sendRequest("post", "GET", { userId: AccountId });
    if (!response.ok) {
        throw new Error(`Failed to fetch posts: ${response.status}`);
    }
    return response.json();
}

export async function fetchRandomPosts(AccountId: string, limit: number){
    const response = await sendRequest("post/random", "GET", { userId: AccountId, limit: limit});
    if (!response.ok) {
        throw new Error(`Failed to fetch random posts: ${response.status}`);
    }
    return response.json();
}


    