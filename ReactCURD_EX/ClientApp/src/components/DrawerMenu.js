import React from 'react';
import { Drawer, List, ListItem, ListItemText,ListItemIcon } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import LogoutIcon from '@mui/icons-material/Logout';
const DrawerMenu = ({ open, onClose }) => {
    // I have use UseNavigate react-router-dom
    const navigate = useNavigate();

    const logout = () => {
        navigate('/');
        onClose();
        window.location.reload();
    };

    const signup = () => {
        navigate('/signup');
        onClose();
    };

    return (
        <Drawer anchor="right" open={open} onClose={onClose} sx={{
             position: 'fixed',
            marginTop: '4.3%',
        right: 0,
            '& .MuiDrawer-paper': {
                marginRight: '30px',
                height: '15%', // Set height of the drawer menu
                width: '14%', // Set width of the drawer menu
                margin: 'auto', // Center the drawer horizontally
                marginTop: '4%',
                borderRadius: "0 0 0 2px",
                overflow: "hidden",
                padding: "0.1%"
            }
        }}>
            <List>
                <ListItem button onClick={signup} sx={{ '&:hover': { backgroundColor: '#D0CDCC' } }}>
                    <ListItemIcon>
                        <AddCircleOutlineIcon />
                    </ListItemIcon>
                    <ListItemText primary="SignIn" />
                </ListItem>
                <ListItem button onClick={logout} sx={{ '&:hover': { backgroundColor: '#D0CDCC' } }}>
                    <ListItemIcon>
                        <LogoutIcon />
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                </ListItem>
            </List>
        </Drawer>
    );
};

export default DrawerMenu;
