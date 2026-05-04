import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignedTo, setAssignedTo] = useState("");

  const API = import.meta.env.VITE_API_URL;

  // FETCH TASKS
  const fetchTasks = async () => {
    const res = await axios.get(`${API}/api/tasks/${user._id}`);
    setTasks(res.data);
  };

  // FETCH USERS
  const fetchUsers = async () => {
    const res = await axios.get(`${API}/api/users`);
    setUsers(res.data);
  };

  useEffect(() => {
    fetchTasks();
    fetchUsers();
  }, []);

  // CREATE TASK
  const createTask = async () => {
    await axios.post(`${API}/api/tasks`, {
      title,
      description,
      assignedTo
    });

    alert("Task Created ✅");
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

          {/* ✅ DROPDOWN */}
          <select onChange={(e) => setAssignedTo(e.target.value)}>
            <option>Select User</option>
            {users.map(u => (
              <option key={u._id} value={u._id}>
                {u.name} ({u.role})
              </option>
            ))}
          </select>

          <br /><br />
          <button onClick={createTask}>Create Task</button>
        </>
      )}

      <h3>Your Tasks</h3>

      {tasks.map(task => (
        <div key={task._id}>
          <p>
            {task.title} - {task.status}
          </p>

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