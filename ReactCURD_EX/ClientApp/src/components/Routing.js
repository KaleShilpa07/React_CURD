import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ContactStudent from "./ContactStudent";

import Nav from "./Nav";
import StudentCurd from "./StudentCurd";

const Routing = () => {
    return (
        <Router>
            <div>
                <Nav />
                <Routes>
                    <Route path="/" element={<StudentCurd />} />
                    <Route path="/Contact" element={<ContactStudent />} />
                 

                </Routes>
            </div>
        </Router>
    );
};

export default Routing;