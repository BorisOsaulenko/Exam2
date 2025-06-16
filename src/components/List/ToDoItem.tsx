import { useRef, useState, type FC } from "react";
import { TrashIcon } from "@heroicons/react/24/outline";
import { PencilSquareIcon } from "@heroicons/react/16/solid";
import { EditToDoModal } from "../ToDoModal";

export interface ToDoItemDataProps {
  name: string;
  deadline: string;
  description: string;
  tags: string[];
  priority: number;
  id: number;
}

interface Props {
  task: ToDoItemDataProps;
  deleteTask: (id: number) => void;
  updateTask: (task: ToDoItemDataProps) => void;
}

export const ToDoItem: FC<Props> = ({ task, deleteTask, updateTask }) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        className="border-b-1 p-4 shadow flex flex-col gap-2 bg-white relative"
        data-priority={task.priority}
        ref={itemRef}
      >
        <div className="absolute inset-0 flex justify-end items-center gap-6 pr-8 bg-black/40 backdrop-blur-sm opacity-0 hover:opacity-100 transition-opacity z-10">
          <button className="focus:outline-none hover:scale-110 transition-transform">
            <TrashIcon
              className="w-8 h-8 text-red-500 cursor-pointer"
              onClick={() => deleteTask(task.id)}
            />
          </button>
          <button className="focus:outline-none hover:scale-110 transition-transform">
            <PencilSquareIcon
              className="w-8 h-8 text-blue-500 cursor-pointer"
              onClick={() => setOpen(true)}
            />
          </button>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <h2 className="text-lg font-semibold mr-10">{task.name}</h2>
            {task.tags.map((tag, idx) => (
              <span
                key={idx}
                className="bg-blue-100 text-blue-700 px-2 py-1 text-xs"
              >
                {tag}
              </span>
            ))}
          </div>
          <span className="text-sm text-gray-500">
            Due: {task.deadline.split("T")[0]}
          </span>
        </div>
        <div className="text-gray-700">{task.description}</div>
      </div>
      {open && (
        <EditToDoModal
          onClose={() => setOpen(false)}
          onSave={updateTask}
          item={task}
        />
      )}
    </>
  );
};
