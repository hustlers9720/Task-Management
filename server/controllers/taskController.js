import TaskModel from "../models/taskMod.js";

const addTask = async (req, res) => {
    const { title, description } = req.body;

    if (!title) {
        return res.status(400).json({ message: "Title is required" }); // ✅ Proper error message
    }

    try {
        const newTask = new TaskModel({ title, description });
        await newTask.save();
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ message: "Failed to add task", error: error.message }); // ✅ Handles server errors
    }
};

const editTask = async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;

    if (!title && !description) {
        return res.status(400).json({ message: "Provide at least one field to update" });
    }

    try {
        const updatedTask = await TaskModel.findByIdAndUpdate(
            id,
            { $set: { title, description } },
            { new: true, runValidators: true }
        );

        if (!updatedTask) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(500).json({ message: "Failed to update task", error: error.message });
    }
};

const getTask = async (req, res) => {
    try {
        const tasks = await TaskModel.find().lean(); // Use `.lean()` to avoid circular references
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: "Error fetching tasks", error: error.message });
    }
};

const deleteTask = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedTask = await TaskModel.findByIdAndDelete(id);

        if (!deletedTask) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete task", error: error.message });
    }
};


const editCompletedTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { completed } = req.body;

        if (typeof completed !== "boolean") {
            return res.status(400).json({ message: "Invalid completed status" });
        }

        const updatedTask = await TaskModel.findByIdAndUpdate(
            id,
            { completed },
            { new: true }
        );

        if (!updatedTask) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(500).json({ message: "Error updating task status", error });
    }
};

export { addTask, getTask, deleteTask, editTask, editCompletedTask }