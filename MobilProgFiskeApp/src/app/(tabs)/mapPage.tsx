import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Camera, Map } from '@maplibre/maplibre-react-native';
import { ImageSourcePropType, StyleSheet, View } from 'react-native';
import {createMarkersFromUserPost} from '@/hooks/use-Create-Marker';
import { spotmarker } from '@/components/mapComponents/spot-marker';
import React from 'react';
import { Marker, markerSchema } from '@/utils/markerSchema';
import { z } from 'zod';



const markers: Marker[] = [];

export default function HomeScreen() {
  
  const userId = "user1";
  markers.push(...createMarkersFromUserPost(userId));
  
  return (
    <View style={styles.container}>
      <Map
        style={styles.map}
        mapStyle="https://tiles.openfreemap.org/styles/liberty"
        >
          <Camera zoom={1} minZoom={1} maxZoom={20}/>
          {markers.map((marker) => (
          <React.Fragment key={marker.id}>
            {spotmarker(marker.id, marker.longlat, marker.photolink, marker.pointName, marker.RedirectLink)}
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