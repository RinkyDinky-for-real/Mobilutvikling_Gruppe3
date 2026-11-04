import { ImageSourcePropType } from 'react-native';
import data from '../../assets/FakePosts.json';
import { NumberProp } from 'react-native-svg';
import { Marker, markerSchema } from '@/utils/markerSchema';
import { z } from 'zod';
import { fetchAllPostsFromUser } from './use-Fetch-Posts';


export async function createMarkersFromUserPost(userid: string) {
    const posts = await fetchAllPostsFromUser(userid)
    const createdPosts: Marker[] = [];

    for (const post of posts) {
        console.log("Post fields:", Object.keys(post), post);
        if (post.longtitude === null || post.longtitude === undefined ||
            post.latitude === null || post.latitude === undefined) {
            console.error("Skipping map marker:", {
                postId: post.PostId,
                longitude: post.longtitude,
                latitude: post.latitude,
            });
            continue;
        }

        const newPost: Marker = {
            id: post.PostId,
            longlat: [post.longtitude, post.latitude],
            photolink: require('../../assets/images/photo1.jpg'),
            pointName: post.Title,
        };
        createdPosts.push(newPost);
    }
    return(createdPosts);
}