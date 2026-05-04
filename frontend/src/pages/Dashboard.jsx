import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  // get user from localStorage
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Dashboard 🚀</h1>

      <h2>Welcome, {user?.name || "User"} 👋</h2>

      <br />

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Dashboard;