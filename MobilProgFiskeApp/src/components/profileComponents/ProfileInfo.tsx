import { View, Text, StyleSheet, Pressable } from "react-native";
import { Fish, MapPin, FishingHook, SquarePen } from 'lucide-react-native';
import { LogOut } from 'lucide-react-native';
import { colors, globalStyles } from '@/styles/global';

type ProfileInfoProps = {
  favoriteFish: string;
  favoriteSpot: string;
  fishingStyle: string;
  onEdit: () => void;
  signOut: () => void;
};

export default function ProfileInfo({
  favoriteFish,
  favoriteSpot,
  fishingStyle,
  onEdit,
  signOut,
}: ProfileInfoProps) {
  return (
    <View style={[styles.infoContainer, globalStyles.shadow]}>
        <View style={{ flex: 1 }}>
        <View style={styles.infoItem}>
          <Fish color={colors.iconBlue} size={30} />
          <View style={styles.infoItemTextContainer}>
            <Text style={styles.infoLabel}>Favorite Fish</Text>
            <Text style={styles.infoText}>{favoriteFish}</Text>
          </View>
        </View>
        <View style={styles.infoItem}>

          <MapPin color={colors.iconTeal} size={30} />
          <View style={styles.infoItemTextContainer}>
            <Text style={styles.infoLabel}>Favorite Spot</Text>
            <Text style={styles.infoText}>{favoriteSpot}</Text>
          </View>
        </View>
        <View style={styles.infoItem}>

          <FishingHook color={colors.iconBlue} size={30} />
          <View style={styles.infoItemTextContainer}>
            <Text style={styles.infoLabel}>Fishing Style</Text>
            <Text style={styles.infoText}>{fishingStyle}</Text>
          </View>
        </View>
      </View>
      <View style={styles.editSignoutContainer}>
        <Pressable onPress={onEdit} accessibilityRole="button">
          <SquarePen color={colors.iconTeal} size={24} />
        </Pressable>

        <Pressable onPress={signOut} accessibilityRole="button">
          <LogOut color={colors.highlight} size={24} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: colors.primary,
    borderRadius: 10,
    padding: 10,
    margin: 10,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  infoText: {
    fontSize: 14,
    fontWeight: "600",
  },
  infoLabel: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  infoItemTextContainer: {
    marginHorizontal: 10,
  },
  editSignoutContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
  }
});
