import { STATUS_CODES } from "http";
import { StatusCodes } from "http-status-codes";
import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiHandler } from "next";
import { ironOptions } from "src/iron";
import { prisma } from "src/prisma";
import user from "../user";

const termsRoute: NextApiHandler = async (req, res) => {
  const userId = req.session.user?.id;

  if (!userId) {
    return res.status(StatusCodes.FORBIDDEN).end();
  }

  const user = await prisma.user.findFirst({ where: { id: userId }, include: { terms: true } });

  res.status(StatusCodes.OK).json(user?.terms);
};

export default withIronSessionApiRoute(termsRoute, ironOptions);