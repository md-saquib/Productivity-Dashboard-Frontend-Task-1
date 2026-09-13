

export const allTasks = [
    { id: "TSK-184", title: "Implement OAuth2 Authentication Flow", status: "todo", priority: "HIGH" },
    { id: "TSK-185", title: "Design System Token Migration", status: "todo", priority: "MEDIUM" },
    { id: "TSK-898", title: "Fix memory leak in data processing worker", status: "in-progress", priority: "HIGH" },
    { id: "TSK-882", title: "Update README with new setup instructions", status: "review", priority: "LOW" },
    { id: "TSK-071", title: "Refactor database connection pool", status: "done", priority: "LOW" },
];

export const initialProjects = [
    {
        id: 1,
        title: "Nexus Auth Microservice",
        repo: "org/nexus-auth-v2",
        status: "ACTIVE",
        tags: ["Go", "gRPC", "Redis"],
        progress: 82,
        progressColor: "var(--primary-container)",
        members: [{ avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&fit=crop&crop=faces" }],
    },
    {
        id: 2,
        title: "Data Pipeline V3",
        repo: "org/data-streamer",
        status: "PLANNING",
        tags: ["Python", "Kafka"],
        progress: 15,
        progressColor: "var(--tertiary-container)",
        members: [{ avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=64&h=64&fit=crop&crop=faces" }],
    },
    {
        id: 3,
        title: "Frontend Core UI",
        repo: "org/core-components",
        status: "BLOCKED",
        tags: ["React", "Tailwind"],
        progress: 65,
        progressColor: "var(--error)",
        members: [{ avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=faces" }],
    },
];

export const taskFilterOption = (selectedStatus, setSelectedStatus, selectedPriority, setSelectedPriority) =>
    [
        {
            key: "status",
            value: selectedStatus,
            onChange: setSelectedStatus,
            options: [
                { label: "All Statuses", value: "ALL" },
                { label: "To-Do", value: "todo" },
                { label: "In Progress", value: "in-progress" },
                { label: "Review", value: "review" },
                { label: "Done", value: "done" },
            ],
        },
        {
            key: "priority",
            value: selectedPriority,
            onChange: setSelectedPriority,
            options: [
                { label: "All Priorities", value: "ALL" },
                { label: "High", value: "HIGH" },
                { label: "Medium", value: "MEDIUM" },
                { label: "Low", value: "LOW" },
            ],
        },
    ]

export const projectFilterOption = (selectedStatus, setSelectedStatus, selectedTag, setSelectedTag) =>
    [
        {
            key: "status",
            value: selectedStatus,
            onChange: setSelectedStatus,
            options: [
                { label: "All Statuses", value: "ALL" },
                { label: "Active", value: "ACTIVE" },
                { label: "Planning", value: "PLANNING" },
                { label: "Blocked", value: "BLOCKED" },
            ],
        },
        {
            key: "tag",
            value: selectedTag,
            onChange: setSelectedTag,
            options: [
                { label: "All Tech Stacks", value: "ALL" },
                { label: "React", value: "React" },
                { label: "Go", value: "Go" },
                { label: "Python", value: "Python" },
            ],
        },
    ]