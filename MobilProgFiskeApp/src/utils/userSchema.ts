import { z } from 'zod';

export const userSchema = z.object({
    userid: z.string(),
    username: z.string(),
    password: z.string(),
    profilePicture: z.number(),
    backGroundImage: z.number(),
    followerCount: z.number(),
    Catches: z.array(z.string()),
    posts: z.array(z.string()),
    favoriteFish: z.string(),
    favoriteSpot: z.string(),
    fishingStyle: z.string(),
});

export type User = z.infer<typeof userSchema>;