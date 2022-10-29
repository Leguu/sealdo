import { StatusCodes } from "http-status-codes";
import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiHandler } from "next";
import { ironOptions } from "src/iron";

const logoutRoute: NextApiHandler = (req, res) => {
  if (!req.session.user) {
    return res.status(StatusCodes.NOT_FOUND).end();
  }

  req.session.destroy();

  res.status(StatusCodes.OK).end();
};

export default withIronSessionApiRoute(logoutRoute, ironOptions);