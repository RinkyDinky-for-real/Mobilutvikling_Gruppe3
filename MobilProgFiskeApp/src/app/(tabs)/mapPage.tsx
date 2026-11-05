import { Camera, Map } from '@maplibre/maplibre-react-native';
import { StyleSheet, View, Text } from 'react-native';
import {createMarkersFromUserPost} from '@/hooks/use-Create-Marker';
import { spotmarker } from '@/components/mapComponents/spot-marker';
import React, { useState } from 'react';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import { Marker } from '@/utils/markerSchema';
import { useFocusEffect } from 'expo-router';
import { useAuth } from '@/utils/context';
import { colors } from '@/styles/global';


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
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={['top']}>

        <View style={styles.text}>
          <Text style={styles.title}>
            Angler's Atlas
          </Text>
        </View>
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
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: "flex-start",
  },
  map: {
    flex: 1,
  },
  text: {
  borderBottomWidth: 4,
  //position: 'absolute',
  top: 0,
  zIndex: 10,
  left: 0,
  right: 0,
  elevation: 0,
  borderRadius: 0,
  backgroundColor: '#fff',
  alignItems: 'center',
  justifyContent: 'center',
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
  },
});

