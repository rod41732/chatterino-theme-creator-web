import { NextApiHandler } from "next";
import { getThemeByIds, Theme, updateThemeData } from "@/db/theme";
import { z } from "zod";
import { ApiResponse } from "@/lib/type";
import { withIronSession } from "@/iron-session.options";

const UpdateThemeSchema = z.object({
    id: z.number(),
    data: z.any(),
});

const handler: NextApiHandler = async (req, res) => {
    const userId = req.session.user?.id;
    if (!userId) {
        return res.status(401).send({
            status: 401,
            message: "Unauthorized",
            data: null,
        } satisfies ApiResponse<null>);
    }

    const body = UpdateThemeSchema.parse(req.body);
    const themes = await getThemeByIds([req.body.id]);
    if (!themes.length) {
        return res.status(404).send({
            status: 404,
            message: "Theme not found",
            data: null,
        } satisfies ApiResponse<null>);
    }
    const theme = themes[0];
    if (theme.ownerId != userId) {
        return res.status(403).send({
            status: 403,
            message: "Forbidden",
            data: null,
        } satisfies ApiResponse<null>);
    }

    const updatedTheme = await updateThemeData(body.id, body.data);
    return res.status(200).send({
        status: 200,
        message: "Updated Theme",
        data: updatedTheme,
    } satisfies ApiResponse<Theme>);
};

const realHandler = withIronSession(handler);
export default realHandler;
