import React, { Component } from "react";
import LoadingBar from "react-top-loading-bar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import News from './News';
import Navbar from './Navbar';
import StudentCurd from './StudentCurd';
import ContactStudent from './ContactStudent';
import Login from './Login';
import SignUp from './SignUp';
import Nav from './Nav';
import TextForm from './TextForm';


export class NewsRoute extends Component {

    RenderNav = ({ children }) => {
        const isLoginPage = window.location.pathname === "/";
        return isLoginPage ? children : <><Nav /> {children} </>;
    };

    pageSize = 3;
    apiKey = process.env.REACT_APP_NEWS_API;

    state = {
        progress: 0,
    };

    setProgress = (progress) => {
        this.setState({ progress: progress });
    };

    render() {
        return (
            <div>
                <Router>
                   
                    <LoadingBar
                        height={4}
                        color="#f11946"
                        progress={this.state.progress}
                    />
                    <Routes>
                        <Route
                            path="*"
                            element={<this.RenderNav>
                                <Routes>
                                    <Route path="/StudentCurd" element={<StudentCurd />} />
                                    <Route path="/Contact" element={<ContactStudent />} />
                                    <Route path="/" element={<Login />} />
                                    <Route path="/SignUp" element={<SignUp />} />
                                    <Route path="/Nav" element={<Nav />} />
                                    <Route path="/Navbar" element={<Navbar />} />
                                    <Route path="/TextForm" element={<TextForm />} />
                                </Routes>
                            </this.RenderNav>}
                        />
                       
                        <Route path="/Business" element={<News
                            setProgress={this.setProgress}
                            apiKey={this.apiKey}
                            key="business"
                            pageSize={this.pageSize}
                            country="in"
                            category="business"
                        />} />
                        <Route path="/entertainment" element={<News
                            setProgress={this.setProgress}
                            apiKey={this.apiKey}
                            key="entertainment"
                            pageSize={this.pageSize}
                            country="in"
                            category="entertainment"
                        />} />
                        <Route path="/general" element={<News
                            setProgress={this.setProgress}
                            apiKey={this.apiKey}
                            key="general"
                            pageSize={this.pageSize}
                            country="in"
                            category="general"
                        />} />
                        <Route path="/health" element={<News
                            setProgress={this.setProgress}
                            apiKey={this.apiKey}
                            key="health"
                            pageSize={this.pageSize}
                            country="in"
                            category="health"
                        />} />
                        <Route path="/science" element={<News
                            setProgress={this.setProgress}
                            apiKey={this.apiKey}
                            key="science"
                            pageSize={this.pageSize}
                            country="in"
                            category="science"
                        />} />
                        <Route path="/sports" element={<News
                            setProgress={this.setProgress}
                            apiKey={this.apiKey}
                            key="sports"
                            pageSize={this.pageSize}
                            country="in"
                            category="sports"
                        />} />
                        <Route path="/technology" element={<News
                            setProgress={this.setProgress}
                            apiKey={this.apiKey}
                            key="technology"
                            pageSize={this.pageSize}
                            country="in"
                            category="technology"
                                    />} />
                                
                    </Routes>
                </Router>
            </div>
        );
    }
}

export default NewsRoute;
