import mongoose from "mongoose";

const taskSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },
        status: {
            type: String,
            enum: ["active", "complete"],
            default: "active"
        },
        completedAt: {
            type: Date,
            default: null
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: true, //createdAt and updatedAt automatically generated
    }
);

// every list query is "my tasks, newest first"
taskSchema.index({ owner: 1, createdAt: -1 });

const Task = mongoose.model("Task", taskSchema);
export default Task;