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

/** create user or update based on GitHub user existence */
export async function createOrUpdateUser(user: InsertUser): Promise<User> {
    const res = await client.query(
        `INSERT INTO "Users" ("handle", "displayName", "githubUserId", "createdAt") 
                        VALUES ($1, $2, $3, $4)
                        ON CONFLICT ("githubUserId")  DO UPDATE SET "handle" = excluded."handle", "displayName" = excluded."displayName"
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

export async function getUserById(id: number): Promise<User | null> {
    const res = await client.query(`SELECT * FROM "Users" where "id" = $1`, [
        id,
    ]);
    if (!res.rowCount) return null;
    return UserSchema.parse(res.rows[0]);
}
