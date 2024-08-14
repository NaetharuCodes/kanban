import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const getAllBoards = async (req: Request, res: Response) => {
  console.log("all boards controller");
  try {
    const allBoards = await prisma.board.findMany();
    console.log(allBoards);
    res.json(allBoards);
  } catch (error) {
    res.status(500).json({ error: "Failed to get all boards" });
  }
};

export const getBoard = (req: Request, res: Response) => {
  res.send("get specific board by id");
};

export const createBoard = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const newBoard = await prisma.board.create({
      data: {
        name: name,
      },
    });
    res.json(newBoard);
  } catch (error) {
    res.status(500).json({ error: "unable to create a new board" });
  }
};

export const updateBoard = (req: Request, res: Response) => {
  res.send("update an exisitng board");
};

export const deleteBoard = (req: Request, res: Response) => {
  res.send("delete a board");
};
