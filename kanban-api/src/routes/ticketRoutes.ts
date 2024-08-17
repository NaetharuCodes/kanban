import express from "express";
import {
  getTicketByID,
  createTicket,
  updateTicket,
  deleteTicket,
} from "../controllers/ticketController";

const router = express.Router();

router.get("/:id", getTicketByID);
router.post("/", createTicket);
router.put("/:id", updateTicket);
router.delete("/:id", deleteTicket);

export default router;
