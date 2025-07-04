import React, { useState, useEffect } from 'react';
import axios from 'axios';

// API endpoints and token
const API_URL = 'https://edu-master-delta.vercel.app/admin/all-user';
const ALL_ADMINS_URL = 'https://edu-master-delta.vercel.app/admin/all-admin';
const CREATE_ADMIN_URL = 'https://edu-master-delta.vercel.app/admin/create-admin';
const TOKEN = localStorage.getItem('token');

const AllUsersComponent = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    password: 'MyAdmin@1234',
    cpassword: 'MyAdmin@1234',
  });

  useEffect(() => {
    const fetchUsersAndAdmins = async () => {
      try {
        // Fetch regular users
        const usersResponse = await axios.get(API_URL, {
          headers: {
            token: TOKEN,
          },
        });
        const usersData = usersResponse.data.data || [];

        // Fetch admins
        const adminsResponse = await axios.get(ALL_ADMINS_URL, {
          headers: {
            token: TOKEN,
          },
        });
        const adminsData = adminsResponse.data.data || [];

        // Merge users and admins, ensuring no duplicates (based on _id or email)
        const mergedUsers = [...usersData, ...adminsData].reduce((unique, user) => {
          if (!unique.find(u => u._id === user._id || u.email === user.email)) {
            return [...unique, user];
          }
          return unique;
        }, []);

        setUsers(mergedUsers);
        setFilteredUsers(mergedUsers);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsersAndAdmins();
  }, []);

  // Filter users based on search term and selected role
  useEffect(() => {
    let result = [...users];

    if (searchTerm) {
      result = result.filter(user =>
        user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedRole !== 'all') {
      result = result.filter(user => user.role === selectedRole);
    }

    setFilteredUsers(result);
  }, [searchTerm, selectedRole, users]);

  // Function to add new admin
  const addNewAdmin = async (e) => {
    e.preventDefault();
    // Basic validation for phone number pattern
    const phonePattern = /^01[0-2,5][0-9]{8}$/;
    if (!phonePattern.test(newUser.phoneNumber)) {
      alert('Phone number must match the pattern: Start with 01 followed by 0, 1, 2, or 5, then 8 digits (e.g., 01012345678).');
      return;
    }
    if (newUser.password !== newUser.cpassword) {
      alert('Passwords do not match.');
      return;
    }
    try {
      const response = await axios.post(
        CREATE_ADMIN_URL,
        {
          fullName: newUser.fullName,
          email: newUser.email,
          phoneNumber: newUser.phoneNumber,
          password: newUser.password,
          cpassword: newUser.cpassword,
        },
        {
          headers: {
            token: TOKEN,
          },
        }
      );
      console.log('Admin added successfully:', response.data);
      // Refresh user list after successful creation
      const usersResponse = await axios.get(API_URL, {
        headers: {
          token: TOKEN,
        },
      });
      const adminsResponse = await axios.get(ALL_ADMINS_URL, {
        headers: {
          token: TOKEN,
        },
      });
      const usersData = usersResponse.data.data || [];
      const adminsData = adminsResponse.data.data || [];
      const mergedUsers = [...usersData, ...adminsData].reduce((unique, user) => {
        if (!unique.find(u => u._id === user._id || u.email === user.email)) {
          return [...unique, user];
        }
        return unique;
      }, []);
      setUsers(mergedUsers);
      setFilteredUsers(mergedUsers);
      setIsModalOpen(false); // Close modal after success
      setNewUser({ fullName: '', email: '', phoneNumber: '', password: 'MyAdmin@1234', cpassword: 'MyAdmin@1234' }); // Reset form
    } catch (err) {
      console.error('Error adding admin:', err.response ? err.response.data : err.message);
      alert(err.response ? `Failed to add admin: ${err.response.data.message}` : 'An unexpected error occurred.');
      throw new Error(err.message);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error}</div>;

  return (
    <div style={{ margin: '20px', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
      <h2 style={{ marginBottom: '20px', color: '#2c3e50', fontSize: '24px' }}>All Admins and Users</h2>

      {/* Search and Filter Controls */}
      <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px' }}>
        <div style={{ display: 'flex', gap: '10px' }}>
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '14px', width: '250px' }}
          />
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '14px', width: '150px' }}
          >
            <option value="all">All Roles</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          style={{ padding: '10px 20px', backgroundColor: '#2196F3', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '14px' }}
        >
          Add Admin
        </button>
      </div>

      {/* Users Table */}
      {filteredUsers.length > 0 ? (
        <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: '#fff', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
          <thead>
            <tr style={{ backgroundColor: '#ecf0f1' }}>
              <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left', color: '#34495e' }}>Full Name</th>
              <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left', color: '#34495e' }}>Email</th>
              <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left', color: '#34495e' }}>Class Level</th>
              <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left', color: '#34495e' }}>Role</th>
              <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left', color: '#34495e' }}>Phone Number</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user._id} style={{ border: '1px solid #ddd' }}>
                <td style={{ border: '1px solid #ddd', padding: '12px', color: '#2c3e50' }}>{user.fullName}</td>
                <td style={{ border: '1px solid #ddd', padding: '12px', color: '#2c3e50' }}>{user.email}</td>
                <td style={{ border: '1px solid #ddd', padding: '12px', color: '#2c3e50' }}>{user.classLevel}</td>
                <td style={{ border: '1px solid #ddd', padding: '12px', color: '#2c3e50' }}>{user.role}</td>
                <td style={{ border: '1px solid #ddd', padding: '12px', color: '#2c3e50' }}>{user.phoneNumber}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div style={{ padding: '20px', color: '#7f8c8d', textAlign: 'center' }}>No users or admins found.</div>
      )}

      {/* Modal for Adding New Admin */}
      {isModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <div style={{
            backgroundColor: '#fff',
            padding: '25px',
            borderRadius: '8px',
            width: '400px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
            margin: '20px',
          }}>
            <h3 style={{ marginBottom: '20px', color: '#2c3e50', fontSize: '20px', textAlign: 'center' }}>Add New Admin</h3>
            <form onSubmit={addNewAdmin}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', color: '#34495e', fontSize: '14px' }}>Full Name:</label>
                <input
                  type="text"
                  value={newUser.fullName}
                  onChange={(e) => setNewUser({ ...newUser, fullName: e.target.value })}
                  style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '14px' }}
                  required
                />
              </div>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', color: '#34495e', fontSize: '14px' }}>Email:</label>
                <input
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '14px' }}
                  required
                />
              </div>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', color: '#34495e', fontSize: '14px' }}>Phone Number:</label>
                <input
                  type="text"
                  value={newUser.phoneNumber}
                  onChange={(e) => setNewUser({ ...newUser, phoneNumber: e.target.value })}
                  style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '14px' }}
                  required
                  placeholder="e.g., 01012345678"
                />
              </div>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', color: '#34495e', fontSize: '14px' }}>Password:</label>
                <input
                  type="password"
                  value={newUser.password}
                  onChange={(e) => setNewUser({ ...newUser, password: e.target.value, cpassword: e.target.value })}
                  style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '14px' }}
                  required
                />
              </div>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', color: '#34495e', fontSize: '14px' }}>Confirm Password:</label>
                <input
                  type="password"
                  value={newUser.cpassword}
                  onChange={(e) => setNewUser({ ...newUser, cpassword: e.target.value })}
                  style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '14px' }}
                  required
                />
              </div>
              <div style={{ textAlign: 'right' }}>
                <button
                  type="submit"
                  style={{ padding: '12px 25px', backgroundColor: '#27ae60', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '14px', marginRight: '10px' }}
                >
                  Submit
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setNewUser({ fullName: '', email: '', phoneNumber: '', password: 'MyAdmin@1234', cpassword: 'MyAdmin@1234' });
                  }}
                  style={{ padding: '12px 25px', backgroundColor: '#e74c3c', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '14px' }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllUsersComponent;