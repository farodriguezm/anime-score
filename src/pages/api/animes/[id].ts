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
        const result = await prisma.anime.findUnique({
          where: {
            id: id as string,
          },
          include: {
            reviews: true,
          },
        });
        if (!result) return res.status(404).json({ message: "Not Found" });
        return res.json({ message: "Get Anime", data: result });
      } catch (error: any) {
        return res.status(500).json({ message: error.message });
      }
    case "PUT":
      try {
        const { name, description } = body;
        const result = await prisma.anime.findUnique({
          where: {
            id: id as string,
          },
        });

        if (!result) return res.status(404).json({ message: "Not Found" });

        await prisma.anime.update({
          where: {
            id: id as string,
          },
          data: {
            name,
            description,
          },
        });
        return res.status(204).json({});
      } catch (error: any) {
        return res.status(500).json({ message: error.message });
      }
    case "DELETE":
      try {
        const result = await prisma.anime.findUnique({
          where: {
            id: id as string,
          },
        });

        if (!result) return res.status(404).json({ message: "Not Found" });

        await prisma.anime.delete({
          where: {
            id: id as string,
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
