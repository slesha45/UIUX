import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import { getAllContacts } from "../../apis/Api";
import { toast } from "react-toastify";

const ContactMessages = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await getAllContacts();
        setContacts(response.data.contacts);
      } catch (error) {
        console.error("Error fetching contact messages:", error);
        toast.error("Failed to fetch contact messages.");
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6 ml-64 bg-gray-100">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">
          Contact Messages
        </h1>
        {loading ? (
          <p className="text-center text-gray-500">Loading messages...</p>
        ) : contacts.length > 0 ? (
          <div className="w-full border border-gray-300 rounded-md">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-primary text-white">
                  <th className="px-4 py-2 border border-gray-300">First Name</th>
                  <th className="px-4 py-2 border border-gray-300">Last Name</th>
                  <th className="px-4 py-2 border border-gray-300">Email</th>
                  <th className="px-4 py-2 border border-gray-300">Message</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((contact) => (
                  <tr
                    key={contact._id}
                    className="even:bg-gray-100 odd:bg-white"
                  >
                    <td className="px-4 py-2 border border-gray-300">
                      {contact.firstName}
                    </td>
                    <td className="px-4 py-2 border border-gray-300">
                      {contact.lastName}
                    </td>
                    <td className="px-4 py-2 border border-gray-300">
                      {contact.email}
                    </td>
                    <td className="px-4 py-2 border border-gray-300">
                      {contact.message}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-gray-500">No contact messages found.</p>
        )}
      </div>
    </div>
  );
};

export default ContactMessages;
