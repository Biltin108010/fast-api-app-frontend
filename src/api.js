import axios from "axios";

const API_URL = "https://fastapi-app-iscc.onrender.com/api/tasks";

// Get all tasks (with optional search)
export const getTasks = async (search = "") => {
  try {
    const response = await axios.get(`${API_URL}?search=${search}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
  }
};

// Add a new task
export const addTask = async (task) => {
  try {
    const response = await axios.post(API_URL, task);
    return response.data;
  } catch (error) {
    console.error("Error adding task:", error);
  }
};

// Update an existing task by ID
export const updateTask = async (id, task) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, task);
    return response.data;
  } catch (error) {
    console.error("Error updating task:", error);
  }
};

// Delete a task by ID
export const deleteTask = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error("Error deleting task:", error);
  }
};
