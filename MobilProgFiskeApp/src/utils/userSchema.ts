import { z } from 'zod';

const idFormatPattern = /^[0-9]+$/;
const usernameCharactersPattern = /^[A-Za-z0-9æøåÆØÅ_-]+$/;
const requiresNonWhitespacePattern = /[\s\S]*\S[\s\S]*/;
const allowsEmptyOrNonWhitespacePattern = /^(?:$|[\s\S]*\S[\s\S]*)$/;

export const userSchema = z.object({
    userId: z.string().regex(idFormatPattern),
    username: z.string().regex(usernameCharactersPattern),
    password: z.string().regex(requiresNonWhitespacePattern),
    profilePicture: z.number().int().nonnegative(),
    backGroundImage: z.number().int().nonnegative(),
    Catches: z.array(z.string().regex(idFormatPattern)),
    posts: z.array(z.string().regex(idFormatPattern)),
    favoriteFish: z.string().regex(allowsEmptyOrNonWhitespacePattern),
    favoriteSpot: z.string().regex(allowsEmptyOrNonWhitespacePattern),
    fishingStyle: z.string().regex(allowsEmptyOrNonWhitespacePattern),
});

export type User = z.infer<typeof userSchema>;