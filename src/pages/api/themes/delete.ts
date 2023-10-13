import { NextApiHandler } from "next";
import { withIronSession } from "@/iron-session.options";
import { z } from "zod";
import { ApiResponse } from "@/lib/type";
import { deleteTheme, getThemeByIds } from "@/lib/db/theme";

const DeleteThemeSchema = z.object({
    id: z.number(),
});

type DeleteThemeBody = z.infer<typeof DeleteThemeSchema>;

const handler: NextApiHandler = async (req, res) => {
    let body: DeleteThemeBody;
    try {
        body = DeleteThemeSchema.parse(req.body);
    } catch (err) {
        return res.status(400).send({
            status: 400,
            message: "Bad request",
            data: null,
        } satisfies ApiResponse<null>);
    }

    const userId = req.session.user?.id;
    if (!userId) {
        return res.status(401).send({
            status: 401,
            message: "Not logged in",
            data: null,
        } satisfies ApiResponse<null>);
    }

    const themes = (await getThemeByIds([body.id])).filter(
        (it) => it.ownerId == userId,
    );
    if (!themes.length) {
        return res.status(404).send({
            status: 404,
            message: "Theme with specified ID not found or not owned by you",
            data: null,
        } satisfies ApiResponse<null>);
    }
    await deleteTheme(body.id);
    return res.status(200).send({
        status: 200,
        message: "Deleted theme",
        data: null,
    } satisfies ApiResponse<null>);
};

const realHandler = withIronSession(handler);
export default realHandler;
