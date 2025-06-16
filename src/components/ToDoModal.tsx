import { useState, type FC } from "react";
import type { ToDoItemDataProps } from "./List/ToDoItem";

export const EditToDoModal: FC<{
  onClose: () => void;
  item: ToDoItemDataProps;
  onSave: (updated: ToDoItemDataProps) => void;
}> = ({ onClose, item, onSave }) => {
  const [form, setForm] = useState(item);

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg min-w-[300px]">
        <h2 className="text-lg font-bold mb-4">Edit Task</h2>
        <input
          className="border p-2 mb-2 w-full"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Name"
        />
        <input
          className="border p-2 mb-2 w-full"
          value={form.deadline}
          onChange={(e) => setForm({ ...form, deadline: e.target.value })}
          placeholder="Deadline"
        />
        <textarea
          className="border p-2 mb-2 w-full"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          placeholder="Description"
        />
        <input
          className="border p-2 mb-2 w-full"
          value={form.tags.join(",")}
          onChange={(e) =>
            setForm({ ...form, tags: e.target.value.split(",") })
          }
          placeholder="Tags (comma separated)"
        />
        <input
          className="border p-2 mb-4 w-full"
          type="number"
          value={form.priority}
          onChange={(e) =>
            setForm({ ...form, priority: Number(e.target.value) })
          }
          placeholder="Priority"
        />
        <div className="flex justify-end gap-2">
          <button className="px-4 py-2 bg-gray-200 rounded" onClick={onClose}>
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={() => {
              onSave(form);
              onClose();
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
