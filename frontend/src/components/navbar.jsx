import React, { useState } from 'react'
import { Settings, Moon } from 'lucide-react';

export default function Navbar() {
    const [darkMode, setDarkMode] = useState(false);
    const [settingsOpen, setSettingsOpen] = useState(false);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);

        // document.documentElement.classList.toggle('dark', !darkMode);
        console.log(darkMode)
    };

    const toggleSettings = () => {
        setSettingsOpen(!settingsOpen);
        console.log(settingsOpen)
    };

    return (
        <nav>
            <div className="flex justify-between items-center p-4 text-black mx-20 py-4 rounded-lg shadow-lg my-4 bg-white">
                <div className="text-lg font-bold">Smart Calculator</div>
                <div className="space-x-4 flex items-center">
                    <button className='border-none cursor-pointer' onClick={() => toggleSettings()}><Settings /></button>
                    <button className='border-none cursor-pointer' onClick={() => toggleDarkMode()}><Moon /></button>
                </div>
            </div>
        </nav>
    )
}
