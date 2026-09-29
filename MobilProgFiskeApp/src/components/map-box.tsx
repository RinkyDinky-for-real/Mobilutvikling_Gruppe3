import { Map } from "@maplibre/maplibre-react-native";
import { ThemedView } from "./themed-view";

export function MapBox() {
  return (
    <ThemedView type="background" style={{ flex: 1, borderRadius: 8 }}>
        <Map style={{ flex: 1, borderRadius: 8 }} mapStyle="https://api.maptiler.com/maps/streets/style.json?key=G9g0k1r6Z8y7f5J3x2L4" touchPitch={false}></Map>
    </ThemedView>
  );
}