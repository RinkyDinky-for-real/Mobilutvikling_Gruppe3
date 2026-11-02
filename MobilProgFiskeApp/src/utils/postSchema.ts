import { z } from 'zod';


export const postSchema = z.object({
    postid: z.string(),
    userid: z.string(),
    title: z.string(),
    content: z.string(),
    longtitude: z.number(),
    latitude: z.number(),
    date: z.string(),
});

export type Marker = z.infer<typeof postSchema>;