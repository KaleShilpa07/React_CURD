import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Validation from './LoginValidation';
 
const Login = () => {
    const Navigate = useNavigate(); // Import useHistory hook
    const [values, setValue] = useState({
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState({});

    const handleSubmit = async (event) => {
        event.preventDefault();
        setErrors(Validation(values));
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
            toast.success('Login Success', { position: "top-center", autoClose: 3000 });
            // Redirect to the next page upon successful login
            Navigate('/Nav');
        }
        else {
            console.error('Login failed:', data.message);
            toast.error('Login failed', { position: "top-center", autoClose: 3000 });
          
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
            <div className='d-flex justify-content-center align-items-center p-3 border bg-light-blue  max-content; vh-100'>
                <div className='bg-white p-3 rounded w-2'>
                    <form action='' onSubmit={handleSubmit}>
                        <h3>
                            <strong>Login Page</strong>
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
                            to='/signup'
                            className='btn btn-default border w-100 bg-light text-decoration-none rounded-2 '
                        >
                            <strong>Create Account</strong>
                        </Link>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Login;
