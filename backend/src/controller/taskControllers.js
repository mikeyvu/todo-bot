export const getAllTasks = (request, response) => {
    response.status(200).send("You have 20 tasks need to be done");
};

export const createTask = (req, res) => {
    res.status(201).json({message: "New tasks has been successfully added."});
};

export const updateTask = (req, res) => {
    res.status(200).json({message: "Task has been updated successfully."});
};

export const deleteTask = (req, res) => {
    res.status(200).json({message: "Task has been deleted successfully"});
}
