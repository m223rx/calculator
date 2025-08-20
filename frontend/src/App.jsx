/*!
 * Calculator
 * Copyright (c) 2025 m223rx
 * All rights reserved.
 */

import "./App.css";
import { X } from "lucide-react";
import Navbar from "./components/navbar";
import { useState, useEffect } from "react";
import PhoneScreen from "./components/phone";

function usePlatform() {
  const [platform, setPlatform] = useState("Unknown");

  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    if (/android/.test(userAgent)) setPlatform("Mobile");
    else if (/iphone|ipad|ipod/.test(userAgent)) setPlatform("Mobile");
    else if (navigator.platform.toLowerCase().includes("win")) setPlatform("Windows");
    else if (navigator.platform.toLowerCase().includes("mac")) setPlatform("MacOS");
    else if (navigator.platform.toLowerCase().includes("linux")) setPlatform("Linux");
  }, []);

  return platform;
}

function App() {
  const platform = usePlatform();
  const [showDialogue, setShowDialogue] = useState(true);

  return (
    <div className="h-screen w-screen relative">
      {/* <Navbar /> */}
      <div className="phone__container relative">
        <PhoneScreen />
        {showDialogue && (
          <div
            className={`about__container absolute flex flex-col bg-white p-4 rounded-r-lg w-64 shadow-lg 
              ${platform === "Mobile" ? "bottom-0 left-0 rounded-r-lg" : "left-0 top-0"}`}
          >
            {platform === "Mobile" && (
              <div className="close__dialogue__container flex justify-end">
                <button
                  className="text-[#0a2436] cursor-pointer"
                  onClick={() => setShowDialogue(false)}
                >
                  <X />
                </button>
              </div>
            )}
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
        )}
      </div>
    </div>
  );
}

export default App;
