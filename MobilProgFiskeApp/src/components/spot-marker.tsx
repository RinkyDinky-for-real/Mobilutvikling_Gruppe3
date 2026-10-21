import { Map, Marker } from "@maplibre/maplibre-react-native";
import { ThemedView } from "./themed-view";
import { Image, StyleSheet, View, type ImageSourcePropType } from 'react-native';
import { ThemedText } from "./themed-text";

const defaultPhoto = require('../../assets/images/photo1.jpg');

export function spotmarker(longlat: [number, number], photolink: ImageSourcePropType = defaultPhoto, pointName: string = "Fishing Spot") {
  return (
    <Marker lngLat={[longlat[0], longlat[1]]} anchor="bottom" style={{ alignSelf: 'flex-start', backgroundColor: 'white', borderRadius: 25, padding: 5 }}>
      <ThemedView lightColor="#ffffff" darkColor="#000000" style={{ alignItems: 'center', justifyContent: 'center', padding: 15, borderRadius: 25 }}>
        <Image source={photolink} style={{ width: 70, height: 70 }} />
        <ThemedText type="small" style={{ textAlign: 'center' }}>
          {pointName}
        </ThemedText>
      </ThemedView>
    </Marker>
  );
}