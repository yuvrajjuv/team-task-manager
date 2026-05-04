import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [userId, setUserId] = useState("");

  const API = import.meta.env.VITE_API_URL;

  // GET TASKS
  const fetchTasks = async () => {
    const res = await axios.get(`${API}/api/tasks/${user._id}`);
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // CREATE TASK (ADMIN)
  const createTask = async () => {
    await axios.post(`${API}/api/tasks`, {
      title,
      description,
      assignedTo: userId
    });
    alert("Task created");
    fetchTasks();
  };

  // UPDATE STATUS
  const updateStatus = async (id) => {
    await axios.put(`${API}/api/tasks/${id}`, {
      status: "completed"
    });
    fetchTasks();
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Dashboard 🚀</h1>

      {user.role === "admin" && (
        <>
          <h3>Create Task</h3>
          <input
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
          /><br />

          <input
            placeholder="Description"
            onChange={(e) => setDescription(e.target.value)}
          /><br />

          <input
            placeholder="Assign User ID"
            onChange={(e) => setUserId(e.target.value)}
          /><br /><br />

          <button onClick={createTask}>Create Task</button>
        </>
      )}

      <h3>Your Tasks</h3>
      {tasks.map(task => (
        <div key={task._id}>
          <p>{task.title} - {task.status}</p>
          {task.status === "pending" && (
            <button onClick={() => updateStatus(task._id)}>
              Mark Complete
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

export default Dashboard;