import { ActivityIndicator, StyleSheet, Text} from "react-native";
import { colors, globalStyles } from '@/styles/global';
import { View } from "lucide-react-native";
import { postSchema, type Post } from "@/utils/postSchema";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { fetchSinglePost } from "@/hooks/use-Fetch-Posts";
import { globalStyles as styles} from '@/styles/global';
import { Camera, Map } from '@maplibre/maplibre-react-native';
import { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";


export default function SinglePost() {
const { id } = useLocalSearchParams<{ id: string }>();
const [loading, setLoading] = useState(true);
const [postData, setPostData] = useState<Post | null>(null);
const [loadFailed, setLoadFailed] = useState(false);

async function fetchPostData() {
    try{
        setLoading(true);

        const fetchedPost = await fetchSinglePost(id);
        const result = postSchema.safeParse(fetchedPost);

        if (!result.success){
            throw new Error("Invalid API response format");
        }
        return result.data;
        } catch (err){
            console.error("Failed to load post:", err);
            setLoadFailed(true);
            return null;
        }finally {
            setLoading(false);
        }
    }

    useEffect(() => {
    async function loadPost() {
        const post = await fetchPostData();
        setPostData(post);
    }

    loadPost();
    }, [id]);
    
    if (loading) return <ActivityIndicator/>
    if (loadFailed) return <Text>Failed to load post data. Please try again later.</Text>;
    if (!postData) return <Text>Failed to load post data. Please try again later.</Text>;

    return (
        <SafeAreaProvider>
            <View style={styles.container}>
                <Text style={styles.title}>Post details:</Text>
                <Map logo={false} attribution={false} dragPan={false} touchZoom={false} doubleTapZoom={false} touchRotate={false} touchPitch={false} mapStyle={"https://tiles.openfreemap.org/styles/liberty"}>
                    <Camera center={[postData.longitude, postData?.latitude]} zoom={5}/>
                </Map>
                <View>
                    <Text>Title:{postData.title}</Text>
                    <Text>Date:{postData.date}</Text>
                    <Text>User:{postData.userName}</Text>
                    <Text>Content:{postData.content}</Text>

                </View>

            </View>
        </SafeAreaProvider>
)}