import express from "express";
import { searchMedicine } from "../controllers/searchController.js";

const router = express.Router();

router.post("/", searchMedicine);

export default router;