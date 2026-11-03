import { useState } from "react";
import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { UploadPost } from "@/hooks/use-Upload-Post";
import { ThemedView } from "@/components/themed-view";
import { Camera, Map } from '@maplibre/maplibre-react-native';
import { ThemedText } from "@/components/themed-text";
import { BottomTabInset, MaxContentWidth, Spacing } from "@/constants/theme";
import { withDelay } from "react-native-reanimated";

export default function CreatePostScreen() {
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(true)
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

    } catch (error) {
      Alert.alert(
        "Upload failed",
        error instanceof Error ? error.message : "An unexpected error occurred"
      );
    } finally {
      setUploading(false);
      setUploaded(true);
    }
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.card}> 
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
            setUploaded(false)
          }}>
            <Camera zoom={1}/>
          </Map>
          <Text>Longitude: {longitude}</Text>
            <Text>Latitude: {latitude} </Text>
        </ThemedView>
        <TextInput style={styles.input}
          value={title}
          onChangeText={setTitle}
          keyboardType="default"
          placeholder="Write a title"
          accessibilityLabel="Title"
        />
        <TextInput style={styles.input}
          value={content}
          onChangeText={setContent}
          keyboardType="default"
          placeholder="Write a short description"
          accessibilityLabel="Content"
        />
        <Pressable onPress={() => handleUploadPost(testUserId, title, content, latitude, longitude)} disabled={uploading}>
          <ThemedView style={{ alignItems: 'center', justifyContent: 'center', padding: 15, borderRadius: 25 }}>
              <Text>{uploaded ? "Uploaded!": uploading ? "Uploading..." : "Post"}</Text>
          </ThemedView>
        </Pressable>
      </ThemedView>
    </ThemedView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    height: 300,
  },
  safeArea: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.four,
    paddingBottom: BottomTabInset + Spacing.three,
    maxWidth: MaxContentWidth,
  },
  card: {
    width: '100%',
    maxWidth: 420,
    padding: Spacing.four,
    borderRadius: 24,
    backgroundColor: '#ffffff',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 14,
    elevation: 5,
  },
  title: {
    textAlign: 'center',
    marginBottom: Spacing.one,
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: Spacing.three,
    opacity: 0.7,
  },
  inputGroup: {
    gap: Spacing.one,
    marginBottom: Spacing.three,
    backgroundColor: '#ffffff',
  },
  inputLabel: {
    color: '#111827',
  },
  input: {
    borderWidth: 1,
    borderColor: '#b8c7dc',
    borderRadius: 12,
    paddingHorizontal: Spacing.two,
    paddingVertical: Spacing.two,
    backgroundColor: '#ffffff',
    color: '#111827',
    fontSize: 16,
  },
  passwordRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
    backgroundColor: '#ffffff',
  },
  passwordInput: {
    flex: 1,
  },
  toggleButton: {
    paddingHorizontal: Spacing.two,
    paddingVertical: Spacing.one,
  },
  primaryButton: {
    backgroundColor: '#1f6feb',
    borderRadius: 12,
    paddingVertical: Spacing.two,
    alignItems: 'center',
    marginTop: Spacing.one,
  },
  disabledButton: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  secondaryButton: {
    backgroundColor: '#2e1ec0',
    borderRadius: 12,
    paddingHorizontal: Spacing.four,
    alignItems: 'center',
    paddingVertical: Spacing.two,
    marginTop: Spacing.one,
  },
});