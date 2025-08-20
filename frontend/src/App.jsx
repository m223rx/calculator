import { useState } from "react";
import "./App.css";
import Navbar from "./components/navbar";
import { Phone } from "lucide-react";
import PhoneScreen from "./components/phone";

function App() {
  return <>
    <div className="h-screen w-screen">
      {/* <Navbar /> */}
      <div className="phone__container"><PhoneScreen /></div>

    </div>
  </>;
}

export default App;
