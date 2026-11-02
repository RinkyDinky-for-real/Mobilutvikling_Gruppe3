import { useState } from "react";
import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { UploadPost } from "@/hooks/use-Upload-Post";
import { ThemedView } from "@/components/themed-view";
import { Camera, Map } from '@maplibre/maplibre-react-native';
import { ThemedText } from "@/components/themed-text";

export default function CreatePostScreen() {
  const [uploading, setUploading] = useState(false);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [title, setTitle]= useState("")
  const [content, setContent]= useState("")
  const testUserId = '1133794227705107';
  
  async function handleUploadPost(testUserId: string, title: string, content: string, latitude: number, longitude: number) {
    const date = new Date().toISOString()
    setUploading(true);

    try {

      const response = await UploadPost(
        testUserId,
        title,
        content,
        latitude,
        longitude,
        date
      );

      Alert.alert(
        `Uploaded a post. Server status: ${response.status}`
      );
    } catch (error) {
      Alert.alert(
        "Upload failed",
        error instanceof Error ? error.message : "An unexpected error occurred"
      );
    } finally {
      setUploading(false);
    }
  }

  return (
    <View>
      <ThemedText type="title" style={{ textAlign: 'center' }}>
        Post
      </ThemedText>
      <ThemedView>
        <Text>Choose point on map</Text>
        <Map style={styles.map}  mapStyle="https://tiles.openfreemap.org/styles/liberty" 
        onPress={(event) => { 
          const [longitude, latitude] = event.nativeEvent.lngLat;
          setLongitude(longitude); 
          setLatitude(latitude);
        }}>
        </Map>
        <Text>Longitude: {longitude} Latitude: {latitude} </Text>
      </ThemedView>
      <TextInput
        value={title}
        onChangeText={setTitle}
        keyboardType="default"
        placeholder="Write a title"
        accessibilityLabel="Title"
      />
      <TextInput
        value={content}
        onChangeText={setContent}
        keyboardType="default"
        placeholder="Write a short description"
        accessibilityLabel="Content"
      />
      <Pressable onPress={() => handleUploadPost(testUserId, title, content, latitude, longitude)} disabled={uploading}>
        <ThemedView style={{ alignItems: 'center', justifyContent: 'center', padding: 15, borderRadius: 25 }}>
            <Text>{uploading ? "Uploading..." : "Post"}</Text>
        </ThemedView>
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    height: 300,
  }
  });