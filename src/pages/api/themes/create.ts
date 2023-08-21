import { NextApiHandler } from "next";
import { ApiResponse } from "@/lib/type";
import { ThemeData } from "@/app/edit/ThemeContextProvider";
import { createTheme, Theme } from "@/lib/db/theme";
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
