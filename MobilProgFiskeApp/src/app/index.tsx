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

  return (
    <Redirect
      href={userId ? '/(tabs)/feed' : '/login'}
    />
  );
}
