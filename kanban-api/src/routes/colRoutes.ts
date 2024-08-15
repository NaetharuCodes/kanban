import express from "express";
import {
  getCols,
  updateCol,
  createCol,
  deleteCol,
} from "../controllers/colController";

const router = express.Router();

router.get("/", getCols);
router.post("/", createCol);
router.put("/:id", updateCol);
router.delete("/:id", deleteCol);

export default router;
