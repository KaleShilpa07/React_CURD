
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Form } from "react-bootstrap";
export class Navbar extends Component {
    
    render() {
        return (
            <>
                <div>

                    <div className="container my-3">

                        <h1 className="text-center" style={{ marginTop: "100px" }}>News Gallary </h1>

                        <div style={{ position: "fixed", top: "170px", alignContent:"center", left: "590px", zIndex: "999" }}>
                            <div className="row">
                                <div className="col">
                                    <Link className="btn btn-primary border rounded-2 mb-2 d-block" to="/Business"><strong>Business</strong></Link>
                                    <Link className="btn btn-primary border rounded-2 mb-2 d-block" to="/entertainment"><strong>Entertainment</strong></Link>
                                    <Link className="btn btn-primary border rounded-2 mb-2 d-block" to="/general"><strong>General</strong></Link>
                                    <Link className="btn btn-primary border rounded-2 mb-2 d-block" to="/technology"><strong>Technology</strong></Link>

                                </div>
                                <div className="col">
                                    <Link className="btn btn-primary border rounded-2 mb-2 d-block" to="/health"><strong>Health</strong></Link>
                                    <Link className="btn btn-primary border rounded-2 mb-2 d-block" to="/science"><strong>Science</strong></Link>
                                    <Link className="btn btn-primary border rounded-2 mb-2 d-block" to="/sports"><strong>Sports</strong></Link>
                                       </div>
                            </div>
                            </div>

                    </div>
                          
                        
                  
                </div></>
        )
    }
}

export default Navbar