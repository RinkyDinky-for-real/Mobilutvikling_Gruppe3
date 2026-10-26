import { View, Text, StyleSheet } from 'react-native';
import { Fish, MapPin, UserGroup } from 'lucide-react-native';
import { colors } from '@/styles/global';


type ProfileStatsProps = {
  followersCount: number;
  catches: number;
  spots: number;
};

export default function ProfileStats({
  followersCount,
  catches,
  spots
}: ProfileStatsProps) {
  return (
    <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <UserGroup color={colors.iconBlue} size={20} />
          <Text style={styles.statText}>{followersCount}</Text>
          <Text style={styles.statLabel}>Followers</Text>
        </View>

        <View style={styles.statItem}>
          <MapPin color={colors.iconTeal} size={20} />
          <Text style={styles.statText}>{spots}</Text>
          <Text style={styles.statLabel}>Spots</Text>
        </View>

        <View style={styles.statItem}>
          <Fish color={colors.iconBlue} size={20} />
          <Text style={styles.statText}>{catches}</Text>
          <Text style={styles.statLabel}>Catches</Text>
        </View>
      </View>

  );
}

const styles = StyleSheet.create({
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: colors.primary,
    borderRadius: 10,
    padding: 10,
    borderWidth: 2,
    marginHorizontal: 10,
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statText: {
    fontSize: 18,
    fontWeight: "600",
  },
  statLabel: {
    fontSize: 14,
    color: colors.textSecondary,
  },
});
