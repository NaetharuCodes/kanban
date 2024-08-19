import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const getCols = async (req: Request, res: Response) => {
  try {
    const { boardId } = req.body;
    const boardCols = await prisma.col.findMany({
      where: {
        boardId: boardId,
      },
      include: {
        tickets: true,
      },
    });
    res.status(200).json(boardCols);
  } catch (error) {
    res.status(500).json({ error: "failed to get cols" });
  }
};

export const createCol = async (req: Request, res: Response) => {
  try {
    const { boardId, name, color } = req.body;
    const newCol = await prisma.col.create({
      data: {
        boardId: parseInt(boardId),
        name: name as string,
        color: color as string,
      },
    });
    res.status(200).json(newCol);
  } catch (error) {
    res.status(500).json({ error: "failed to create a new col" });
  }
};

export const updateCol = async (req: Request, res: Response) => {
  res.send("updating a specific col");
};

export const deleteCol = async (req: Request, res: Response) => {
  res.send("Delete col");
};
