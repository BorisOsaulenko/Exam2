import { useRef, useState, type FC } from "react";

import {
  ArrowDownIcon,
  TrashIcon,
  PencilSquareIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { ToDoItem, type ToDoItemDataProps } from "./ToDoItem";
import { EditProjectModal } from "../ProjectModal";
import { EditToDoModal } from "../ToDoModal";
import { useQuery } from "../Header/QueryContext";

export interface ProjectProps {
  name: string;
  tasks: ToDoItemDataProps[];
  priority: number;
  id: number;
}

interface Props {
  project: ProjectProps;
  deleteProject: (id: number) => void;
  updateProject: (project: ProjectProps) => void;
  updateTask: (task: ToDoItemDataProps) => void;
  deleteTask: (id: number) => void;
  addTaskToProject: (projectId: number, task: ToDoItemDataProps) => void;
}

export const Project: FC<Props> = ({
  project,
  deleteProject,
  updateProject,
  updateTask,
  deleteTask,
  addTaskToProject,
}) => {
  const [isOpenEditToDo, setIsOpenEditToDo] = useState(false);
  const [isOpenEditProject, setIsOpenEditProject] = useState(false);
  const [isOpenAddTask, setIsOpenAddTask] = useState(false);

  const { query } = useQuery();
  const checkQuery = (task: ToDoItemDataProps) => {
    const lookingFor = query.split(" ");

    return lookingFor.every(
      (q) =>
        task.name.toLowerCase().includes(q.toLowerCase()) ||
        task.description.toLowerCase().includes(q.toLowerCase()) ||
        task.tags.some((t) => t.toLowerCase().includes(q.toLowerCase()))
    );
  };

  const projectRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    setIsOpenEditToDo(!isOpenEditToDo);
  };

  return (
    <div className="pl-5 border-b-1 py-5" ref={projectRef}>
      <div className="flex items-center justify-between pr-5">
        <div className="flex gap-5 cursor-pointer" onClick={handleClick}>
          <ArrowDownIcon
            className={`w-6 h-6 ${isOpenEditToDo ? "" : "-rotate-90"}`}
          />
          <p>{project.name}</p>
        </div>
        <div className="flex gap-5">
          <button className="focus:outline-none hover:scale-110 transition-transform">
            <PlusIcon
              className="w-8 h-8 text-green-500 cursor-pointer"
              onClick={() => {
                setIsOpenAddTask(!isOpenAddTask);
              }}
            />
          </button>
          <button className="focus:outline-none hover:scale-110 transition-transform">
            <PencilSquareIcon
              className="w-8 h-8 text-blue-500 cursor-pointer"
              onClick={() => {
                setIsOpenEditProject(!isOpenEditProject);
              }}
            />
          </button>
          <button className="focus:outline-none hover:scale-110 transition-transform">
            <TrashIcon
              className="w-8 h-8 text-red-500 cursor-pointer"
              onClick={() => deleteProject(project.id)}
            />
          </button>
        </div>
      </div>
      <div className={`pl-5 pt-5 ${isOpenEditToDo ? "" : "hidden"}`}>
        {project.tasks.map((task, idx) => {
          if (!checkQuery(task)) return null;

          return (
            <ToDoItem
              key={idx}
              task={task}
              deleteTask={deleteTask}
              updateTask={updateTask}
            />
          );
        })}
      </div>

      {isOpenEditProject && (
        <EditProjectModal
          item={project}
          onClose={() => setIsOpenEditProject(false)}
          onSave={updateProject}
        />
      )}

      {isOpenAddTask && (
        <EditToDoModal
          item={{
            name: "",
            deadline: "",
            description: "",
            priority: 0,
            tags: [],
            id: 0,
          }}
          onClose={() => setIsOpenAddTask(false)}
          onSave={(task) => {
            addTaskToProject(project.id, task);
            setIsOpenAddTask(false);
          }}
        />
      )}
    </div>
  );
};
