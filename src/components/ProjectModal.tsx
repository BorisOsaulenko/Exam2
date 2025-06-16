import { useState, type FC } from "react";
import type { ProjectProps } from "./List/Project";

export const EditProjectModal: FC<{
  onClose: () => void;
  item: ProjectProps;
  onSave: (updated: ProjectProps) => void;
}> = ({ onClose, item, onSave }) => {
  const [form, setForm] = useState(item);

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg min-w-[200px]">
        <h2 className="text-lg font-bold mb-4">Edit Project</h2>
        <input
          className="border p-2 mb-2 w-full"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Name"
        />
        <input
          className="border p-2 mb-2 w-full"
          value={form.priority}
          onChange={(e) =>
            setForm({ ...form, priority: Number(e.target.value) })
          }
          placeholder="Priority"
        />
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
          onClick={() => {
            onSave(form);
            onClose();
          }}
        >
          Save
        </button>
        <button
          className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded ml-2"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};
