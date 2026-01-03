import React, { useState } from "react";
import axios from "axios";
import Spinner from "./Spinner";
import SuccessPopup from "./SuccessPopup";

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

const Form = () => {
  const [enteredValue, setEnteredValue] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  function handleChange(identifier, value) {
    setEnteredValue((prevVal) => ({
      ...prevVal,
      [identifier]: value,
    }));
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/v1/contacts/create`,
        {
          name: enteredValue.name,
          email: enteredValue.email,
          phone: enteredValue.phone,
          message: enteredValue.message,
        }
      );

      setEnteredValue({
        name: "",
        email: "",
        phone: "",
        message: "",
      });

      console.log("Contact created successfully", response);
      setShowPopup(true);
    } catch (error) {
      console.error("Contact can't be created ", error);
    } finally {
      setLoading(false);
    }
  };

  const isFormValid =
    enteredValue.name.trim() !== "" &&
    enteredValue.phone.trim() !== "" &&
    isValidEmail(enteredValue.email);

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        id="contactForm"
        className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg md:max-w-3xl space-y-4 mx-auto"
      >
        {/* <!-- Name --> */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            required
            className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
            onChange={(event) => handleChange("name", event.target.value)}
            value={enteredValue.name}
          />
          <p id="nameError" className="text-red-500 text-sm hidden">
            Name is required
          </p>
        </div>

        {/* <!-- Email --> */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Email</label>
          <input
            type="email"
            id="email"
            className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
            onChange={(event) => handleChange("email", event.target.value)}
            value={enteredValue.email}
          />
          <p id="emailError" className="text-red-500 text-sm hidden">
            Enter a valid email
          </p>
        </div>

        {/* <!-- Phone --> */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Phone <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            id="phone"
            required
            className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
            onChange={(event) => handleChange("phone", event.target.value)}
            value={enteredValue.phone}
          />
          <p id="phoneError" className="text-red-500 text-sm hidden">
            Phone is required
          </p>
        </div>

        {/* <!-- Message --> */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Message
          </label>
          <textarea
            id="message"
            className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
            onChange={(event) => handleChange("message", event.target.value)}
            value={enteredValue.message}
          ></textarea>
        </div>

        {/* <!-- Submit Button --> */}
        <button
          type="submit"
          disabled={!isFormValid}
          id="submitBtn"
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center cursor-pointer"
        >
          {loading ? <Spinner /> : "Submit"}
        </button>
      </form>

      {/* Success Popup */}
      {showPopup && (
        <SuccessPopup
          message="Your contact has been created successfully!"
          onClose={() => setShowPopup(false)}
        />
      )}
    </div>
  );
};

export default Form;
