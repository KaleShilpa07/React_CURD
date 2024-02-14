import React, { useState } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Validation from "./SignUpValidation";


const SignUp = () => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({});

    const handleSubmit = async (event) => {
        event.preventDefault();
        setErrors(Validation(values));

        if (Object.keys(errors).length === 0) {
            try {
                const response = await axios.post('https://localhost:7195/api/home/signup', values);
                console.log(response.data);
                toast.success('Signup successful!', { position: "top-center", autoClose: 3000 }); // Display success toast
                // Redirect user to login page or any other page after successful signup
            } catch (error) {
                console.error('Error signing up:', error.message);
                toast.error('Error signing up. Please try again.', { position: "top-center", autoClose: 3000 }); // Display error toast
            }
        }
    };

    const handleInput = (event) => {
        const { name, value } = event.target;
        setValues(prev => ({ ...prev, [name]: value }));
    };

    return (
        <>
            <div className='d-flex justify-content-center align-items-center p-3 border bg-light-blue vh-100'>
                <div className='bg-white p-3 rounded w-2'>
                    <form onSubmit={handleSubmit}>
                        <h3><strong>SignUp</strong></h3>
                        <div className='mb-3'>
                            <label htmlFor='name' className='col-lg-2 col-form-label'><strong>Name:</strong></label>
                            <input onChange={handleInput} name='name' type='text' placeholder='Enter Name' className='form-control rounded-2' />
                            {errors.name && (
                                <span className='text-danger'>{errors.name}</span>
                            )}
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='email' className='col-lg-2 col-form-label'><strong>Email:</strong></label>
                            <input onChange={handleInput} name='email' type='text' placeholder='Enter Email' className='form-control rounded-2' />
                            {errors.email && (
                                <span className='text-danger'>{errors.email}</span>
                            )}
                        </div>

                        <div className='mb-3'>
                            <label htmlFor='password' className='col-lg-2 col-form-label'><strong>Password:</strong></label>
                            <input onChange={handleInput} name='password' type='password' placeholder='Enter Password' className='form-control rounded-2 ' id='inputPassword' />
                            {errors.password && (
                                <span className='text-danger'>{errors.password}</span>
                            )}
                        </div>
                        <button type='submit' className='btn btn-success w-100 rounded-2 '><strong>SignUp</strong></button>
                        <p>You agree to our terms and conditions..</p>
                        <Link to="/Login" className='btn btn-default border w-100 bg-light text-decoration-none rounded-2 '><strong>Login</strong></Link>
                    </form>
                </div>
            </div>
            <ToastContainer /> {/* Include ToastContainer to render the toasts */}
        </>
    );
}

export default SignUp;
