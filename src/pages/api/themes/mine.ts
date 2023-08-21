import { NextApiHandler } from "next";
import { withIronSession } from "@/iron-session.options";
import { ApiResponse } from "@/lib/type";
import { listUserTheme, Theme } from "@/lib/db/theme";

const handler: NextApiHandler = async (req, res) => {
    const userId = req.session.user?.id;
    if (!userId) {
        return res.status(401).send({
            data: null,
            message: "Not logged in",
            status: 401,
        } satisfies ApiResponse<null>);
    }
    const myThemes = await listUserTheme(userId);
    return res.status(200).send({
        status: 200,
        message: "Successfully list owned themes",
        data: myThemes,
    } satisfies ApiResponse<Theme[]>);
};

const realHandler = withIronSession(handler);
export default realHandler;
