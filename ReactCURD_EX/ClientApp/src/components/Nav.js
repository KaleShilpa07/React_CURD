import React, { useState, useEffect } from "react";
import { Link ,useNavigate} from "react-router-dom";
import axios from "axios";

const Nav = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [data, setData] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState("");
    const Navigate = useNavigate();
    useEffect(() => {
        // Check if user is logged in
        const userLoggedIn = localStorage.getItem("isLoggedIn");
        if (userLoggedIn === "true") {
            setIsLoggedIn(true);
            const storedUsername = localStorage.getItem("username");
            setUsername(storedUsername);
        }
    }, []);

    const handleSearch = () => {
        if (searchTerm.trim() !== "") {
            axios
                .get(`https://localhost:7195/api/home/search?searchterm=${searchTerm}`)
                .then((result) => {
                    setData(result.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            console.log("Search term cannot be empty");
        }
    };

    const logout = () => {
        // Perform logout logic
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("username");
        setIsLoggedIn(false);
        setUsername("");
        Navigate('/login')
    };

    return (
        <div>
            <nav className="navbar fixed-top navbar-expand-lg  navbar-dark bg-dark">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item"> <Link className="nav-link" to="/StudentCurd">Student Records</Link></li>
                            <li className="nav-item"> <Link className="nav-link" to="/Contact">Contact</Link></li>
                        </ul>
                        <input
                            style={{ width: "230px", height: "30px" }}
                            className="form-control"
                            type="search"
                            placeholder="Search here.."
                            aria-label="Search"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button className="btn btn-success btn-sm mx-1" type="submit" onClick={handleSearch}>
                            Search
                        </button>
                        {isLoggedIn ? (
                            <div className="d-flex align-items-center">
                                <span className="text-light mx-2" style={{ color: "white" }}>Welcome,{username}</span>
                                <button className="btn btn-primary btn-sm mx-1" onClick={logout}>Logout</button>
                            </div>
                        ) : (
                                <> <div className="d-flex align-items-center">
                                    <span className="text-light mx-2" style={{ color: "white" }}>Welcome, {username}</span>
                                    <button className="btn btn-primary btn-sm mx-1" onClick={logout}>Logout</button>
                                </div>
                                <Link className="btn btn-primary btn-sm mx-1" to="/SignUp" role="button">SignUp</Link>
                            </>
                        )}
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Nav;
