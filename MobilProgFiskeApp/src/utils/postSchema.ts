import { z } from 'zod';

const idPattern = /^[0-9]+$/;
const requiresNonWhitespacePattern = /[\s\S]*\S[\s\S]*/;
const datePattern = /^\d{1,2}\/\d{1,2}\/\d{2,4}$/;


export const postSchema = z.object({
    postid: z.string().regex(idPattern),
    title: z.string().regex(requiresNonWhitespacePattern),
    content: z.string().regex(requiresNonWhitespacePattern),
    longitude: z.number()
        .min(-180, 'Longitude must be between -180 and 180')
        .max(180, 'Longitude must be between -180 and 180'),
    latitude: z.number()
        .min(-90, 'Latitude must be between -90 and 90')
        .max(90, 'Latitude must be between -90 and 90'),
    date: z.string().regex(datePattern),
});

export type Post = z.infer<typeof postSchema>;