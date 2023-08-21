import { z } from "zod";
import { UserSchema } from "@/db/user";
import { client } from "@/db/db";
import { ThemeData } from "@/app/edit/ThemeContextProvider";

// theme schema, with optional joined fields
export const ThemeSchema = z.object({
    id: z.number(),
    ownerId: z.number(),
    // metadata (non c2-related thing)
    name: z.string(),
    createdAt: z.date().nullish(),
    modifiedAt: z.date().nullish(),
    checkeredRow: z.boolean(),
    messageSeparator: z.boolean(),
    // this is ThemeData
    data: z.any(),
    // joined fields
    owner: UserSchema.optional(),
});

export type Theme = z.infer<typeof ThemeSchema>;

export async function createTheme(
    data: ThemeData,
    ownerId: number,
): Promise<Theme> {
    const { ctcMeta, ...rest } = data;

    const createdTheme = await client
        .query(
            `INSERT INTO "UserThemes" ("ownerId", "data", "name", "createdAt", "modifiedAt", "checkeredRow",
                                       "messageSeparator")
             VALUES ($2, $3)`,
            [
                ownerId,
                data,
                ctcMeta.name,
                new Date(),
                new Date(),
                ctcMeta.checkeredRow,
                ctcMeta.messageSeparator,
            ],
        )
        .then((res) => ThemeSchema.parse(res.rows[0]));

    return createdTheme;
}

export async function listThemes(): Promise<Theme[]> {
    const themes = await client
        .query(
            `SELECT 
            ut.*,
            u.id as "userId",
            u."handle" as "userHandle",
            u."displayName" as "userDisplayName",
            u."createdAt" as "userCreatedAt",
            u."githubUserId" as "userGithubUserId"
         FROM "UserThemes" ut
                  INNER JOIN "Users" u ON ut."ownerId" = u."id"
         ORDER BY "modifiedAt" DESC`,
        )
        .then((res) => {
            return res.rows.map((it) => {
                const theme = ThemeSchema.parse(it);
                const user = UserSchema.parse({
                    id: it.userId,
                    handle: it.userHandle,
                    displayName: it.userDisplayName,
                    createdAt: it.userCreatedAt,
                    githubUserId: it.userGithubUserId,
                });
                theme.owner = user;
                return theme;
            });
        });

    return themes;
}
