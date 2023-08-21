import { z } from "zod";
import { UserSchema } from "@/lib/db/user";
import { client } from "@/lib/db/db";
import { ThemeData } from "@/app/edit/ThemeContextProvider";

// theme schema, with optional joined fields
// TODO: should cleary distinguish theme with or without joined fields
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
             VALUES ($1, $2, $3, $4, $5, $6, $7)
             RETURNING *`,
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

export async function getThemeByIds(ids: number[]): Promise<Theme[]> {
    if (ids.length == 0) return [];
    const placeholder =
        "(" +
        Array(ids.length)
            .fill(0)
            .map((_, idx) => `$` + (idx + 1))
            .join(", ") +
        ")";
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
         WHERE ut."id" in ${placeholder}
         ORDER BY "modifiedAt" DESC`,
            ids,
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

export async function updateThemeData(
    id: number,
    data: ThemeData,
): Promise<Theme> {
    const { ctcMeta, ...rest } = data;

    const updatedTheme = await client
        .query(
            `UPDATE "UserThemes" SET
            "data" = $1,  
            "name" = $2,  
            "createdAt" = $3,  
            "modifiedAt" = $4,  
            "checkeredRow" = $5,
            "messageSeparator" = $6
             WHERE "id" = $7
             RETURNING *`,
            [
                data,
                ctcMeta.name,
                new Date(),
                new Date(),
                ctcMeta.checkeredRow,
                ctcMeta.messageSeparator,
                id,
            ],
        )
        .then((res) => ThemeSchema.parse(res.rows[0]));

    return updatedTheme;
}

export async function listUserTheme(userId: number): Promise<Theme[]> {
    const res = await client.query(
        `SELECT * FROM "UserThemes" WHERE "ownerId" = $1`,
        [userId],
    );
    return res.rows.map((it) => ThemeSchema.parse(it));
}
