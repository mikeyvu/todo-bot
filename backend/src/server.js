import express from 'express';
import taskRoute from "./routes/tasksRouters.js";
import { connectDB } from './config/db.js';
import dotenv from "dotenv";
import cors from "cors";
import path from "path";

import dns from "node:dns";

// ✅ Force Node.js to use Cloudflare DNS
dns.setServers(["1.1.1.1", "8.8.8.8"]);

dotenv.config();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

const app = express();

//middlewares
app.use(express.json());
if (process.env.NODE_ENV !== "production") {
    app.use(
        cors({
            origin: ["http://localhost:5173", "http://localhost:5174"]
        })
    );
}


app.use("/api/tasks", taskRoute);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
    })
}



connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`server start on port ${PORT}`);
    });
});


