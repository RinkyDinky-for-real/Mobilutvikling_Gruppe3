import { ImageSourcePropType } from 'react-native';
import data from '../../assets/FakePosts.json';
import { NumberProp } from 'react-native-svg';
import { Marker, markerSchema } from '@/utils/markerSchema';
import { z } from 'zod';


export function createMarkersFromUserPost(userid: string) {
    const posts = data.posts.filter(post => post.UserId === userid);
    const createdPosts: Marker[] = [];

    for (const post of posts) {
        const newPost: Marker = {
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