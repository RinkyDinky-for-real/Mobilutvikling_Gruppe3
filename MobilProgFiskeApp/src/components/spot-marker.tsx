import { Map, Marker, PressEvent } from "@maplibre/maplibre-react-native";
import { ThemedView } from "./themed-view";
import { Image, Pressable, StyleSheet, View, type ImageSourcePropType } from 'react-native';
import { ThemedText } from "./themed-text";
import type { NativeSyntheticEvent } from 'react-native';
import { router } from "expo-router";

const defaultPhoto = require('../../assets/images/photo1.jpg');

function handleMarkerPress(event: NativeSyntheticEvent<PressEvent>) {
  const [longitude, latitude] = event.nativeEvent.lngLat;
  console.log(`Marker pressed at longitude: ${longitude}, latitude: ${latitude}`);
  router.push('/explore');
}

export function spotmarker(longlat: [number, number], photolink: ImageSourcePropType = defaultPhoto, pointName: string = "Fishing Spot") {
  return (
    <Marker lngLat={[longlat[0], longlat[1]]} onPress={handleMarkerPress} anchor="bottom" style={{ alignSelf: 'flex-start', backgroundColor: 'white', borderRadius: 25, padding: 5 }}>
          <ThemedView lightColor="#ffffff" darkColor="#000000" style={{ alignItems: 'center', justifyContent: 'center', padding: 15, borderRadius: 25 }}>
            <Image source={photolink} style={{ width: 30, height: 30 }} />
              <ThemedText type="small" style={{ textAlign: 'center' }}>
                {pointName}
            </ThemedText>
          </ThemedView>
      </Marker>
  );
}