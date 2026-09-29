import { Map } from "@maplibre/maplibre-react-native";
import { ThemedView } from "./themed-view";

export function MapBox() {
  return (
    <ThemedView type="background" style={{ flex: 1, borderRadius: 8 }}>
        <Map style={{ flex: 1, borderRadius: 8 }} mapStyle="https://demotiles.maplibre.org/style.json" touchPitch={false}></Map>
    </ThemedView>
  );
}