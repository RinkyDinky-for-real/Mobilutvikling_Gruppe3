import { z } from 'zod';

export const markerSchema = z.object({
    id: z.string(),
    longlat: z.tuple([z.number(), z.number()]),
    photolink: z.number(),
    pointName: z.string(),
    RedirectLink: z.enum(['/feed', '/']),
});

export type Marker = z.infer<typeof markerSchema>;