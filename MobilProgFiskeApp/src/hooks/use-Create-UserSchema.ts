import { TypeOf, z } from 'zod';
import { userSchema } from '@/utils/userSchema';
import { User } from 'lucide-react-native';


export function createUserFromData(Data: any) {
    const userData = {
        userId: Data.UserId,
        username: Data.Username,
        password: Data.PasswordHash,
        profilePicture: '',
        backGroundImage: '',
        followerCount: 0,
        Catches: [],
        posts: [],
        favoriteFish: '',
        favoriteSpot: '',
        fishingStyle: '',
};
    const result = userSchema.safeParse(userData);
    return result.data
}