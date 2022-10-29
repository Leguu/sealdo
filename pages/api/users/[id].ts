import { User } from '@prisma/client';
import { STATUS_CODES } from 'http';
import { StatusCodes } from 'http-status-codes';
import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'src/prisma';

export interface UserDto {
  id: number;
  username: string;
  name: string | null;

  preferredTheme: string;
  preferredLocale: string;
}

export const toUserDto = ({ id, username, name, preferredLocale, preferredTheme }: User): UserDto => {
  return { id, username, name, preferredLocale, preferredTheme };
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<UserDto>) {
  if (req.method === 'POST') {
  } else if (req.method === "GET") {
    return get(req, res);
  }

  return res.status(StatusCodes.METHOD_NOT_ALLOWED);
}

async function get(req: NextApiRequest, res: NextApiResponse<UserDto>) {
  const id = Number(req.query['id']);

  if (!id) return res.status(StatusCodes.BAD_REQUEST).end();

  const user = await prisma?.user.findUnique({ where: { id }, include: {} });

  if (!user) return res.status(StatusCodes.NOT_FOUND).end();

  return res.status(StatusCodes.OK).json(toUserDto(user));
}