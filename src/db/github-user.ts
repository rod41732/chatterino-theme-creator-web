import { z } from "zod";
import { client } from "@/db/db";

export const GithubUserSchema = z.object({
    id: z.number(),
    login: z.string(),
    name: z.string(),
});

export const InsertGithubUserSchema = GithubUserSchema.extend({});

type GithubUser = z.infer<typeof GithubUserSchema>;
type InsertGithubUser = z.infer<typeof InsertGithubUserSchema>;

export async function createGithubUser(
    user: InsertGithubUser,
): Promise<GithubUser> {
    const res = await client.query(
        `
INSERT INTO "GithubUsers" ("id", "login", "name") VALUES ($1, $2, $3)
ON CONFLICT ("id") DO UPDATE SET "login" = excluded."login", "name" = excluded."name"
RETURNING *`,
        [user.id, user.login, user.name],
    );
    return GithubUserSchema.parse(res.rows[0]);
}
