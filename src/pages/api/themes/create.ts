import { NextApiHandler } from "next";
import { ApiResponse } from "@/lib/type";
import { createTheme, Theme } from "@/lib/db/theme";
import { withIronSession } from "@/iron-session.options";
import { ThemeData } from "@/app/edit/color-scheme.types";

const handler: NextApiHandler = async (req, res) => {
    const user = req.session.user;
    if (!user) {
        return res.status(401).send({
            status: 401,
            message: "Not logged in",
            data: null,
        } satisfies ApiResponse<null>);
    }
    console.log("req body", req.body);
    const theme = req.body as ThemeData;
    const createdTheme = await createTheme(theme, user.id);
    return res.status(200).send({
        status: 200,
        message: "Created Theme",
        data: createdTheme,
    } satisfies ApiResponse<Theme>);
};

const realHandler = withIronSession(handler);
export default realHandler;
