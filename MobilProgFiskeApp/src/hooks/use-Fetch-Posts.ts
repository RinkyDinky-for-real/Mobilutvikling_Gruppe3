import { sendRequest} from "@/databaseAPI";



export async function fetchSinglePost(postId: string){
    const response = await sendRequest('getpost', 'GET', { postid: postId });
    if (!response.ok) {
        throw new Error(`Failed to fetch post: ${response.status}`);
    }
    return response.json();
}

export async function fetchAllPostsFromUser(userId: string){
    const response = await sendRequest("post", "GET", { userId: userId });
    if (!response.ok) {
        throw new Error(`Failed to fetch posts: ${response.status}`);
    }
    return response.json();
}

export async function fetchRandomPosts(limit: number){
    const response = await sendRequest("post/random", "GET", { limit: limit});
    if (!response.ok) {
        throw new Error(`Failed to fetch random posts: ${response.status}`);
    }
    return response.json();
}

export async function fetchPostsCountFromUser(userId: string){
    const response = await fetchAllPostsFromUser(userId);
    return response.length;;
}

    