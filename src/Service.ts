import { useEffect, useState } from "react";
import type { ToDoItemDataProps } from "./components/List/ToDoItem";
import type { ProjectProps } from "./components/List/Project";
import todos from "./data.json";

const sortTasks = (tasks: (ToDoItemDataProps | ProjectProps)[]) => {
  const t1 = [...tasks].sort((a, b) => b.priority - a.priority);

  return t1.map(
    (t: ToDoItemDataProps | ProjectProps): ToDoItemDataProps | ProjectProps => {
      if ("tasks" in t) {
        return { ...t, tasks: sortTasks(t.tasks) as ToDoItemDataProps[] };
      } else {
        return t;
      }
    }
  );
};

export function useTasks() {
  const [tasks, setTasks] = useState<(ToDoItemDataProps | ProjectProps)[]>(
    () => {
      const local = localStorage.getItem("tasks");
      if (local && local.length > 0) {
        return sortTasks(JSON.parse(local));
      } else {
        return sortTasks(todos);
      }
    }
  );

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task: ToDoItemDataProps) => {
    const taskWithId = { ...task, id: Date.now() };
    setTasks(sortTasks([...tasks, taskWithId]));
  };

  const addTaskToProject = (projectId: number, task: ToDoItemDataProps) => {
    const taskWithId = { ...task, id: Date.now() };
    setTasks(
      sortTasks(
        tasks.map((t) =>
          t.id === projectId
            ? { ...t, tasks: [...(t as ProjectProps).tasks, taskWithId] }
            : t
        )
      )
    );
  };

  const addProject = (project: ProjectProps) => {
    const projectWithId = { ...project, id: Date.now() };
    setTasks(sortTasks([...tasks, projectWithId]));
  };

  const deleteTask = (id: number) => {
    const t1 = [...tasks].map((t) => {
      if ("tasks" in t) {
        return {
          ...t,
          tasks: t.tasks.filter((tt) => tt.id !== id),
        };
      } else if (t.id === id) {
        return null;
      } else {
        return t;
      }
    });

    setTasks(sortTasks(t1.filter((t) => t !== null)));
  };

  const updateTask = (task: ToDoItemDataProps) => {
    setTasks(
      sortTasks(
        tasks.map((t) => {
          if ("tasks" in t) {
            return {
              ...t,
              tasks: t.tasks.map((tt) => (tt.id === task.id ? task : tt)),
            };
          } else if (t.id === task.id) {
            return task;
          } else {
            return t;
          }
        })
      )
    );
  };

  const updateProject = (project: ProjectProps) => {
    setTasks(sortTasks(tasks.map((t) => (t.id === project.id ? project : t))));
  };

  const deleteProject = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return {
    tasks,
    addTask,
    addProject,
    deleteTask,
    updateTask,
    updateProject,
    deleteProject,
    addTaskToProject,
  };
}
