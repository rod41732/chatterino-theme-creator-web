import { NextApiHandler } from "next";
import { listThemes, Theme } from "@/db/theme";
import { ApiResponse } from "@/lib/type";
import { withIronSession } from "@/iron-session.options";

const handler: NextApiHandler = async (req, res) => {
    const allThemes = await listThemes();
    return res.status(200).send({
        status: 200,
        message: "Successfully listed themes",
        data: allThemes,
    } satisfies ApiResponse<Theme[]>);
};

const realHandler = withIronSession(handler);
export default realHandler;
