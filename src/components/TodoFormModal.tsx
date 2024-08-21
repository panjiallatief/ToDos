import React, { useState } from "react";
import { useTodoStore } from "../store";

interface TodoFormModalProps {
  onClose: () => void;
}

const TodoFormModal: React.FC<TodoFormModalProps> = ({ onClose }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [datetime, setDatetime] = useState("");
  const addTodo = useTodoStore((state) => state.addTodo);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      addTodo({ title, description, datetime, completed: false });
      setTitle("");
      setDescription("");
      setDatetime("");
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg dark:bg-darkBg dark:border-primary dark:border-2">
        <h2 className="mb-4 text-xl font-bold">Add New Task</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Todo title"
            className="w-full p-2 mb-2  border-b-2 border-primary dark:bg-darkBg dark:text-white"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Todo description"
            className="w-full p-2 mb-2  border-b-2 border-primary dark:bg-darkBg dark:text-white"
          />
          <input
            type="datetime-local"
            value={datetime}
            onChange={(e) => setDatetime(e.target.value)}
            className="w-full p-2 mb-2 border-b-2 border-primary dark:bg-darkBg dark:text-white"
          />
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 mr-2 text-white bg-red-600 rounded hover:bg-red-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-primary rounded hover:bg-primary/75"
            >
              Add Todo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TodoFormModal;
