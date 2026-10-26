import { View, Text, StyleSheet } from 'react-native';
import { Fish, MapPin, FishingHook, SquarePen } from 'lucide-react-native';
import { colors } from '@/styles/global';

type ProfileInfoProps = {
  favoriteFish: string;
  favoriteSpot: string;
  fishingStyle: string;
};

export default function ProfileInfo({
  favoriteFish,
  favoriteSpot,
  fishingStyle,
}: ProfileInfoProps) {
  return (
    <View style={styles.infoContainer}>
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
  );
}

const styles = StyleSheet.create({
  infoContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: colors.primary,
    borderRadius: 10,
    padding: 10,
    borderWidth: 2,
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
});
