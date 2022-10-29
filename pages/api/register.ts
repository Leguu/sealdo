import { User } from "@prisma/client";
import { genSaltSync, hash, hashSync } from "bcrypt";
import { METHODS } from "http";
import { StatusCodes } from "http-status-codes";
import { NextApiHandler } from "next";
import { saltRounds } from "src/bcrypt";
import { prisma } from "src/prisma";
import { toUserDto } from "./users/[id]";

const registerRoute: NextApiHandler = async (req, res) => {
  if (req.method !== 'POST') return res.status(StatusCodes.METHOD_NOT_ALLOWED).end();

  await new Promise(resolve => setTimeout(() => resolve(undefined), 1000));

  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(StatusCodes.BAD_REQUEST).send("Username or Password not provided");
  }

  if (password.length < 6) {
    return res.status(StatusCodes.BAD_REQUEST).send('Password length insufficient');
  }

  const salt = genSaltSync(saltRounds);
  const passwordHash = hashSync(password, salt);

  const user = await prisma?.user.create({
    data: {
      username,
      passwordHash
    }
  });

  if (!user) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).end();
  }

  return res.end();
};

export default registerRoute;