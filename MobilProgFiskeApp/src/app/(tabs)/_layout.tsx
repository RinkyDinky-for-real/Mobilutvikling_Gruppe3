import { colors } from '@/styles/global';
import { FishingRod, CirclePlus , CircleUserRound } from 'lucide-react-native';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.darkBackground,
          borderTopColor: colors.surface,
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
      }}
    >
      <Tabs.Screen
        name='mapPage'
        options={{
          title: 'Fishing Spots',
          tabBarIcon: ({ color, size }) => (
            <FishingRod size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name='feed'
        options={{
          title: 'Feed',
          tabBarIcon: ({ color, size }) => (
            <CirclePlus size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name='profile'
        options={{
          title: 'User Profile',
          tabBarIcon: ({ color, size }) => (
            <CircleUserRound size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name='testpage'
        options={{
          title: 'Tests',
          tabBarIcon: ({ color, size }) => (
            <CircleUserRound size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
