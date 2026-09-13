import React from 'react'
import { ErrorMsg, Field, FormFooter, SelectWrapper } from '../components/reusable-sub-components';
import { taskForm } from '../../hooks/customHook';
import { Calendar, X } from 'lucide-react';

const TaskForm = ({ onClose }) => {

    const { registerTask, handleTaskSubmit, watchTask, setTaskValue, resetTask, taskErrors } = taskForm();

    const selectedPriority = watchTask("priority");

    const onTaskSubmit = (data) => {
        console.log("Task:", data);
        resetTask(); onClose?.();
    };


    return (
        <form onSubmit={handleTaskSubmit(onTaskSubmit)} className="flex flex-col h-full">
            <div className="p-5 sm:p-6 flex flex-col gap-4 flex-1">

                {/* Title */}
                <Field label="TITLE">
                    <input
                        type="text"
                        placeholder="e.g., Implement authentication middleware"
                        {...registerTask("title", { required: "Title is required" })}
                        className="input-base"
                    />
                    {taskErrors.title && <ErrorMsg>{taskErrors.title.message}</ErrorMsg>}
                </Field>

                {/* Description */}
                <Field label="DESCRIPTION">
                    <div className="rounded-lg border overflow-hidden bg-[var(--surface-container-lowest)] border-[var(--border-subtle)] focus-within:border-[var(--primary)]">

                        <textarea
                            rows={3}
                            placeholder="Describe the requirements and acceptance criteria..."
                            {...registerTask("description")}
                            className="w-full p-3 bg-transparent text-xs outline-none resize-none text-[var(--on-surface)] placeholder:text-[var(--outline)]"
                        />
                    </div>
                </Field>

                {/* Category & Assignees */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="CATEGORY">
                        <SelectWrapper>
                            <select
                                {...registerTask("category")}
                                className="select-base"
                            >
                                <option>Frontend Development</option>
                                <option>Backend Development</option>
                                <option>UI/UX Design</option>
                                <option>DevOps & CI/CD</option>
                            </select>
                        </SelectWrapper>
                    </Field>

                    <Field label="ASSIGNEES">
                        <div className="flex items-center flex-wrap gap-1.5 px-2.5 py-2 rounded-lg border bg-[var(--surface-container-lowest)] border-[var(--border-subtle)] min-h-[44px]">
                            <div className="flex items-center gap-1.5 px-2 py-1 rounded-md text-[11px] font-medium bg-[var(--surface-container-high)] text-[var(--on-surface)]">
                                <img
                                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=faces"
                                    alt="Alex"
                                    className="w-3.5 h-3.5 rounded-full object-cover"
                                />
                                <span>Alex M.</span>
                                <button type="button" className="hover:opacity-75 text-[var(--outline)]"><X size={10} /></button>
                            </div>
                            <input
                                type="text"
                                placeholder="Add members..."
                                className="bg-transparent border-none outline-none text-xs flex-1 min-w-[80px] text-[var(--on-surface)] placeholder:text-[var(--outline)]"
                            />
                        </div>
                    </Field>
                </div>

                {/* Priority & Due Date */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="PRIORITY">
                        <div className="grid grid-cols-2 gap-2">
                            {[
                                { value: "Normal", dot: "var(--secondary)" },
                                { value: "High", dot: "var(--error)" },
                            ].map(({ value, dot }) => (
                                <button
                                    key={value}
                                    type="button"
                                    onClick={() => setTaskValue("priority", value)}
                                    className={`flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-semibold border transition-all min-h-[44px] ${selectedPriority === value
                                        ? value === "High"
                                            ? "border-[var(--error)] bg-[rgba(255,180,171,0.08)] text-[var(--on-surface)]"
                                            : "border-[var(--primary)] bg-[rgba(192,193,255,0.08)] text-[var(--on-surface)]"
                                        : "border-[var(--border-subtle)] bg-[var(--surface-container-lowest)] text-[var(--text-secondary)]"
                                        }`}
                                >
                                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: dot }} />
                                    <span>{value}</span>
                                </button>
                            ))}
                        </div>
                    </Field>

                    <Field label="DUE DATE">
                        <div className="relative">
                            <input
                                type="date"
                                {...registerTask("dueDate")}
                                className="w-full px-3.5 py-2.5 rounded-lg text-xs font-medium border outline-none min-h-[44px] bg-[var(--surface-container-lowest)] border-[var(--border-subtle)] text-[var(--on-surface)] [color-scheme:dark]"
                            />
                            <Calendar size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--outline)]" />
                        </div>
                    </Field>
                </div>
            </div>

            {/* Sticky Footer */}
            <FormFooter onClose={onClose} submitLabel="Launch Task" />
        </form>
    )
}

export default TaskForm