//import React, { Component } from "react";
//import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
//import ContactStudent from "./ContactStudent";
//import Login from "./Login";
//import SignUp from "./SignUp";
//import StudentCurd from "./StudentCurd";
//import Nav from "./Nav";
//import NewsRoute from "./NewsRoute";
//import LoadingBar from "react-top-loading-bar";

//const RenderNav = ({ children }) => {
//    const isLoginPage = window.location.pathname === "/";
//    return isLoginPage ? children : <><Nav /> {children} </>;
//};

//class Routing extends Component {
//    pageSize = 3;
//    apiKey = process.env.REACT_APP_NEWS_API;

//    state = {
//        progress: 0,
//    };

//    setProgress = (progress) => {
//        this.setState({ progress: progress });
//    };

//    render() {
//        return (
//            <Router>
//                <LoadingBar
//                    height={4}
//                    color="#f11946"
//                    progress={this.state.progress}
//                />
//                <Routes>
//                    <Route
//                        path="/*"
//                        element={<RenderNav>
//                            <Routes>
//                                <Route path="/StudentCurd" element={<StudentCurd />} />
//                                <Route path="/Contact" element={<ContactStudent />} />
//                                <Route path="/" element={<Login />} />
//                                <Route path="/SignUp" element={<SignUp />} />
//                                <Route path="/Nav" element={<Nav />} />
                               
//                                <Route
//                                    path="/:category"
//                                    {/*element={*/}
//                                        <RenderNav>
//                                            <NewsRoute
//                                                setProgress={this.setProgress}
//                                                apiKey={this.apiKey}
//                                                pageSize={this.pageSize}
//                                                country="in"
//                                            />
//                                        </RenderNav>
//                                    }
//                                />
//                            </Routes>
//                        </RenderNav>}
//                    />
//                </Routes>
//            </Router>
//        );
//    }
//}

//export default Routing;
