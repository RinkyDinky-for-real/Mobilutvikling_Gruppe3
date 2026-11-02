import { Stack } from 'expo-router';
import * as ScreenOrientation from 'expo-screen-orientation';
import * as SplashScreen from 'expo-splash-screen';
import { useContext, useEffect } from 'react';
import { Platform, useColorScheme } from 'react-native';
import { AuthContext } from '../utils/context';


SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { userId, setUserId} = useContext(AuthContext)
  const colorScheme = useColorScheme();

  useEffect(() => {
    if (Platform.OS !== 'web') {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.ALL).catch((error) => {
        console.error('Failed to enable all screen orientations:', error);
      });
    }
  }, []);

  return (
    <Stack screenOptions={{ headerShown: false }}>
          <Stack.Protected guard={userId}>
              <Stack.Screen name="(tabs)"></Stack.Screen>
          </Stack.Protected>
          <Stack.Protected guard={!userId}>
              <Stack.Screen name="login"></Stack.Screen>
              <Stack.Screen name = "register"></Stack.Screen>
          </Stack.Protected>
    </Stack>
  );
}