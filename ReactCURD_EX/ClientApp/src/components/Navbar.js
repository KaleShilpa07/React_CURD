
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Form } from "react-bootstrap";
export class Navbar extends Component {
    
    render() {
        return (
            <>
                <div>
                    <Form style={{ marginTop:"0px" }} className="navbar fixed-top navbar-expand-lg  navbar-dark bg-dark">
                        <div className="container-fluid">
                            <Link className="navbar-brand" to="/science">News Gallary</Link>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                    <li> <Link className="nav-link" to="/Business">Business</Link></li>
                                    <li> <Link className="nav-link" to="/entertainment" >Entertainment</Link></li>
                                    <li> <Link className="nav-link" to="/general" >General</Link></li>
                                    <li> <Link className="nav-link" to="/health" >Health</Link></li>
                                    <li> <Link className="nav-link" to="/science">Science</Link></li>
                                    <li> <Link className="nav-link" to="/sports">Sports</Link></li>
                                    <li> <Link className="nav-link" to="/technology" >Technology</Link></li>
                               </ul>
                                <Link className="btn btn-primary btn-sm mx-1" to="/Nav" role="button">Back Home</Link>


                            </div>
                        </div>
                    </Form>
                </div></>
        )
    }
}

export default Navbar