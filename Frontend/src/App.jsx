import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Form from "./components/Form";
import ContactList from "./components/ContactList";
import SuccessPopup from "./components/SuccessPopup";

function App() {
  return (
    <div className="flex flex-col items-center w-auto">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">
        Contact Management App
      </h1>

      <Form />

      <ContactList />
    </div>
  );
}

export default App;
