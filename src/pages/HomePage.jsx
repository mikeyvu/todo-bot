import AddTask from "@/components/AddTask";
import DateTimeFilter from "@/components/DateTimeFilter";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import StatsAndFilters from "@/components/StatsAndFilters";
import TaskList from "@/components/TaskList";
import TaskListPagination from "@/components/TaskListPagination";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import axios from "axios";

const HomePage = () => {
    const [taskBuffer, setTaskBuffer] = useState([]);

    useEffect(() => {
        fetchTasks();
    }, []);
    const fetchTasks = async () => {
        try {
            const res = await axios.get("http://localhost:5001/api/tasks");
            setTaskBuffer(res.data);
            console.log(res.data);
        } catch (error) {
            console.error("Error while getting tasks from backend:", error);
            toast.error("Error while getting tasks from backend");
        }
    }
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

                    <AddTask />

                    <StatsAndFilters />

                    <TaskList filteredTasks={taskBuffer}/>

                    <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
                        <TaskListPagination />
                        <DateTimeFilter />
                    </div>

                    <Footer />
                </div>
            </div>
        </div>

    )
}

export default HomePage;