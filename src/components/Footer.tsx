import { useState, type FC } from "react";
import { EditToDoModal } from "./ToDoModal";
import type { ToDoItemDataProps } from "./List/ToDoItem";
import { EditProjectModal } from "./ProjectModal";
import type { ProjectProps } from "./List/Project";

interface FooterProps {
  addTask: (task: ToDoItemDataProps) => void;
  addProject: (project: ProjectProps) => void;
}

export const Footer: FC<FooterProps> = ({ addTask, addProject }) => {
  const [openToDoModal, setOpenToDoModal] = useState(false);
  const [openProjectModal, setOpenProjectModal] = useState(false);

  return (
    <footer className="bg-gray-800 p-4 flex items-center absolute bottom-0 left-0 right-0 gap-8">
      <button
        className="text-white cursor-pointer"
        onClick={() => setOpenToDoModal(true)}
      >
        Create To-Do
      </button>
      <button
        className="text-white cursor-pointer"
        onClick={() => setOpenProjectModal(true)}
      >
        Create Project
      </button>

      {openToDoModal && (
        <EditToDoModal
          onClose={() => setOpenToDoModal(false)}
          item={{
            name: "",
            deadline: "",
            description: "",
            priority: 0,
            tags: [],
            id: 0,
          }}
          onSave={addTask}
        />
      )}

      {openProjectModal && (
        <EditProjectModal
          onClose={() => setOpenProjectModal(false)}
          item={{
            name: "",
            tasks: [],
            priority: 0,
            id: 0,
          }}
          onSave={addProject}
        />
      )}
    </footer>
  );
};
