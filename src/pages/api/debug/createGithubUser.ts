import { NextApiHandler } from "next";
import {
    createGithubUser,
    GithubUser,
    InsertGithubUserSchema,
} from "@/lib/db/github-user";
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
    const user = await createGithubUser(InsertGithubUserSchema.parse(req.body));
    res.status(200).send({
        status: 200,
        message: "test complete KKona",
        data: user,
    } satisfies ApiResponse<GithubUser>);
};
export default handler;

/*
curl -X POST localhost:3000/api/debug/createGithubUser --json '{"id": 1234, "login": "doge", "name": "Dogechananat"}'

 */
