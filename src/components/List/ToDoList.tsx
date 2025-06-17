import type { FC } from "react";

import { Project, type ProjectProps } from "./Project";
import { ToDoItem } from "./ToDoItem";
import type { ToDoItemDataProps } from "./ToDoItem";
import { useQuery } from "../Header/QueryContext";

interface ToDoListProps {
  tasks: (ToDoItemDataProps | ProjectProps)[];
  deleteTask: (id: number) => void;
  updateTask: (task: ToDoItemDataProps) => void;
  deleteProject: (id: number) => void;
  updateProject: (project: ProjectProps) => void;
  addTaskToProject: (projectId: number, task: ToDoItemDataProps) => void;
}

export const ToDoList: FC<ToDoListProps> = ({
  tasks,
  deleteTask,
  updateTask,
  deleteProject,
  updateProject,
  addTaskToProject,
}) => {
  const { query } = useQuery();

  const queryCheck = (data: ToDoItemDataProps | ProjectProps) => {
    const lookingFor = query.split(" ");

    if ("tasks" in data) {
      return data.tasks.find((t) =>
        lookingFor.every(
          (q) =>
            t.name.toLowerCase().includes(q.toLowerCase()) ||
            t.description.toLowerCase().includes(q.toLowerCase()) ||
            t.tags.some((t) => t.toLowerCase().includes(q.toLowerCase()))
        )
      );
    } else {
      return lookingFor.every(
        (q) =>
          data.name.toLowerCase().includes(q.toLowerCase()) ||
          data.description.toLowerCase().includes(q.toLowerCase()) ||
          data.tags.some((t) => t.toLowerCase().includes(q.toLowerCase()))
      );
    }
  };

  return (
    <div>
      {tasks.map((task: ToDoItemDataProps | ProjectProps) => {
        if (query && !queryCheck(task)) {
          return null;
        }

        if ("tasks" in task) {
          return (
            <Project
              key={task.id}
              project={task}
              deleteTask={deleteTask}
              updateTask={updateTask}
              deleteProject={deleteProject}
              updateProject={updateProject}
              addTaskToProject={addTaskToProject}
            />
          );
        } else {
          return (
            <ToDoItem
              key={task.id}
              task={task}
              deleteTask={deleteTask}
              updateTask={updateTask}
            />
          );
        }
      })}
    </div>
  );
};
