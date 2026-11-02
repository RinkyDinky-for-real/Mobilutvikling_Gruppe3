import { z } from 'zod';


export const postSchema = z.object({
    postid: z.string(),
    userid: z.string(),
    title: z.string(),
    content: z.string(),
    longitude: z.number(),
    latitude: z.number(),
    date: z.string(),
});

export type Post = z.infer<typeof postSchema>;