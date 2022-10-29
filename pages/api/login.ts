import { NextRequest, NextResponse } from "next/server";
import { ironOptions } from "src/iron";
import { withIronSessionApiRoute } from 'iron-session/next';
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { DataBackup } from "@carbon/icons-react";
import { StatusCodes } from "http-status-codes";
import { prisma } from 'src/prisma';
import { compare, compareSync, hash, hashSync } from "bcrypt";
import { toUserDto } from "./users/[id]";

const loginRoute = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") return res.status(StatusCodes.METHOD_NOT_ALLOWED).end();

  await new Promise(resolve => setTimeout(() => resolve(undefined), 1000));

  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(StatusCodes.BAD_REQUEST).end();
  }

  const user = await prisma?.user.findUnique({ where: { username } });

  if (!user) {
    return res.status(StatusCodes.NOT_FOUND).end();
  }

  if (!compareSync(password, user.passwordHash)) {
    return res.status(StatusCodes.UNAUTHORIZED).end();
  }

  req.session.user = toUserDto(user);

  await req.session.save();

  res.send({ ok: true });
};

export default withIronSessionApiRoute(loginRoute, ironOptions);