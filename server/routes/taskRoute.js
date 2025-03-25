import express from 'express';
import { addTask, getTask, editTask, deleteTask, editCompletedTask } from '../controllers/taskController.js';

const router = express.Router();

router.post("/add", addTask);
router.get("/get", getTask);
router.put("/edit/:id", editTask);
router.put("/edit-completed/:id", editCompletedTask);
router.delete("/delete/:id", deleteTask);

export default router;  // ✅ Ensure default export
