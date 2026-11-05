import { Redirect } from 'expo-router';
import { View } from 'react-native';
import { useAuth } from '@/utils/context';

export default function Index() {
  const { userId, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
      </View>
    );
  }

  if (!userId) {
    return <Redirect href="/login" />;
  } else {
    return <Redirect href="/(tabs)/feed" />;
  }
}
