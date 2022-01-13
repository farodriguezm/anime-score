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
        const result = await prisma.anime.findMany({
          include: { reviews: true },
        });
        return res.json({ message: "Get Animes", data: result });
      } catch (error: any) {
        return res.status(500).json({ message: error.message });
      }
    case "POST":
      try {
        const { name, description } = body;
        const result = await prisma.anime.create({
          data: {
            name,
            description,
          },
        });
        return res.status(201).json({ message: "Created Anime", data: result });
      } catch (error: any) {
        return res.status(500).json({ message: error.message });
      }
    default:
      return res.status(405).json({ message: "Method Not Allowed" });
  }
}
