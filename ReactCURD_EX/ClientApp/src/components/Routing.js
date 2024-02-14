import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ContactStudent from "./ContactStudent";
import Login from "./Login";
import Nav from "./Nav";
import SignUp from "./SignUp";
import StudentCurd from "./StudentCurd";

const Routing = () => {
    const [username, setUsername] = useState(""); // State to store the username

    // Function to set the username after successful login
    const handleLogin = (loggedInUsername) => {
        setUsername(loggedInUsername);
    };

    return (
        <Router>
            <div>
                {/* Pass username and handleLogin function to Nav component */}
                <Nav username={username} />
                <Routes>
                    <Route path="/StudentCurd" element={<StudentCurd />} />
                    <Route path="/Contact" element={<ContactStudent />} />
                    {/* Pass handleLogin function to Login component */}
                    <Route path="/" element={<Login handleLogin={handleLogin} />} />
                    <Route path="/Login" element={<Login handleLogin={handleLogin} />} />
                    <Route path="/SignUp" element={<SignUp />} />
                </Routes>
            </div>
        </Router>
    );
};

export default Routing;
