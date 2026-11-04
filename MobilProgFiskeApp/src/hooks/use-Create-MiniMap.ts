import { fetchAllPostsFromUser, fetchSinglePost } from './use-Fetch-Posts';

type MiniMap = {
  id: string;
  longlat: [number, number];
  userid: string;
};

export async function createMiniMapsFromPosts(userId: string) {
    const posts = await fetchAllPostsFromUser(userId);
    const createdPosts: MiniMap[] = [];

    for (const post of posts) {
        createdPosts.push({
            id: post.postId,
            longlat: [post.longtitude, post.latitude],
            userid: post.userId
        });
    }
    return(createdPosts);
}

export async function createSingularMiniMapFromUserPost( postId: string) {
    const post = await fetchSinglePost(postId);
    if (post) {
        const miniMap: MiniMap = {
            id: post.postId,
            longlat: [post.longitude, post.latitude],
            userid: post.userId
        };
        return miniMap;
    } else {
        return null;
    }
}