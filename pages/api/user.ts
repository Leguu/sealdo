import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiHandler } from "next";
import { ironOptions } from "src/iron";

const userRoute: NextApiHandler = (req, res) => {
  res.send(req.session.user);
};

export default withIronSessionApiRoute(userRoute, ironOptions);