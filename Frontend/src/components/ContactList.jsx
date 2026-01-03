import React, { useCallback, useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

const ContactList = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/v1/contacts/get`);
        setContacts(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchContacts();
  }, [contacts]);

  const onDelete = async (id) => {
    try {
      const deleted = await axios.delete(
        `${API_BASE_URL}/api/v1/contacts/${id}`
      );

      if (!deleted) {
        console.error(400, "Contact Can't be deleted, something went wrong!");
      }

      const response = await axios.get(`${API_BASE_URL}/api/v1/contacts/get`);
      setContacts(response.data.data);

      console.log("Contact delted successfuly", deleted);
    } catch (error) {
      console.error("Contact not deleted", error);
    }
  };

  return (
    <div className="mt-10 w-full max-w-3xl mx-auto px-2 sm:px-4">
      <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-4 text-center sm:text-left">
        Saved Contacts
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg text-sm sm:text-base">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="py-2 px-2 sm:px-4 text-left">Name</th>
              <th className="py-2 px-2 sm:px-4 text-left">Email</th>
              <th className="py-2 px-2 sm:px-4 text-left">Phone</th>
              <th className="py-2 px-2 sm:px-4 text-left">Message</th>
              <th className="py-2 px-2 sm:px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody id="contactsTable" className="divide-y divide-gray-200">
            {/* Example row */}
            {contacts.map((contact) => (
              <tr key={contact._id} className="text-sm">
                <td className="py-2 px-2 sm:px-4">{contact.name}</td>
                <td className="py-2 px-2 sm:px-4">{contact.email}</td>
                <td className="py-2 px-2 sm:px-4">{contact.phone}</td>
                <td className="py-2 px-2 sm:px-4">{contact.message}</td>
                <td className="py-2 px-2 sm:px-4">
                  <button className="text-blue-600 hover:underline cursor-pointer text-lg">
                    <MdEdit />
                  </button>
                  <button
                    onClick={() => onDelete(contact._id)}
                    className="text-red-600 hover:underline ml-4 cursor-pointer text-lg "
                  >
                    <MdDelete />
                  </button>
                </td>
              </tr>
            ))}
            <tr className="text-sm">
              <td className="py-2 px-2 sm:px-4">Alice Johnson</td>
              <td className="py-2 px-2 sm:px-4">alice@example.com</td>
              <td className="py-2 px-2 sm:px-4">+91 9876543210</td>
              <td className="py-2 px-2 sm:px-4">Interested in collaboration</td>
              <td className="py-2 px-2 sm:px-4">
                <button className="text-blue-600 hover:underline cursor-pointer text-lg">
                  <MdEdit />
                </button>
                <button className="text-red-600 hover:underline ml-4 cursor-pointer text-lg ">
                  <MdDelete />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContactList;
