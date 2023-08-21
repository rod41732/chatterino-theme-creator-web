import { IronSessionOptions } from "iron-session";
import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiHandler } from "next";

const ironSessionOptions: IronSessionOptions = {
    password: process.env.IRON_SESSION_PASSWORD,
    cookieName: "ctcsession",
    cookieOptions: {
        secure: process.env.NODE_ENV == "production",
    },
};

/** wrapper around original withIronSessionApiRoute that set common config */
export const withIronSession = (handler: NextApiHandler) =>
    withIronSessionApiRoute(handler, ironSessionOptions);

// This is where we specify the typings of req.session.*
declare module "iron-session" {
    interface IronSessionData {
        user?: { id: number };
    }
}
