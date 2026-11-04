import { Map, Marker, PressEvent } from "@maplibre/maplibre-react-native";
import { Image, Pressable, StyleSheet, View, Text, type ImageSourcePropType } from 'react-native';
import type { NativeSyntheticEvent } from 'react-native';
import { router } from "expo-router";

const defaultPhoto = require('../../../assets/images/photo1.jpg');

function handleMarkerPress(event: NativeSyntheticEvent<PressEvent>, markerId: string) {
  const [longitude, latitude] = event.nativeEvent.lngLat;
  console.log(`Marker: ${markerId} pressed at longitude: ${longitude}, latitude: ${latitude}`);
  router.push({
      pathname: '/posts/[id]',
      params: { id: markerId },
    });;
}

export function spotmarker(markerid: string, longlat: [number, number]= [0, 0], photolink: ImageSourcePropType = defaultPhoto, pointName: string = "Fishing Spot") {
  return (
    <Marker id={markerid} lngLat={[longlat[0], longlat[1]]} onPress={(event) => handleMarkerPress(event, markerid)} anchor="bottom" style={{ alignSelf: 'flex-start', backgroundColor: 'white', borderRadius: 25, padding: 5 }}>
      <View style={{ alignItems: 'center', justifyContent: 'center', padding: 15, borderRadius: 25, backgroundColor: "#f2f2f2" }}>
        <Image source={photolink} style={{ width: 30, height: 30 }} />
        <Text style={styles.smalltext}>
          {pointName}
        </Text>
      </View>
    </Marker>
  );
}

const styles = StyleSheet.create({
  smalltext: {
    fontSize: 14,
    textAlign: 'center',
  },
})