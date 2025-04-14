import { useState, useEffect } from "react";
import "./App.css";
import { getTasks, addTask, updateTask, deleteTask } from "./api";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);
  

  //testaetsedas


  useEffect(() => {
    fetchTasks();
  }, [searchTerm]);

  const fetchTasks = async () => {
    const data = await getTasks(searchTerm);
    setTasks(data);
  };

  const handleAddTask = async () => {
    if (newTask.trim() === "") return;
    const newTaskData = { title: newTask, description: "", completed: false };
    await addTask(newTaskData);
    setNewTask("");
    fetchTasks(); // Refresh task list
  };

  const toggleComplete = async (id, completed) => {

    const task = tasks.find((task) => task.id === id);
    
    if (task) {

      const updatedTask = {
        ...task,  
        completed: !completed,
      };
  

      await updateTask(id, updatedTask);
      fetchTasks();
    }
  };

  const startEditing = (id, text) => {
    setEditId(id);
    setEditText(text);
  };

  const saveEdit = async (id) => {
    await updateTask(id, { title: editText });
    setEditId(null);
    fetchTasks();
  };

  const handleDeleteTask = async (id) => {
    await deleteTask(id);
    fetchTasks();
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  return (
    <div className={darkMode ? "dark-mode" : "light-mode"}>
      <div className="container">
        <h1>To-Do List</h1>
        <button onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
        <button onClick={() => (window.location.href = "https://biltin108010.github.io/Portfolio/")}>
          Go back home
        </button>
        
        {/* Search bar */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div>
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add a new task"
          />
          <button onClick={handleAddTask}>Add Task</button>
        </div>
        <div>
          <button onClick={() => setFilter("all")}>All</button>
          <button onClick={() => setFilter("completed")}>Completed</button>
          <button onClick={() => setFilter("pending")}>Pending</button>
        </div>
        <ul>
          {filteredTasks.map((task) => (
            <li key={task.id} className={task.completed ? "completed" : ""}>
              {editId === task.id ? (
                <>
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                  />
                  <button onClick={() => saveEdit(task.id)}>Save</button>
                </>
              ) : (
                <>
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleComplete(task.id, task.completed)}
                  />
                  <span>{task.title}</span>
                  <div className="task-actions">
                    <button onClick={() => startEditing(task.id, task.title)}>Edit</button>
                    <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div className="footer">
        <p>&copy; 2025 John Rhey R. Villanueva | All Rights Reserved</p>
      </div>
    </div>
  );
}
