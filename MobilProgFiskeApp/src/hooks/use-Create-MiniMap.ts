import data from '../../assets/FakePosts.json';

type MiniMap = {
  id: string;
  longlat: [number, number];
  userid: string;
};

export function createMiniMapsFromPosts(userid: string) {
    const posts = data.posts.filter(post => post.UserId === userid);
    const createdPosts: MiniMap[] = [];

    for (const post of posts) {
        createdPosts.push({
            id: post.PostId,
            longlat: [post.Longitude, post.Latitude],
            userid: post.UserId
        });
    }
    return(createdPosts);
}

export function createSingularMiniMapFromUserPost(userid: string, postid: string) {
    const post = data.posts.find(post => post.UserId === userid && post.PostId === postid);
    if (post) {
        const miniMap: MiniMap = {
            id: post.PostId,
            longlat: [post.Longitude, post.Latitude],
            userid: post.UserId
        };
        return miniMap;
    } else {
        return null;
    }
}