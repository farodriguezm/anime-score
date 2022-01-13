import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    method,
    body,
    query: { id },
  } = req;
  switch (method) {
    case "GET":
      try {
        const result = await prisma.review.findUnique({
          where: {
            id,
          },
          include: {
            anime: true,
          },
        });
        if (!result) return res.status(404).json({ message: "Not Found" });
        return res.json({ message: "Get Review", data: result });
      } catch (error: any) {
        return res.status(500).json({ message: error.message });
      }
    case "PUT":
      try {
        const { score, content } = body;
        const result = await prisma.review.findUnique({
          where: {
            id,
          },
        });

        if (!result) return res.status(404).json({ message: "Not Found" });

        await prisma.review.update({
          where: {
            id,
          },
          data: {
            score,
            content,
          },
        });

        const result_2 = await prisma.review.aggregate({
          _avg: {
            score: true,
          },
          where: {
            animeId: result.animeId,
          },
        });

        await prisma.anime.update({
          where: {
            id: result.animeId,
          },
          data: {
            score: result_2._avg.score,
          },
        });

        return res.status(204).json({});
      } catch (error: any) {
        return res.status(500).json({ message: error.message });
      }
    case "DELETE":
      try {
        const result = await prisma.review.findUnique({
          where: {
            id,
          },
        });

        if (!result) return res.status(404).json({ message: "Not Found" });

        await prisma.review.delete({
          where: {
            id,
          },
        });

        const result_2 = await prisma.review.aggregate({
          _avg: {
            score: true,
          },
          where: {
            animeId: result.animeId,
          },
        });

        await prisma.anime.update({
          where: {
            id: result.animeId,
          },
          data: {
            score: result_2._avg.score,
          },
        });

        return res.status(204).json({});
      } catch (error: any) {
        return res.status(500).json({ message: error.message });
      }
    default:
      return res.status(405).json({ message: "Method Not Allowed" });
  }
}
