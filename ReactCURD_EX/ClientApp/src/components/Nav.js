import React ,{useState } from "react";
import { Link} from "react-router-dom";
import DrawerMenu from './DrawerMenu'; // Make sure to import your DrawerMenu 

import MenuIcon from '@mui/icons-material/Menu'; // Import the Menu icon from Material-UI Icons
import CloseIcon from '@mui/icons-material/Close'; // Import the Close icon from Material-UI Icons

const Nav = () => 

     {
        const [drawerOpen, setDrawerOpen] = useState(false);

        const toggleDrawer = () => {
            setDrawerOpen(!drawerOpen);
        };
    return (
        <div>
            <nav className="navbar fixed-top navbar-expand-lg  navbar-dark bg-dark" style={{ marginTop: '0px' }}>
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item"> <Link className="nav-link" to="/StudentCurd">Student Records</Link></li>
                            <li className="nav-item"> <Link className="nav-link" to="/Navbar">News</Link></li>
                            <li className="nav-item"> <Link className="nav-link" to="/TextForm">TextEditor</Link></li>
                            {/*<li className="nav-item"> <Link className="nav-link" to="/Contact">Contact</Link></li>*/}
                          </ul>
                        {/* Toggle icon */}
                        <button onClick={toggleDrawer}>
                            {drawerOpen ? <CloseIcon/> : <MenuIcon />}
                        </button>
                        {/* Drawer menu */}
                        <DrawerMenu open={drawerOpen} onClose={toggleDrawer} />

                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Nav;
