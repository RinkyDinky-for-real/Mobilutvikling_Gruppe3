import { ImageSourcePropType } from 'react-native';
import data from '../../assets/FakePosts.json';
import { NumberProp } from 'react-native-svg';

type Spot = {
  id: string;
  longlat: [number, number];
  photolink: ImageSourcePropType;
  pointName: string;
  RedirectLink: "/feed" | '/';
};


export function createMarkersFromUserPost(userid: string) {
    const posts = data.posts.filter(post => post.UserId === userid);
    const createdPosts: Spot[] = [];

    for (const post of posts) {
        const newPost: Spot = {
            id: post.PostId,
            longlat: [post.Longitude, post.Latitude],
            photolink: require('../../assets/images/photo1.jpg'),
            pointName: post.Title,
            RedirectLink: "/feed"
        };
        createdPosts.push(newPost);
    }
    return(createdPosts);
}