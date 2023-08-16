import { NextApiHandler } from "next";
import { ApiResponse } from "@/lib/type";
import { getUserById, User } from "@/db/user";
import { withIronSession } from "@/iron-session.options";

const handler: NextApiHandler = async (req, res) => {
    const uid = req.session.user?.id;
    if (!uid) {
        return res.status(400).send({
            status: 400,
            message: "Unauthorized",
            data: null,
        } satisfies ApiResponse<null>);
    }
    const user = await getUserById(uid)!;
    return res.status(200).send({
        data: user,
        message: "Successfully get logged in user",
        status: 200,
    } satisfies ApiResponse<User>);
};

const realHandler = withIronSession(handler);
export default realHandler;
