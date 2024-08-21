import React, { useState } from "react";
import { useTodoStore } from "../store";
import { Todo } from "../types";
import { format } from "date-fns";
import { FiEdit, FiTrash2 } from "react-icons/fi";

interface TodoItemProps {
  todo: Todo;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);
  const [editedDescription, setEditedDescription] = useState(todo.description);
  const [editedDatetime, setEditedDatetime] = useState(todo.datetime);

  const updateTodo = useTodoStore((state) => state.updateTodo);
  const deleteTodo = useTodoStore((state) => state.deleteTodo);
  const toggleTodoCompletion = useTodoStore(
    (state) => state.toggleTodoCompletion,
  );

  const handleUpdate = () => {
    updateTodo(todo.id, {
      title: editedTitle,
      description: editedDescription,
      datetime: editedDatetime,
    });
    setIsEditing(false);
  };

  return (
    <div
      className={`p-4 mb-4 rounded-lg shadow-md ${
        todo.completed
          ? "bg-primary/10 dark:bg-primary/10"
          : "bg-lightBg dark:bg-darkBg"
      } group relative border border-transparent hover:border-primary dark:hover:border-primary transition-all duration-300`}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => toggleTodoCompletion(todo.id)}
            className="mr-2"
          />
          <h3
            className={`text-lg font-semibold dark:text-white ${
              todo.completed
                ? "line-through text-gray-500 dark:text-gray-400"
                : ""
            }`}
          >
            {todo.title}
          </h3>
        </div>
        <div className="absolute top-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={() => setIsEditing(true)}
            className="text-blue-500 dark:text-blue-300 hover:text-blue-600 dark:hover:text-blue-400"
          >
            <FiEdit />
          </button>
          <button
            onClick={() => deleteTodo(todo.id)}
            className="text-red-500 dark:text-red-300 hover:text-red-600 dark:hover:text-red-400"
          >
            <FiTrash2 />
          </button>
        </div>
      </div>
      {isEditing ? (
        <div>
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="w-full p-2 mb-2 border rounded dark:bg-gray-700 dark:text-white"
          />
          <textarea
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            className="w-full p-2 mb-2 border rounded dark:bg-gray-700 dark:text-white"
          />
          <input
            type="datetime-local"
            value={editedDatetime}
            onChange={(e) => setEditedDatetime(e.target.value)}
            className="w-full p-2 mb-2 border rounded dark:bg-gray-700 dark:text-white"
          />
          <div className="flex justify-end mt-2">
            <button
              onClick={handleUpdate}
              className="px-4 py-2 mr-2 text-white bg-green-500 rounded hover:bg-green-600"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 text-white bg-gray-500 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="mt-2 text-gray-600 dark:text-gray-300">
          <p className="mb-1">{todo.description}</p>
          <p className="text-sm mb-1">
            {format(new Date(todo.datetime), "PPpp")}
          </p>
          <p className="text-sm font-semibold">
            {todo.completed ? "Completed" : "Pending"}
          </p>
        </div>
      )}
    </div>
  );
};

export default TodoItem;
