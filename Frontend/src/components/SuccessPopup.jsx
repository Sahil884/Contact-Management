import React from "react";

const SuccessPopup = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center  z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-80 text-center animate-fadeIn">
        {/* Success Icon */}
        <div className="flex justify-center mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-green-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        {/* Message */}
        <h2 className="text-lg font-semibold text-gray-800">Success!</h2>
        <p className="text-sm text-gray-600 mt-2">{message}</p>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default SuccessPopup;
