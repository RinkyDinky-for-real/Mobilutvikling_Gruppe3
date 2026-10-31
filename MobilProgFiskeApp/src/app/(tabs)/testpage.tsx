import { useState } from "react";
import { Alert, Pressable, Text, View } from "react-native";
import { UploadPost } from "@/hooks/use-Upload-Post";
import { UploadUser } from "@/hooks/use-Upload-User";
import { ThemedView } from "@/components/themed-view";

export default function TestUploadScreen() {
  const [uploading, setUploading] = useState(false);
  const [creatingUser, setCreatingUser] = useState(false);

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
        59.9139, // latitude
        10.7522, // longitude
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