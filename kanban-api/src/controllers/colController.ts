import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const getCols = async (req: Request, res: Response) => {
  res.send("Get All Cols");
};

export const createCol = async (req: Request, res: Response) => {
  res.send("Create a new col");
};

export const updateCol = async (req: Request, res: Response) => {
  res.send("updating a specific col");
};

export const deleteCol = async (req: Request, res: Response) => {
  res.send("Delete col");
};
