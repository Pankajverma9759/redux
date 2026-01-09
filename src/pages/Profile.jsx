import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
//import "./Profile.css";

export default function Profile() {
  const navigate = useNavigate();
  const storedUser = JSON.parse(localStorage.getItem("currentUser"));

  if (!storedUser) {
    navigate("/login");
    return null;
  }

  const [user, setUser] = useState(storedUser);

  // IMAGE UPLOAD
  const handleImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const updatedUser = { ...user, avatar: reader.result };
      setUser(updatedUser);
      localStorage.setItem("currentUser", JSON.stringify(updatedUser));

      // update users list also
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const updatedUsers = users.map(u =>
        u.id === user.id ? updatedUser : u
      );
      localStorage.setItem("users", JSON.stringify(updatedUsers));
    };

    reader.readAsDataURL(file);
  };

  // LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/");
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <img
          src={user.avatar || "https://via.placeholder.com/150"}
          alt="Avatar"
          className="avatar"
        />

        <input type="file" onChange={handleImage} />

        <h2>{user.name}</h2>
        <p>Email: {user.email}</p>
        <p>Mobile: {user.mobile}</p>
        <p>DOB: {user.dob}</p>
        <p>Address: {user.address}</p>

        <button className="logout-btn" onClick={handleLogout}>
          Sign Out
        </button>
      </div>
    </div>
  );
}
