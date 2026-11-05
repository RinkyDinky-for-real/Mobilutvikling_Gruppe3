import { Stack } from 'expo-router';

import AuthContextProvider, { useAuth } from '@/utils/context';

export default function RootLayout() {
  return (
    <AuthContextProvider>
      <RootNavigator />
    </AuthContextProvider>
  );
}

function RootNavigator() {
  const { userId } = useAuth();

  return (
    <Stack screenOptions={{ headerShown: false }}>

      <Stack.Screen name="index" />

      <Stack.Protected guard={!!userId}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="posts/[id]" />
      </Stack.Protected>

      <Stack.Protected guard={!userId}>
        <Stack.Screen name="login" />
        <Stack.Screen name="register" />
      </Stack.Protected>

    </Stack>
  );
}
