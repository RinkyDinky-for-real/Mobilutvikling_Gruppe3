import { z } from 'zod';

const idFormatPattern = /^[0-9]+$/;

export const markerSchema = z.object({
    id: z.string().regex(idFormatPattern),
    longlat: z.tuple([
        z.number().min(-180).max(180),
        z.number().min(-90).max(90),
    ]),
    photolink: z.number().int().nonnegative(),
    pointName: z.string().regex(/\S/),
    RedirectLink: z.enum(['/feed', '/']),
});

export type Marker = z.infer<typeof markerSchema>;