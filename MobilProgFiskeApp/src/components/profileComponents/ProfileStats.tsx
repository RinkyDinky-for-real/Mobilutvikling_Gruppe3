import { View, Text, StyleSheet } from 'react-native';
import { Fish, MapPin, UserGroup } from 'lucide-react-native';
import { colors, globalStyles } from '@/styles/global';


type ProfileStatsProps = {
  spots: number;
};

export default function ProfileStats({
  spots
}: ProfileStatsProps) {
  return (
    <View style={[styles.statsContainer, globalStyles.shadow]}>
        <View style={styles.statItem}>
          <MapPin color={colors.iconTeal} size={20} />
          <Text style={styles.statText}>{spots}</Text>
          <Text style={styles.statLabel}>Spots</Text>
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
