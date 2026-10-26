import { AnimatedIcon } from '@/components/animated-icon';
import { HintRow } from '@/components/hint-row';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { WebBadge } from '@/components/web-badge';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { Camera, Map, Marker } from '@maplibre/maplibre-react-native';
import * as Device from 'expo-device';
import { Dimensions, ImageSourcePropType, Platform, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeTabs } from 'expo-router/unstable-native-tabs';
import { spotmarker } from '@/components/spot-marker';
import { useEffect } from 'react';
import { FlatList } from 'react-native';
import React from 'react';

type Spot = {
  id: string;
  longlat: [number, number];
  photolink: ImageSourcePropType;
  pointName: string;
  RedirectLink: "/explore" | '/';
};

const spots: Spot[] = [
  {
    id: '1',
    longlat: [10.7522, 59.9139],
    photolink: require('../../assets/images/photo1.jpg'),
    pointName: 'Fishing Spot 1',
    RedirectLink: '/explore',
  },
  {
    id: '2',
    longlat: [5.325919, 60.394306],
    photolink: require('../../assets/images/photo1.jpg'),
    pointName: 'Fishing Spot 2',
    RedirectLink: '/explore',
  },
  {
    id: '3',
    longlat: [7.325919, 61.394306],
    photolink: require('../../assets/images/photo1.jpg'),
    pointName: 'Fishing Spot 3',
    RedirectLink: '/explore',
  },
];

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Map
        style={styles.map}
        mapStyle="https://tiles.openfreemap.org/styles/liberty"
        >
          <Camera zoom={1} minZoom={1} maxZoom={20}/>
          {spots.map((spot) => (
          <React.Fragment key={spot.id}>
            {spotmarker(spot.id, spot.longlat, spot.photolink, spot.pointName, spot.RedirectLink)}
          </React.Fragment>
          ))}
      </Map>

      <ThemedView type="text" style={styles.text}>
        <ThemedText type="title" style={{ textAlign: 'center' }}>
          Fishing App
        </ThemedText>
      </ThemedView>

    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  text: {
  position: 'absolute',
  top: 0,
  zIndex: 10,
  left: 0,
  right: 0,
  elevation: 0,
  padding: 15,
  borderRadius: 0,
  backgroundColor: '#f2f2f2',
  alignItems: 'center',
  justifyContent: 'center',
  },
});