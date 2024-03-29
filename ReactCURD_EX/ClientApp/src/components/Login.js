﻿import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import LoginValidation from "./Validations/LoginValidation";

 
const Login = () => {
    const refreshPage = () => {
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    };
    const Navigate = useNavigate(); // Import useHistory hook
    const [values, setValue] = useState({
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState({});

    const handleSubmit = async (event) => {
        event.preventDefault();
        setErrors(LoginValidation(values));
        if (errors.email) {
            toast.error('A user with this email and password combination already exists.', { position: "top-center", autoClose: 5000 });
            return;
        }
        const response = await fetch("https://localhost:7195/api/home/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        });
        const data = await response.json();
        if (response.ok) {
            console.log('Login successful:', data);
            toast.success('Login Success', { position: "top-center", autoClose:5000 });
            // Redirect to the next page upon successful login
            Navigate('/Layout');
            refreshPage();
            
        }
        else {
            console.error('Login failed:', data.message);
            toast.error('Error Login. Please try again.', { position: "top-center", autoClose: 1000 });
          
        }
    };

    const handleInput = (event) => {
        setValue((prev) => ({
            ...prev,
            [event.target.name]: event.target.value,
        }));
    };

    console.log('Login page open...');
    return (
        <>
            <div id='loginpage' className='d-flex border bg-light-blue '>
                <div>
                    <form id='Lform' action="" onSubmit={handleSubmit}>
                        <h3 style={{ textAlign: "center" }}>
                            <strong className="light-underline">Login Page</strong>
                        </h3>
                        <div className='mb-3'>
                            <label htmlFor='Name' className='col-lg-2 col-form-label'>
                                <strong>Email:</strong>
                            </label>
                            <input
                                name='email'
                                type='text'
                                onChange={handleInput}
                                placeholder='Enter email'
                                className='form-control rounded-2'
                            />
                            {errors.email && (
                                <span className='text-danger'>{errors.email}</span>
                            )}
                        </div>

                        <div className='mb-3'>
                            <label
                                htmlFor='Password'
                                className='col-lg-2 col-form-label'
                            >
                                <strong>Password:</strong>
                            </label>
                            <input
                                name='password'
                                type='password'
                                onChange={handleInput}
                                placeholder='Enter Password'
                                className='form-control rounded-2 '
                                id='inputPassword'
                            />{' '}
                            {errors.password && (
                                <span className='text-danger'>{errors.password}</span>
                            )}
                        </div>
                        <button
                            type='submit'
                            className='btn btn-success w-100 rounded-2 '
                        >
                            <b>Sign in</b>
                        </button>
                        <p>You are agree to our terms and conditions..</p>
                        <Link
                            style={{ textAlign:"center",marginLeft:"80px" }}
                            to='/signup'
                            className='btn btn-primary border  rounded-2 '
                        >
                            <strong  >Create Account</strong>
                        </Link>
                    </form>
                </div>
            </div> <ToastContainer /> {/* Include ToastContainer to render the toasts */}
        </>
    );
};

export default Login;
