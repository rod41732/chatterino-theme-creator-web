import { NextApiHandler } from "next";
import { withIronSession } from "@/iron-session.options";
import { ApiResponse } from "@/lib/type";

const handler: NextApiHandler = (req, res) => {
    if (req.method != "POST") {
        return res.status(405).send({
            status: 405,
            message: `Method ${req.method} not allowed`,
            data: null,
        } satisfies ApiResponse<null>);
    }
    req.session.destroy();
    return res.status(200).send({
        status: 200,
        message: "Logged out and cleared cookie",
        data: null,
    } satisfies ApiResponse<null>);
};

const realHandler = withIronSession(handler);
export default realHandler;
