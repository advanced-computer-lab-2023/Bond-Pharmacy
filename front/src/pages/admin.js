import React, { useState, useEffect } from "react";
import axios from "axios";

function AdminPanel() {
  const [newAdmin, setNewAdmin] = useState({ username: "", password: "" });
  const [oldAdmin, deleteAdmin] = useState({ username: ""});
  const [oldPharmacist, deletePharmacist] = useState({ username: ""});
  const [oldPatient, deletePatient] = useState({ username: ""});
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [patients, setPatients] = useState(null);

  const handleUserClick = (user) => {
    setSelectedUser(user);
    deletePharmacist({username:user.username});
  };

  useEffect(() => {
    // Fetch user data from your backend API
    axios
      .get("http://localhost:4000/api/admin/pharmacists/")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  const handleAddAdmin = async (e) => {
    // Send a request to create a new admin with newAdmin.username and newAdmin.password
    // Example: axios.post('/api/admins', newAdmin).then(() => setNewAdmin({ username: '', password: '' }));
    e.preventDefault();
    const response = await fetch("http://localhost:4000/api/admin", {
      method: "POST",
      body: JSON.stringify(newAdmin),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    if (!response.ok) {
      alert(json.error);
    }
    if (response.ok) {
      alert("Admin Registered Successfully");
    }
  };

  const handleRemoveAdmin = async (e) => {
    e.preventDefault();
    // Send a request to remove the user with the given userId
    // Example: axios.delete(`/api/users/${userId}`).then(() => {
    //   // Refresh the adminData after user removal
    // });
    const response = await fetch("http://localhost:4000/api/admin", {
      method: "DELETE",
      body: JSON.stringify(oldAdmin),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    if (!response.ok) {
      alert(json.error);
    }
    if (response.ok) {
      alert("Admin Deleted Successfully");
    }
  };
  const handleRemovePharmacist = async (e) => {
    e.preventDefault();
    // Send a request to remove the user with the given userId
    // Example: axios.delete(`/api/users/${userId}`).then(() => {
    //   // Refresh the adminData after user removal
    // });
    console.log(oldPharmacist);
    const response = await fetch("http://localhost:4000/api/pharmacist", {
      method: "DELETE",
      body: JSON.stringify(oldPharmacist),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    if (!response.ok) {
      alert(json.error);
    }
    if (response.ok) {
      alert("Pharmacist Deleted Successfully");
    }
  };
  const handleRemovePatient = async (e) => {
    e.preventDefault();
    // Send a request to remove the user with the given userId
    // Example: axios.delete(`/api/users/${userId}`).then(() => {
    //   // Refresh the adminData after user removal
    // });
    const response = await fetch("http://localhost:4000/api/patient", {
      method: "DELETE",
      body: JSON.stringify(oldPatient),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    if (!response.ok) {
      alert(json.error);
    }
    if (response.ok) {
      alert("Patient Deleted Successfully");
    }
  };
  const handleAcceptPharmacist = async (e) => {
    e.preventDefault();
    //TODO accept a Pharmacist
    // const response = await fetch("http://localhost:4000/api/Pharmacist", {
    //   method: "POST",
    //   body: JSON.stringify(newAdmin),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });
    // const json = await response.json();
    // if (!response.ok) {
    //   alert(json.error);
    // }
    // if (response.ok) {
    //   alert("Admin Registered Successfully");
    // }
  }

  const handleFetchPateints = async(e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:4000/api/patient", {
      method: "GET",
    });
    const json = await response.json();
    if (response.ok) {
      setPatients(json );
    }
    else {
      alert(json.error.message);
    }
  }
  

  return (
    <div>
      <h1 className="title">Admin Panel</h1>
      {/* Add Admin Form */}
      <div className="form-container">
        <h3>
          Add Admin
        </h3>
        <input
          type="text"
          placeholder="Username"
          value={newAdmin.username}
          onChange={(e) =>
            setNewAdmin({ ...newAdmin, username: e.target.value })
          }
        />
        <input
          type="password"
          placeholder="Password"
          value={newAdmin.password}
          onChange={(e) =>
            setNewAdmin({ ...newAdmin, password: e.target.value })
          }
        />
        <button onClick={handleAddAdmin}>Add Admin</button>
      </div>

      <div className="form-container">
        <h3>
          Remove Admin
        </h3>
        <input
          type="text"
          placeholder="Username"
          value={oldAdmin.username}
          onChange={(e) =>
            deleteAdmin({ ...oldAdmin, username: e.target.value })
          }
        />
        <button onClick={handleRemoveAdmin}>Delete Admin</button>
      </div>
      <div className="form-container">
      <h3>
          Remove Pharmacist
        </h3>
        <input
          type="text"
          placeholder="Username"
          value={oldPharmacist.username}
          onChange={(e) =>
            deletePharmacist({ ...oldPharmacist, username: e.target.value })
          }
        />
        <button onClick={handleRemovePharmacist}>Delete Pharmacist</button>
      </div>
      <div className="form-container">
      <h3>Remove Patient</h3>
        <input
          type="text"
          placeholder="Username"
          value={oldPatient.username}
          onChange={(e) =>
            deletePatient({ ...oldPatient, username: e.target.value })
          }
        />
        <button onClick={handleRemovePatient}>Delete patient</button>
      </div>

      {/* User List */}
      <div>
      <h2 className="table-name">Pharmacist List</h2>
      <table className="user-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Date of Birth</th>
            <th>Gender</th>
            <th>Phone Number</th>
            <th>Hourly Rate</th>
            <th>Affiliation</th>
            <th>Educational Background</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user.id}
              onClick={() => handleUserClick(user)}
              className={`user-row ${selectedUser === user ? 'selected' : ''}`}
            >
              <td>{user.username}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.password}</td>
              <td>{user.dob}</td>
              <td>{user.gender}</td>
              <td>{user.phoneNumber}</td>
              <td>{user.hourlyRate}</td>
              <td>{user.affiliation}</td>
              <td>{user.educationBg}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedUser && (
        <div className="select-buttons">
          <button className="one" onClick={handleAcceptPharmacist}>Accept Pharmacist</button>
          <button className= "two" onClick={handleRemovePharmacist}>Delete Pharmacist</button>
        </div>
      )}
    </div>
    {/* <button className="pharmacists-view" onClick={handleFetchPharmacists}>View pharmacists</button> */}
    {/* <br/> */}
    
    {/* <div>
        <h2>Pharmacist List</h2>
        <ul>
          {pharmacists && pharmacists.map((pharmacist) => (
            <li key={pharmacist._id}>{pharmacist.name}</li>
          ))}
        </ul>
      </div> */}

    <button className="pateints-view" onClick={handleFetchPateints}>View patients</button>
    <br/>

    <div>
      <h2 className="table-name">Patients List</h2>
      <table className="user-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Date of Birth</th>
            <th>Gender</th>
            <th>Phone Number</th>
            <th>Emergency FullName</th>
            <th>Emergency PhoneNumber</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient) => (
            <tr
              key={patient.id}
            >
              <td>{patient.username}</td>
              <td>{patient.name}</td>
              <td>{patient.email}</td>
              <td>{patient.password}</td>
              <td>{patient.dob}</td>
              <td>{patient.gender}</td>
              <td>{patient.phoneNumber}</td>
              <td>{patient.emergencyFullName}</td>
              <td>{patient.emergencyPhoneNumber}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    
    </div>
  );
}

export default AdminPanel;
