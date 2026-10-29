import data from '../../assets/FakePosts.json';

type MiniMapSpot = {
  id: string;
  longlat: [number, number];
  userid: string;
};

export function createMiniMapsFromPosts(userid: string) {
    const posts = data.posts.filter(post => post.UserId === userid);
    const createdPosts: MiniMapSpot[] = [];

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
        const miniMapSpot: MiniMapSpot = {
            id: post.PostId,
            longlat: [post.Longitude, post.Latitude],
            userid: post.UserId
        };
        return miniMapSpot;
    } else {
        return null;
    }
}