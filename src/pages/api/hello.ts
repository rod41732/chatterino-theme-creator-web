import { NextApiHandler } from "next";

const handler: NextApiHandler = (req, res) => {
  res.status(200).send({ hello: "world" });
};




export default handler;
