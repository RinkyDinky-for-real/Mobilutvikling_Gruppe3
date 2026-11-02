import { z } from "zod";

export const PostSchema = z.object({
    id: z.string().min(1, "Id is required"),
    name: z.string(),
    time: z.string(),
    likesCount: z.number()
});

export type Post = z.infer<typeof PostSchema>;