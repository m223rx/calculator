/*!
 * Calculator
 * Copyright (c) 2025 m223rx
 * All rights reserved.
 */

import { useState } from "react";
import "./App.css";
import Navbar from "./components/navbar";
import { Phone } from "lucide-react";
import PhoneScreen from "./components/phone";

function App() {
  return <>
    <div className="h-screen w-screen">
      {/* <Navbar /> */}
      <div className="phone__container relative">
        <PhoneScreen />
        <div className="about__container absolute left-0 top-0 bg-white p-4 rounded-r-lg w-64 shadow-lg">
          <p className="text-sm text-gray-800">
            <span className="text-[#0a2436] font-bold">Smart Calculator</span> is a small, modern calculator built with <span className="font-semibold">React</span>. It supports basic arithmetic operations, parentheses, and maintains a live calculation history for quick reference.
          </p>
          <p className="mt-2 text-sm text-gray-700">
            Designed with a clean, mobile-friendly interface, it demonstrates interactive functionality and efficient state management. Developed by <span className="font-bold">m223rx</span>.
          </p>
          <p className="mt-2 text-xs text-gray-500">
            &copy; 2025 m223rx. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  </>;
}

export default App;
