import { NextApiHandler } from "next";
import { withIronSession } from "@/iron-session.options";
import { z } from "zod";
import { getThemeByIds, Theme } from "@/lib/db/theme";
import { ApiResponse } from "@/lib/type";

const ByIdSchema = z.object({
    id: z.number(),
});

const handler: NextApiHandler = async (req, res) => {
    const body = ByIdSchema.parse(req.body);
    const themes = await getThemeByIds([body.id]);
    if (!themes.length) {
        return res.status(404).send({
            status: 403,
            message: "Theme with specified ID not found",
            data: null,
        } satisfies ApiResponse<null>);
    }
    return res.status(200).send({
        data: themes[0],
        message: "Successfully get theme by ID",
        status: 200,
    } satisfies ApiResponse<Theme>);
};

const realHandler = withIronSession(handler);

export default realHandler;
