import React, { useEffect, useState } from "react";
import { useTodoStore } from "./store";
import TodoItem from "./components/TodoItem";
import TodoFormModal from "./components/TodoFormModal";
import { FiSearch, FiPlus, FiSun, FiMoon, FiChevronDown } from "react-icons/fi";
import NoTasks from "./assets/NoTasks.svg";

const App: React.FC = () => {
  const todos = useTodoStore((state) => state.todos);
  const [filter, setFilter] = useState<"all" | "completed" | "pending">("all");
  const [sortBy, setSortBy] = useState<"date" | "title">("date");
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("darkMode") === "true",
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("darkMode", darkMode.toString());
  }, [darkMode]);

  const handleDarkModeToggle = () => {
    setDarkMode((prev) => !prev);
  };

  const filteredTodos = todos
    .filter((todo) => {
      if (filter === "all") return true;
      if (filter === "completed") return todo.completed;
      if (filter === "pending") return !todo.completed;
      return true;
    })
    .filter((todo) =>
      todo.title.toLowerCase().includes(searchQuery.toLowerCase()),
    );

  const sortedTodos = [...filteredTodos].sort((a, b) => {
    if (sortBy === "date") {
      return new Date(b.datetime).getTime() - new Date(a.datetime).getTime();
    } else {
      return a.title.localeCompare(b.title);
    }
  });

  return (
    <div className="container max-w-3xl p-4 mx-auto bg-lightBg dark:bg-darkBg text-gray-800 dark:text-white">
      <h1 className="mb-4 text-3xl font-bold text-center">Todo List</h1>
      <div className="flex items-center mb-4">
        <div className="relative flex items-center w-full">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tasks by title..."
            className="w-full p-2 pl-10 border rounded bg-lightBg dark:border-primary dark:bg-darkBg dark:text-white"
          />
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">
            <FiSearch />
          </div>
        </div>

        <button
          onClick={handleDarkModeToggle}
          className="ml-2 p-2 border rounded dark:border-primary bg-primary dark:bg-darkBg text-white"
        >
          {darkMode ? <FiSun /> : <FiMoon />}
        </button>
      </div>

      <div className="flex items-center justify-end mb-4">
        {/* Filter Dropdown */}
        <div className="relative inline-block text-left mr-2 group">
          <button
            type="button"
            className="inline-flex justify-center w-full rounded-md bg-primary text-white px-3 py-2 text-sm font-semibold shadow-sm hover:bg-primary/90"
            id="filter-menu-button"
            aria-expanded="true"
            aria-haspopup="true"
          >
            Filter: {filter.charAt(0).toUpperCase() + filter.slice(1)}
            <FiChevronDown className="ml-1" />
          </button>
          <div className="absolute right-0 z-10 mt-2 w-36 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="py-1" role="none">
              <button
                className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                role="menuitem"
                onClick={() => setFilter("all")}
              >
                All
              </button>
              <button
                className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                role="menuitem"
                onClick={() => setFilter("completed")}
              >
                Completed
              </button>
              <button
                className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                role="menuitem"
                onClick={() => setFilter("pending")}
              >
                Pending
              </button>
            </div>
          </div>
        </div>

        {/* Sort Dropdown */}
        <div className="relative inline-block text-left group">
          <button
            type="button"
            className="inline-flex justify-center w-full rounded-md bg-primary text-white px-3 py-2 text-sm font-semibold shadow-sm hover:bg-primary/90"
            id="sort-menu-button"
            aria-expanded="true"
            aria-haspopup="true"
          >
            Sort by: {sortBy.charAt(0).toUpperCase() + sortBy.slice(1)}
            <FiChevronDown className="ml-1" />
          </button>
          <div className="absolute right-0 z-10 mt-2 w-36 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="py-1" role="none">
              <button
                className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                role="menuitem"
                onClick={() => setSortBy("date")}
              >
                Date
              </button>
              <button
                className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                role="menuitem"
                onClick={() => setSortBy("title")}
              >
                Title
              </button>
            </div>
          </div>
        </div>
      </div>

      {sortedTodos.length === 0 ? (
        <div className="flex flex-col items-center">
          <img src={NoTasks} alt="No tasks found" className="w-48 h-48" />
          <p className="mt-4 text-gray-500 dark:text-gray-400">
            No tasks found
          </p>
        </div>
      ) : (
        sortedTodos.map((todo) => <TodoItem key={todo.id} todo={todo} />)
      )}
      <button
        className="fixed p-4 text-white bg-primary rounded-full shadow-lg bottom-8 right-8 hover:bg-primary/75"
        onClick={() => setShowModal(true)}
      >
        <FiPlus />
      </button>
      {showModal && <TodoFormModal onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default App;
