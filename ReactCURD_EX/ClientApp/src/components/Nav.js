import React from "react";
import { Link ,useNavigate} from "react-router-dom";


const Nav = () => {
  
    const Navigate = useNavigate();
    
    const logout = () => {

        Navigate('/')
        window.location.reload();
    };

    return (
        <div>
            <nav className="navbar fixed-top navbar-expand-lg  navbar-dark bg-dark" style={{ marginTop: '5px' }}>
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item"> <Link className="nav-link" to="/StudentCurd">Student Records</Link></li>
                            <li className="nav-item"> <Link className="nav-link" to="/Contact">Contact</Link></li>
                            <li className="nav-item"> <Link className="nav-link" to="/Navbar">News</Link></li>
                            <li className="nav-item"> <Link className="nav-link" to="/TextForm">TextEditor</Link></li>
                        </ul>
                           <> <div className="d-flex align-items-center">
                                   
                                    <button className="btn btn-primary btn-sm mx-1" onClick={logout}>Logout</button>
                                </div>
                                     </>
                     
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Nav;
