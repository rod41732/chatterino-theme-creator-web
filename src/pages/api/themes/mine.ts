import { NextApiHandler } from "next";
import { withIronSession } from "@/iron-session.options";
import { ApiResponse } from "@/lib/type";

const handler: NextApiHandler = (req, res) => {
    const user = req.session.user;
    if (!user) {
        return res.status(401).send({
            data: null,
            message: "Not logged in",
            status: 401,
        } satisfies ApiResponse<null>);
    }
    throw new Error("TODO");
};

const realHandler = withIronSession(handler);
export default realHandler;
