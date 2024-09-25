import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const getTicketByID = async (req: Request, res: Response) => {
  const {id} = req.params;

  console.log("id: ", id);

  try {
    const ticket = await prisma.ticket.findFirst({
      where: {
        id: parseInt(id)
      }
    })

    console.log("TICKET IS: ", ticket)
    res.json(ticket);
  }
  catch (error) {
    res.status(500).json({error: "Failed to get ticket by id"})
  }
};

export const createTicket = async (req: Request, res: Response) => {
  try {
    const { name, text, colId } = req.body;

    console.log("TICKETS COL ID IS: ===> ", colId);

    const newTicket = await prisma.ticket.create({
      data: {
        title: name,
        text: text,
        colId: parseInt(colId),
      },
    });
    res.status(200).json(newTicket);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const updateTicket = async (req: Request, res: Response) => {
  res.json("Update a ticket");
};

export const deleteTicket = async (req: Request, res: Response) => {
  res.json("Delete a ticket");
};
