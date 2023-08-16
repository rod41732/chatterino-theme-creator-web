import { client } from "@/db/db";
import { z } from "zod";

export const UserSchema = z.object({
    id: z.number(),
    handle: z.string(),
    displayName: z.string(),
    githubUserId: z.number().nullish(),
    createdAt: z.date(),
});

export const InsertUserSchema = UserSchema.omit({ id: true }).extend({
    createdAt: z.date().optional(),
});

export type User = z.infer<typeof UserSchema>;

export type InsertUser = z.infer<typeof InsertUserSchema>;

export async function createUser(user: InsertUser) {
    const res = await client.query(
        `INSERT INTO "Users" ("handle", "displayName", "githubUserId", "createdAt") 
                        VALUES ($1, $2, $3, $4)
                        RETURNING *`,
        [
            user.handle,
            user.displayName,
            user.githubUserId ?? null,
            user.createdAt ?? new Date(),
        ],
    );
    return UserSchema.parse(res.rows[0]);
}
