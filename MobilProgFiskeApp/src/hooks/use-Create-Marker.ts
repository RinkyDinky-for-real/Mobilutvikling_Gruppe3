import { ImageSourcePropType } from 'react-native';
import data from '../../assets/FakePosts.json';
import { NumberProp } from 'react-native-svg';
import { Marker, markerSchema } from '@/utils/markerSchema';
import { z } from 'zod';
import { fetchAllPostsFromUser } from './use-Fetch-Posts';


export async function createMarkersFromUserPost(userId: string) {
    const posts = await fetchAllPostsFromUser(userId)
    const createdPosts: Marker[] = [];

    for (const post of posts) {
        console.log("Post fields:", Object.keys(post), post);
        if (post.longitude === null || post.longitude === undefined ||
            post.latitude === null || post.latitude === undefined) {
            console.error("Skipping map marker:", {
                postId: post.postId,
                longitude: post.longitude,
                latitude: post.latitude,
            });
            continue;
        }

        const newPost: Marker = {
            id: post.postId,
            longlat: [post.longitude, post.latitude],
            photolink: require('../../assets/images/photo1.jpg'),
            pointName: post.title,
        };
        createdPosts.push(newPost);
    }
    return(createdPosts);
}