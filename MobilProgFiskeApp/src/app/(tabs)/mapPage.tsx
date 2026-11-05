import { Camera, Map } from '@maplibre/maplibre-react-native';
import { ImageSourcePropType, StyleSheet, View, Text } from 'react-native';
import {createMarkersFromUserPost} from '@/hooks/use-Create-Marker';
import { spotmarker } from '@/components/mapComponents/spot-marker';
import React, { useEffect, useState } from 'react';
import { Marker, markerSchema } from '@/utils/markerSchema';
import { z } from 'zod';
import { useFocusEffect } from 'expo-router';
import { useAuth } from '@/utils/context';






export default function HomeScreen() {
  let cancelled = false;
  const { userId } = useAuth();
  async function loadMarkers() {
      try {
        if (!userId) {
        throw new Error("User not found");
        }
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
            {spotmarker(marker.id, marker.longlat, marker.photolink, marker.pointName)}
          </React.Fragment>
          ))}
      </Map>

      <View style={styles.text}>
        <Text style={styles.title}>
          Angler's Atlas
        </Text>
      </View>
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
  borderBottomWidth: 4,
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
  title: {
    fontSize: 48,
    fontWeight: 'bold',
  },
});

