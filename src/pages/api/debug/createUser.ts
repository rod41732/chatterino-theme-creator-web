import { NextApiHandler } from "next";
import { createOrUpdateUser, InsertUserSchema, User } from "@/db/user";
import { ApiResponse } from "@/lib/type";

const handler: NextApiHandler = async (req, res) => {
    if (process.env.NODE_ENV != "development") {
        return res.status(403).send({
            status: 403,
            message: "this is available during development only",
        });
    }
    if (req.method != "POST") {
        return res.status(405).send({
            status: 405,
            message: `method ${req.method} not allowed`,
        });
    }
    const user = await createOrUpdateUser(InsertUserSchema.parse(req.body));
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
