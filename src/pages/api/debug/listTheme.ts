import { NextApiHandler } from "next";
import { ApiResponse } from "@/lib/type";
import { listThemes, Theme } from "@/lib/db/theme";
import { withIronSession } from "@/iron-session.options";

const handler: NextApiHandler = async (req, res) => {
    const user = req.session.user;
    if (!user) {
        return res.status(400).send({
            status: 400,
            message: "Not logged in",
            data: null,
        } satisfies ApiResponse<null>);
    }
    const themes = await listThemes();
    return res.status(200).send({
        status: 200,
        message: "Created Theme",
        data: themes,
    } satisfies ApiResponse<Theme[]>);
};

const realHandler = withIronSession(handler);
export default realHandler;
