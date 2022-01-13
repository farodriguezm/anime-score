import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, body } = req;
  switch (method) {
    case "GET":
      try {
        const result = await prisma.review.findMany({
          include: { anime: true },
        });
        return res.json({ message: "Get Reviews", data: result });
      } catch (error: any) {
        return res.status(500).json({ message: error.message });
      }
    case "POST":
      try {
        const { score, content, animeId } = body;
        const result = await prisma.review.create({
          data: {
            score,
            content,
            animeId,
          },
        });

        const result_2 = await prisma.review.aggregate({
          _avg: {
            score: true,
          },
          where: {
            animeId,
          },
        });

        await prisma.anime.update({
          where: {
            id: animeId,
          },
          data: {
            score: result_2._avg.score as number,
          },
        });

        return res
          .status(201)
          .json({ message: "Created Review", data: result });
      } catch (error: any) {
        return res.status(500).json({ message: error.message });
      }
    default:
      return res.status(405).json({ message: "Method Not Allowed" });
  }
}
