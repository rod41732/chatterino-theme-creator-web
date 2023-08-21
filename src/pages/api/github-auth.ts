import { NextApiHandler } from "next";
import { withIronSession } from "@/iron-session.options";
import { createGithubUser } from "@/lib/db/github-user";
import { createOrUpdateUser } from "@/lib/db/user";

interface CodeResponse {
    access_token: string; // ghu_xxxxxx
    expires_in: number; // 28800 seconds
    refresh_token: string; //  "ghr_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";
    refresh_token_expires_in: number; // 15897600 seconds
    token_type: "bearer";
    scope: string; // e.g. ""
}

async function exchangeCode(code: string): Promise<CodeResponse> {
    return fetch("https://github.com/login/oauth/access_token", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify({
            code,
            client_id: process.env.GITHUB_CLIENT_ID,
            client_secret: process.env.GITHUB_CLIENT_SECRET,
        }),
    })
        .then(async (res) => {
            if (res.status != 200) {
                throw new Error(
                    `Code exchanged failed with status ${
                        res.status
                    }: ${await res.text()}`,
                );
            }
            return res.json();
        })
        .then((res) => {
            return res as CodeResponse;
        });
}

export interface GitHubUser {
    // all don't care fields stripped
    login: string;
    id: number; // rest ID
    avatar_url: string;
    name: string; // display name
}
async function getUser(oauthToken: string): Promise<GitHubUser> {
    return fetch("https://api.github.com/user", {
        method: "GET",
        headers: {
            Authorization: `Bearer ${oauthToken}`,
        },
    })
        .then(async (res) => {
            if (res.status != 200) {
                throw new Error(
                    `Code exchanged failed with status ${
                        res.status
                    }: ${await res.text()}`,
                );
            }
            return res.json();
        })
        .then((res) => {
            return res as GitHubUser;
        });
}

const handler: NextApiHandler = async (req, res) => {
    const code = req.body.code;
    if (!code) {
        return res.status(400).send({
            status: 400,
            message: "missing code",
        });
    }
    let token: CodeResponse;
    try {
        token = await exchangeCode(code);
    } catch (err: unknown) {
        return res.status(400).send({
            status: 400,
            message: "code exchange failed",
            data: {
                details: (err as Error).message,
            },
        });
    }

    let githubUser: GitHubUser;
    try {
        githubUser = await getUser(token.access_token);
    } catch (err: unknown) {
        return res.status(500).send({
            status: 500,
            message: "get user failed",
            data: {
                details: (err as Error).message,
            },
        });
    }

    const createdGithubUser = await createGithubUser({
        id: githubUser.id,
        login: githubUser.login,
        name: githubUser.name,
    });

    const user = await createOrUpdateUser({
        createdAt: new Date(),
        displayName: createdGithubUser.name,
        githubUserId: createdGithubUser.id,
        // TODO: handle potential user conflict
        handle: createdGithubUser.login,
    });

    req.session.user = { id: user.id };
    await req.session.save();
    return res.status(200).send({
        status: 200,
        message: "successfully authorized",
        data: { user: user },
    });
};

const realHandler = withIronSession(handler);
export default realHandler;
