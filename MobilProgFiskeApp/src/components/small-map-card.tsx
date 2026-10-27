import { Camera, Map } from "@maplibre/maplibre-react-native";
import { NativeTabs } from "expo-router/build/native-tabs";
import { SafeAreaView } from "react-native";
import { View } from "react-native";
import React from 'react';

type SmallMapCardProps = {
  longlat?: [number, number];
  zoom?: number;
};

export function SmallMapCard({ longlat = [0, 0],zoom = 1,}: SmallMapCardProps){
  
    return (
    <View style={styles.container}>  
        <Map logo={false} 
        attribution={false} 
        style={styles.map}
        dragPan={false}
        touchZoom={false}
        doubleTapZoom={false}
        touchRotate={false}
        touchPitch={false}
        mapStyle={"https://tiles.openfreemap.org/styles/liberty"}>
            <Camera
                center={[longlat[0], longlat[1]]}
                zoom={zoom}
                maxZoom={zoom}
                minZoom={zoom}
            />
        </Map>
    </View>
 );
}

const styles = {
    container: {
        //edit disse for å forandre størrelsen på kartet
        width: 350,
        height: 200,
    },
    map: {
      flex: 1,
      
    }
}