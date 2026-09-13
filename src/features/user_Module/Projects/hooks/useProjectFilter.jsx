import { useMemo } from "react";



//   Filtering Logic
export const filteredProjects = (initialProjects, search, selectedTag, selectedStatus) => {
    return useMemo(() =>
        initialProjects.filter((project) => {
            const matchesSearch =
                project.title.toLowerCase().includes(search.toLowerCase()) ||
                project.repo.toLowerCase().includes(search.toLowerCase());

            const matchesStatus =
                selectedStatus === "ALL" || project.status === selectedStatus;

            const matchesTag =
                selectedTag === "ALL" || project.tags.includes(selectedTag);

            return matchesSearch && matchesStatus && matchesTag;
        }), [search, selectedStatus, selectedTag]);
};

export const handleReset = (setSearch, setSelectedTag, setSelectedStatus) => {
    setSearch("");
    setSelectedStatus("ALL");
    setSelectedTag("ALL");
};

export const statusColors = {
    ACTIVE: { bg: "var(--secondary-container)", text: "var(--on-secondary-container)" },
    PLANNING: { bg: "var(--tertiary-container)", text: "var(--on-tertiary-container)" },
    BLOCKED: { bg: "var(--error-container)", text: "var(--error)" },
};