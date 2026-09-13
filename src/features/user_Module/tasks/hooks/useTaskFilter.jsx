import { useMemo } from "react";


export const filteredTasks = (allTasks, selectedStatus, selectedPriority, search) => {
    return useMemo(() =>
        allTasks.filter((task) => {
            const matchesSearch =
                task.title.toLowerCase().includes(search.toLowerCase()) ||
                task.id.toLowerCase().includes(search.toLowerCase());

            const matchesStatus =
                selectedStatus === "ALL" || task.status === selectedStatus;

            const matchesPriority =
                selectedPriority === "ALL" || task.priority === selectedPriority;

            return matchesSearch && matchesStatus && matchesPriority;
        }, [selectedStatus, selectedPriority, search]));
};

export const handleReset = (setSearch, setSelectedStatus, setSelectedPriority) => {
    setSearch("");
    setSelectedStatus("ALL");
    setSelectedPriority("ALL");
};

export const columns = ["todo", "in-progress", "review", "done"];