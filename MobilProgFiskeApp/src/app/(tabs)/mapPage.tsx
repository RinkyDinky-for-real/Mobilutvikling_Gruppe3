import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Camera, Map } from '@maplibre/maplibre-react-native';
import { ImageSourcePropType, StyleSheet, View } from 'react-native';
import {createMarkersFromUserPost} from '@/hooks/use-Create-Marker';
import { spotmarker } from '@/components/mapComponents/spot-marker';
import React, { useEffect, useState } from 'react';
import { Marker, markerSchema } from '@/utils/markerSchema';
import { z } from 'zod';
import { useFocusEffect } from 'expo-router';






export default function HomeScreen() {
  let cancelled = false;
  async function loadMarkers() {
      try {
        const userId = "1133794227705107";
        const loadedMarkers = await createMarkersFromUserPost(userId);

        if (!cancelled) {
          setMarkers(loadedMarkers);
        }
      } catch (error) {
        console.error("Failed to load map markers:", error);
      }
    }  
  
  const [markers, setMarkers] = useState<Marker[]>([]);

  useFocusEffect(
  React.useCallback(() => {
    let cancelled = false;
    loadMarkers();
    return () => {
      cancelled = true;
    };
  }, [])
);

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