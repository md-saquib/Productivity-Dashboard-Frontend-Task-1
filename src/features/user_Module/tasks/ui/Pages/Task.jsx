import React, { useState } from "react";
import { allTasks, taskFilterOption } from "../../../../../app/data/data";
import { columns, filteredTasks, handleReset } from "../../hooks/useTaskFilter";
import FilterBar from "../../../../filter/ui/pages/FilterBar";

/**
 * Task — Kanban Board Page
 *
 * Desktop (lg+):       4-column side-by-side grid
 * Mobile/Tablet (<lg): Horizontal snap-scroll carousel — each column is a
 *                      snap point, preventing vertical stacking clutter.
 *                      Width is clamped so the next card peeks on the edge.
 */
export default function Task() {
    const [search, setSearch] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("ALL");
    const [selectedPriority, setSelectedPriority] = useState("ALL");

    const hasActiveFilters =
        search !== "" || selectedStatus !== "ALL" || selectedPriority !== "ALL";

    const visibleTasks = filteredTasks(
        allTasks,
        selectedStatus,
        selectedPriority,
        search
    );

    const statusMeta = {
        todo: { label: "To-Do", accent: "var(--outline)" },
        "in-progress": { label: "In Progress", accent: "var(--tertiary)" },
        review: { label: "Review", accent: "var(--secondary)" },
        done: { label: "Done", accent: "var(--primary)" },
    };

    return (
        <div className="p-4 sm:p-6 lg:p-8 w-full min-h-screen bg-[var(--background)] text-[var(--text-primary)] font-sans pb-20 md:pb-6">

            {/* Header */}
            <div className="mb-5">
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--on-surface)]">
                    Tasks
                </h2>
                <p className="text-xs mt-1 font-medium text-[var(--text-secondary)]">
                    Manage and track engineering deliverables.
                </p>
            </div>

            {/* Filter Bar */}
            <FilterBar
                searchQuery={search}
                onSearchChange={setSearch}
                searchPlaceholder="Search task name or ID..."
                hasActiveFilters={hasActiveFilters}
                onReset={() => handleReset(setSearch, setSelectedStatus, setSelectedPriority)}
                filters={taskFilterOption(
                    selectedStatus,
                    setSelectedStatus,
                    selectedPriority,
                    setSelectedPriority
                )}
            />

            {/* ── Desktop: 4-column grid ── */}
            <div className="hidden lg:grid grid-cols-4 gap-4">
                {columns.map((colStatus) => (
                    <KanbanColumn
                        key={colStatus}
                        colStatus={colStatus}
                        tasks={visibleTasks.filter((t) => t.status === colStatus)}
                        meta={statusMeta[colStatus]}
                    />
                ))}
            </div>

            {/* ── Mobile / Tablet: horizontal snap-scroll ── */}
            <div className="
                lg:hidden
                flex flex-col items-center
                snap-x
                gap-4 pb-4
                -mx-4 px-4
                sm:-mx-6 sm:px-6
                scrollbar-none
            ">
                {columns.map((colStatus) => (
                    <div
                        key={colStatus}
                        className="snap-center shrink-0 w-[78vw] sm:w-[55vw] md:w-[42vw]"
                    >
                        <KanbanColumn
                            colStatus={colStatus}
                            tasks={visibleTasks.filter((t) => t.status === colStatus)}
                            meta={statusMeta[colStatus]}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

/** Shared Kanban column card — used by both grid and snap-scroll layouts */
function KanbanColumn({ colStatus, tasks, meta }) {
    return (
        <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-container-low)] p-4 flex flex-col gap-3 min-h-[300px]">

            {/* Column Header */}
            <div className="flex items-center justify-between pb-2">
                <div className="flex items-center gap-2">
                    {/* Colour accent dot */}
                    <span
                        className="w-2 h-2 rounded-full shrink-0"
                        style={{ backgroundColor: meta.accent }}
                    />
                    <span className="text-xs font-bold uppercase text-[var(--text-primary)]">
                        {meta.label}
                    </span>
                </div>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-[var(--surface-container-high)] text-[var(--text-secondary)]">
                    {tasks.length}
                </span>
            </div>

            {/* Task Cards */}
            <div className="flex flex-col gap-2">
                {tasks.length === 0 ? (
                    <p className="text-[11px] text-[var(--outline)] text-center mt-6 italic">
                        No tasks here
                    </p>
                ) : (
                    tasks.map((t) => (
                        <div
                            key={t.id}
                            className="p-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-container)] text-xs flex flex-col gap-1.5 transition-all hover:scale-[1.01] cursor-pointer"
                        >
                            <span className="text-[10px] font-mono text-[var(--outline)]">
                                {t.id}
                            </span>
                            <span className="font-medium text-[var(--on-surface)] leading-snug">
                                {t.title}
                            </span>
                            {/* Priority badge */}
                            <span className={`
                                self-start px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider
                                ${t.priority === "HIGH"
                                    ? "bg-[var(--error-container)] text-[var(--error)]"
                                    : t.priority === "MEDIUM"
                                        ? "bg-[var(--tertiary-container)] text-[var(--on-tertiary-container)]"
                                        : "bg-[var(--surface-container-high)] text-[var(--text-secondary)]"
                                }
                            `}>
                                {t.priority}
                            </span>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}