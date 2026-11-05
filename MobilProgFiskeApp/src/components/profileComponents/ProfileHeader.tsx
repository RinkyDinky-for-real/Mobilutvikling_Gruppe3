import { View, Text, Image,ImageBackground, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '@/styles/global';

type ProfileHeaderProps = {
  username: string;
  profilePicture: string;
  backgroundImage?: string;
  spots: number;
};

export default function ProfileHeader({
  username,
  profilePicture,
  backgroundImage,
}: ProfileHeaderProps) {
  return (
    <View style={styles.container}>
        <ImageBackground
            style={styles.backgroundImage}
            source={{ uri: backgroundImage }}
        >
            <LinearGradient
                colors={[colors.background, 'transparent', 'transparent', colors.background]}
                locations={[0, 0.3, 0.5, 1]}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
                style={styles.gradient}
            />
        </ImageBackground>
        <Image
        style={styles.profilePicture}
        source={{ uri: profilePicture }}
      />
      <Text style={styles.username}>{username}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 20,
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  username: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  backgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  gradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
