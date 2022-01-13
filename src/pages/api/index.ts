import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const result: any = await prisma.$queryRaw`select now() as time`;
  res.status(200).json({ message: "Anime Score API", time: result[0].time });
}
