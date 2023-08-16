import { NextApiHandler } from "next";
import { createUser, InsertUserSchema, User } from "@/db/user";
import { ApiResponse } from "@/lib/type";

const handler: NextApiHandler = async (req, res) => {
    if (req.method != "POST") {
        return res.status(405).send({
            status: 405,
            message: `method ${req.method} not allowed`,
        });
    }
    const user = await createUser(InsertUserSchema.parse(req.body));
    res.status(200).send({
        status: 200,
        message: "test complete KKona",
        data: user,
    } satisfies ApiResponse<User>);
};
export default handler;

/*
curl -X POST localhost:3000/api/debug/createUser --json '{"id": 1, "handle": "doge", "displayName": "Doge"}'

 */