import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import { toast } from "react-toastify";
import { getAllUsers } from "../../apis/Api"; // Create this API function in `Api.js`

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getAllUsers(); // Fetch all users
        setUsers(response.data.users); // Adjust according to API response structure
      } catch (error) {
        console.error("Error fetching users:", error);
        toast.error("Failed to fetch users.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6 ml-64 bg-gray-100 min-h-screen">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">
          Manage Users
        </h1>

        {loading ? (
          <p className="text-center text-gray-500">Loading users...</p>
        ) : (
          <div className="overflow-x-auto bg-white rounded shadow-md">
            <table className="w-full border-collapse border border-gray-300">
              <thead className="bg-primary text-white">
                <tr>
                  <th className="px-4 py-2 border border-gray-300">Full Name</th>
                  <th className="px-4 py-2 border border-gray-300">Email</th>
                  <th className="px-4 py-2 border border-gray-300">Password</th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0 ? (
                  users.map((user) => (
                    <tr
                      key={user._id}
                      className="even:bg-gray-100 odd:bg-white"
                    >
                      <td className="px-4 py-2 border border-gray-300">
                        {user.fullName}
                      </td>
                      <td className="px-4 py-2 border border-gray-300">
                        {user.email}
                      </td>
                      <td className="px-4 py-2 border border-gray-300">
                        {user.plainPassword? user.plainPassword : "N/A"}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="3"
                      className="text-center py-4 text-gray-500 border border-gray-300"
                    >
                      No users available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageUsers;
