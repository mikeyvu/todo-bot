import Task from "../models/Task.js";

export const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch (error) {
        console.error("Error while retrieving all tasks from the database", error);
        res.status(500).json({message: "Interval error"})
    }
};

export const createTask = async (req, res) => {
    try {
        const {title} = req.body;
        const task = new Task({title});

        const newTask = await task.save();
        res.status(201).json(newTask);
    } catch (error) {
        console.error("Error while creating new task to the database", error);
        res.status(500).json({message: "Interval error"})
    }
};

export const updateTask = (req, res) => {
    res.status(200).json({message: "Task has been updated successfully."});
};

export const deleteTask = (req, res) => {
    res.status(200).json({message: "Task has been deleted successfully"});
}
