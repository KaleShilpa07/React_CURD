import React, { Fragment, useState, useEffect } from "react";
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import LogoutIcon from '@mui/icons-material/Logout';
import DrawerMenu from './DrawerMenu';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import RefreshIcon from '@mui/icons-material/Refresh';
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, Collapse } from '@mui/material';
import { Send as SendIcon, Drafts as DraftIcon, Mail as MailIcon, School as StudentIcon,  Inbox as InboxIcon, Star as StarIcon, Delete as DeleteIcon, Report as SpamIcon, Phone as PhoneIcon, CalendarToday as CalendarTodayIcon } from '@mui/icons-material';
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import ContactStudent from "./ContactStudent";
import StudentCurd from "./StudentCurd";
import Navbar from "./Navbar";
import TextForm from "./TextForm";
import StudentCurdGridData from "./StudentCurdGridData";
import MyCalender from "./MyCalender";
import EmailForm from "./EmailForm";
import ContactThankYou from "./ContactThankYou";
const drawerWidth = 170;
const drawercolor = "#112655";
const TextColor = "#FFFFFF";

const openedMixin = (theme) => ({
    width: drawerWidth,
    backgroundColor: drawercolor,
    color: TextColor,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create(['width', 'backgroundColor'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    
    overflowX: 'auto',
    width: `calc(${theme.spacing(7)} + 1px)`,
    backgroundColor: '#112655', // Set background color to black when closed
    color: TextColor, // Assuming TextColor is defined elsewhere
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

const Layout = () => 

{
    const theme = useTheme();
    const [drawerOpen, setDrawerOpen] = useState(false);

    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };
   
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
    const navigate = useNavigate();

    const handleListItemClick = (text) => {
        navigate(`/${text}`);

    };
    const refreshPage = () => {
        setTimeout(() => {
            window.location.reload();
        }, 2000);
    };
    return (
        <div>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline/>
               
                <AppBar position="fixed" open={open} sx={{ bgcolor: '#112655' }}>
                    <Toolbar>
                      
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            sx={{ ...(open && { display: 'none' }) }}
                        >
                            <MenuIcon /> &nbsp;&nbsp;
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1, display: 'flex', marginTop: "20px" }}>
                            <ul style={{ display: 'flex', listStyleType: 'none', padding: 0 }}>
                                <li style={{ marginRight: '10px', borderRight: '1px solid #EEEEEE', paddingRight: '10px' }}>
                                    <Link className="nav-link" to="/StudentCurd">Student Records</Link>
                                </li>
                              
                                <li style={{ marginRight: '10px', borderRight: '1px solid #EEEEEE', paddingRight: '10px' }}>
                                    <Link className="nav-link" to="/Navbar">News</Link>
                                </li>
                                <li style={{ marginRight: '10px', borderRight: '1px solid #EEEEEE', paddingRight: '10px' }}>
                                    <Link className="nav-link" to="/TextForm">TextEditor</Link>
                                </li>
                            </ul>
                        </Typography>
                        <IconButton style={{color:"white"}} onClick={() => refreshPage()}>
                            <RefreshIcon/>
                        </IconButton>
                        <IconButton style={{ color: "white" }} onClick={() => setDrawerOpen(!drawerOpen)}>
                            {drawerOpen ? <CloseIcon /> : <LogoutIcon />}
                        </IconButton>
                        {/* Drawer menu */}
                        <DrawerMenu open={drawerOpen} onClose={toggleDrawer} />
                    </Toolbar>
                </AppBar>
                <Drawer variant="permanent" open={open}>
                    
                    <DrawerHeader>
                          <IconButton onClick={handleDrawerClose} sx={{
                            width:'20px',
                            color: '#fff'
                        }}>
                            {theme.direction === 'rtl' ? <ChevronLeftIcon />:<ArrowBackIcon/>}
                              </IconButton>
                    </DrawerHeader>
                    <Divider />
                    <List>
                        {['Student'].map((text, index) => (
                            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                                <ListItemButton
                                    onClick={() => handleListItemClick(text)}
                                    sx={{
                                        minHeight: 48,
                                        justifyContent: open ? 'initial' : 'center',
                                        px: 2.5,
                                    }}
                                    title={text}
                                    css={{ color: 'gray' }}
                                >
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: open ? 3 : 'auto',
                                            justifyContent: 'center',
                                            color: '#fff'
                                        }}
                                    >
                                        {index % 2 === 0 ? <StudentIcon /> : <InboxIcon />}
                                    </ListItemIcon>
                                    <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                        {['Contact'].map((text, index) => (
                            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                                <ListItemButton
                                    onClick={() => handleListItemClick(text)}
                                    sx={{
                                        minHeight: 48,
                                        justifyContent: open ? 'initial' : 'center',
                                        px: 2.5,
                                    }}
                                    title={text}
                                    css={{ color: 'gray' }}
                                >
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: open ? 3 : 'auto',
                                            justifyContent: 'center',
                                            color: '#fff'
                                        }}
                                    >
                                        {index % 2 === 0 ? <PhoneIcon /> : <InboxIcon />}
                                    </ListItemIcon>
                                    <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                        {['Calender'].map((text, index) => (
                            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                                <ListItemButton
                                    onClick={() => handleListItemClick(text)}
                                    sx={{
                                        minHeight: 48,
                                        justifyContent: open ? 'initial' : 'center',
                                        px: 2.5,
                                    }}
                                    title={text}
                                    css={{ color: 'gray' }}
                                >
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: open ? 3 : 'auto',
                                            justifyContent: 'center',
                                            color: '#fff'
                                        }}
                                    >
                                        {index % 2 === 0 ? <CalendarTodayIcon /> : <InboxIcon />}
                                    </ListItemIcon>
                                    <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                                </ListItemButton>
                            </ListItem>
                        ))}

                    </List>
                    <List>
                        {['Inbox'].map((text, index) => (
                            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                                <ListItemButton
                                    onClick={() => handleListItemClick(text)}
                                    sx={{
                                        minHeight: 48,
                                        justifyContent: open ? 'initial' : 'center',
                                        px: 2.5,
                                    }}
                                    title={text}
                                    css={{ color: 'gray' }} 
                                >
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: open ? 3 : 'auto',
                                            justifyContent: 'center',
                                            color: '#fff'
                                        }}
                                    >
                                        {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                    </ListItemIcon>
                                    <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                        {['SendEmail'].map((text, index) => (
                            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                                <ListItemButton
                                    onClick={() => handleListItemClick(text)}
                                    sx={{
                                        minHeight: 48,
                                        justifyContent: open ? 'initial' : 'center',
                                        px: 2.5,
                                    }}
                                    title={text}
                                    css={{ color: 'gray' }}
                                >
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: open ? 3 : 'auto',
                                            justifyContent: 'center',
                                            color: '#fff'
                                        }}
                                    >
                                        {index % 2 === 0 ? <SendIcon /> : <MailIcon />}
                                    </ListItemIcon>
                                    <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                        {['Drafts'].map((text, index) => (
                            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                                <ListItemButton
                                    onClick={() => handleListItemClick(text)}
                                    sx={{
                                        minHeight: 48,
                                        justifyContent: open ? 'initial' : 'center',
                                        px: 2.5,
                                    }}
                                    title={text}
                                    css={{ color: 'gray' }}
                                >
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: open ? 3 : 'auto',
                                            justifyContent: 'center',
                                            color: '#fff'
                                        }}
                                    >
                                        {index % 2 === 0 ? <DraftIcon /> : <MailIcon />}
                                    </ListItemIcon>
                                    <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                    <Divider />
                    <List>
                        {['All mail'].map((text, index) => (
                            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                                <ListItemButton
                                    onClick={() => handleListItemClick(text)}
                                    sx={{
                                        minHeight: 48,
                                        justifyContent: open ? 'initial' : 'center',
                                        px: 2.5,
                                    }}
                                    title={text}
                                    css={{ color: 'gray' }} 
                                >
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: open ? 3 : 'auto',
                                            justifyContent: 'center',
                                            color: '#fff'
                                        }}
                                    >
                                        {index % 2 === 0 ? <MailIcon /> : <InboxIcon />}
                                    </ListItemIcon>
                                    <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                        {['Starred'].map((text, index) => (
                            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                                <ListItemButton
                                    onClick={() => handleListItemClick(text)}
                                    sx={{
                                        minHeight: 48,
                                        justifyContent: open ? 'initial' : 'center',
                                        px: 2.5,
                                    }}
                                    title={text}
                                    css={{ color: 'gray' }}
                                >
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: open ? 3 : 'auto',
                                            justifyContent: 'center',
                                            color: '#fff'
                                        }}
                                    >
                                        {index % 2 === 0 ? <StarIcon /> : <InboxIcon />}
                                    </ListItemIcon>
                                    <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                        {['Spam'].map((text, index) => (
                            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                                <ListItemButton
                                    onClick={() => handleListItemClick(text)}
                                    sx={{
                                        minHeight: 48,
                                        justifyContent: open ? 'initial' : 'center',
                                        px: 2.5,
                                    }}
                                    title={text}
                                    css={{ color: 'gray' }}
                                >
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: open ? 3 : 'auto',
                                            justifyContent: 'center',
                                            color: '#fff'
                                        }}
                                    >
                                        {index % 2 === 0 ? <SpamIcon /> : <MailIcon />}
                                    </ListItemIcon>
                                    <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                        {['Trash'].map((text, index) => (
                            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                                <ListItemButton
                                    onClick={() => handleListItemClick(text)}
                                    sx={{
                                        minHeight: 48,
                                        justifyContent: open ? 'initial' : 'center',
                                        px: 2.5,
                                    }}
                                    title={text}
                                    css={{ color: 'gray' }}
                                >
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: open ? 3 : 'auto',
                                            justifyContent: 'center',
                                            color: '#fff'
                                        }}
                                    >
                                        {index % 2 === 0 ? <DeleteIcon /> : <InboxIcon />}
                                    </ListItemIcon>
                                    <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                    <Divider />
                   
                </Drawer>
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <DrawerHeader />
                    <Typography>
                   
                        <Routes>
                            <Route path="/Contact" element={<ContactStudent />} />
                            <Route path="/Student" element={<StudentCurdGridData/>}/>
                            <Route path="/StudentCurd" element={<StudentCurd/>} />
                            <Route path="/Navbar" element={<Navbar />} />
                            <Route path="/TextForm" element={<TextForm />} />
                            <Route path="/Calender" element={<MyCalender />} />
                            <Route path="/SendEmail" element={<EmailForm />} />
                            <Route path="/ContactThankYou" element={<ContactThankYou />} />

                        </Routes>
                    </Typography>
                </Box>
                
            </Box>
        </div>

    );
};

export default Layout;
