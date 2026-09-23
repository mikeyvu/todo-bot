import express from "express";
import { createTask, deleteTask, getAllTasks, updateTask } from "../controller/taskControllers.js";
import { protectRoute } from "../middleware/protectRoute.js";
const router = express.Router();

router.use(protectRoute);

router.get("/", getAllTasks);

router.post("/", createTask);

router.put("/:id", updateTask);

router.delete("/:id", deleteTask);


export default router;