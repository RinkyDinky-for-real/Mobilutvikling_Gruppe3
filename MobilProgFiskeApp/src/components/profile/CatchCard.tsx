import { View, Text, Image, StyleSheet } from 'react-native';
import { colors, globalStyles } from '@/styles/global';


type CatchCardProps = {
    id: string;
    imageUrl: string;
    species: string;
    weight?: number;
    date: string;
};

export default function CatchCard({ 
    id, 
    imageUrl, 
    species, 
    weight, 
    date 
}: CatchCardProps) {
    return (
        <View style={styles.card}>
            <Image source={{ uri: imageUrl }} style={[styles.image, globalStyles.shadow]} />
            <View style={styles.infoContainer}>
                <Text style={styles.species}>{species}</Text>
                <View style={styles.textContainer}>
                    {weight && <Text style={styles.weight}>{weight} kg</Text>}
                    <Text style={styles.date}>{date}</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        width: 150,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: 150,
        resizeMode: 'cover',
        borderRadius: 20,
    },
    infoContainer: {
        paddingHorizontal: 15,
    },
    textContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    species: {
        fontSize: 16,
        fontWeight: 'bold',
        color: "#000",
    },
    weight: {
        fontSize: 14,
        color: "#000",
    },
    date: {
        fontSize: 12,
        color: "#000",
    },
});