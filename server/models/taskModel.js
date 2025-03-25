import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
    // id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    title: { type: String, required: true },
    description: { type: String, default: "" },
    completed: { type: Boolean, default: false }
});

const TaskModel = mongoose.model("Task", TaskSchema);

export default TaskModel;
