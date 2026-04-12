import AddTask from "@/components/AddTask";
import DateTimeFilter from "@/components/DateTimeFilter";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import StatsAndFilters from "@/components/StatsAndFilters";
import TaskList from "@/components/TaskList";
import TaskListPagination from "@/components/TaskListPagination";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import api from "@/lib/axios";

const HomePage = () => {
    const [taskBuffer, setTaskBuffer] = useState([]);
    const [activeTaskCount, setActiveTaskCount] = useState(0);
    const [completeTaskCount, setCompleteTaskCount] = useState(0);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        fetchTasks();
    }, []);
    const fetchTasks = async () => {
        try {
            const res = await api.get("/tasks");
            setTaskBuffer(res.data.tasks);
            setActiveTaskCount(res.data.activeCount);
            setCompleteTaskCount(res.data.completeCount)
            console.log(res.data);
        } catch (error) {
            console.error("Error while getting tasks from backend:", error);
            toast.error("Error while getting tasks from backend");
        }
    }

    const handleTaskChange = () => {
        fetchTasks();
    }

    //tasks filtered by status 
    const filteredTasks = taskBuffer.filter((task) => {
        switch (filter) {
            case "active":
                return task.status === "active";
            case "completed":
                return task.status === "complete";
            default:
                return true;
        }
    });

    return (

        <div className="min-h-screen w-full relative">
            {/* Dark Horizon Glow */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    background: "radial-gradient(125% 125% at 50% 10%, #000000 40%, #0d1a36 100%)",
                }}
            />
            {/* Your Content/Components */}
            <div className="container pt-8 mx-auto relative z-10">
                <div className="w-full max-w-2xl p-6 mx-auto space-y-6">
                    <Header />

                    <AddTask handleNewTaskAdded={handleTaskChange} />

                    <StatsAndFilters
                        filter={filter}
                        setFilter={setFilter}
                        activeTaskCount={activeTaskCount}
                        completedTaskCount={completeTaskCount}
                    />

                    <TaskList
                        filteredTasks={filteredTasks}
                        filter={filter}
                        handleTaskChange={handleTaskChange}
                    />

                    <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
                        <TaskListPagination />
                        <DateTimeFilter />
                    </div>

                    <Footer
                        activeTasksCount={activeTaskCount}
                        completedTasksCount={completeTaskCount} />
                </div>
            </div>
        </div>

    )
}

export default HomePage;