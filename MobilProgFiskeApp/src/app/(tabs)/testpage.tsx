import { useState } from "react";
import { Alert, Pressable, Text, TextInput, View } from "react-native";
import { UploadPost } from "@/hooks/use-Upload-Post";
import { UploadUser } from "@/hooks/use-Upload-User";
import { ThemedView } from "@/components/themed-view";

export default function TestUploadScreen() {
  const [uploading, setUploading] = useState(false);
  const [creatingUser, setCreatingUser] = useState(false);
  const [latitude, setLatitude] = useState("59.9139");
  const [longitude, setLongitude] = useState("10.7522");

  async function createTestUser() {
    setCreatingUser(true);

    try {
      const username = `test-user-${Date.now()}`;
      const createdUser = await UploadUser(
        username,
        "test-password-hash",
        "Spinning",
        "Test Lake",
        "Trout"
      );

      console.log("Created user response:", createdUser);
      Alert.alert("User created", `Created ${username}. See the console for the server response.`);
    } catch (error) {
      Alert.alert(
        "User creation failed",
        error instanceof Error ? error.message : "An unexpected error occurred"
      );
    } finally {
      setCreatingUser(false);
    }
  }

  async function testUpload() {
    const latitudeValue = Number(latitude);
    const longitudeValue = Number(longitude);

    if (
      !Number.isFinite(latitudeValue) ||
      latitudeValue < -90 ||
      latitudeValue > 90 ||
      !Number.isFinite(longitudeValue) ||
      longitudeValue < -180 ||
      longitudeValue > 180
    ) {
      Alert.alert("Invalid coordinates", "Enter a valid latitude and longitude.");
      return;
    }

    setUploading(true);

    try {
      const testUserId = '1133794227705107';

      await UploadUser(
        `test-user${Date.now()}`,
        "test-password-hash",
        "Spinning",
        "Test Lake",
        "Trout"
      );

      const response = await UploadPost(
        `test-${Date.now()}`, // temporary unique ID
        testUserId,
        "Test post",
        "Checking whether upload works",
        latitudeValue,
        longitudeValue,
        new Date().toISOString()
      );

      Alert.alert(
        "Test succeeded",
        `Created user ${testUserId} and uploaded a post. Server status: ${response.status}`
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
      <Text>Latitude</Text>
      <TextInput
        value={latitude}
        onChangeText={setLatitude}
        keyboardType="decimal-pad"
        placeholder="Latitude (-90 to 90)"
        accessibilityLabel="Latitude"
      />
      <Text>Longitude</Text>
      <TextInput
        value={longitude}
        onChangeText={setLongitude}
        keyboardType="decimal-pad"
        placeholder="Longitude (-180 to 180)"
        accessibilityLabel="Longitude"
      />
      <Pressable onPress={createTestUser} disabled={uploading || creatingUser}>
        <ThemedView style={{ alignItems: 'center', justifyContent: 'center', padding: 15, borderRadius: 25 }}>
            <Text>{creatingUser ? "Creating user..." : "Create test user"}</Text>
        </ThemedView>
      </Pressable>
      <Pressable onPress={testUpload} disabled={uploading || creatingUser}>
        <ThemedView style={{ alignItems: 'center', justifyContent: 'center', padding: 15, borderRadius: 25 }}>
            <Text>{uploading ? "Uploading..." : "Test upload"}</Text>
        </ThemedView>
      </Pressable>
    </View>
  );
}