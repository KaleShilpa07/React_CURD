import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { useNavigate } from 'react-router-dom';
import PhoneIcon from '@mui/icons-material/Phone';


const ContactStudent = () => {
    // State to manage form inputs and error messages
    const Navigation = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNo: '',
        message: ''
    });
    const [errors, setErrors] = useState({});

    // Function to handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    const headerStyle = {
        textAlign: 'center',
        marginBottom: '20px',
    };

    // Function to validate form inputs
    const validateForm = () => {
        const errors = {};
        if (!formData.firstName.trim()) {
            errors.firstName = 'First Name is required';
        }
        if (!formData.lastName.trim()) {
            errors.lastName = 'Last Name is required';
        }
        if (!formData.email.trim()) {
            errors.email = 'Email is required';
        } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
            errors.email = 'Invalid email format';
        }
        if (!formData.phoneNo.trim()) {
            errors.phoneNo = 'Phone is required';
        } else if (!/^\d{10}$/.test(formData.phoneNo)) {
            errors.phoneNo = 'Invalid phone number';
        }
        if (!formData.message.trim()) {
            errors.message = 'Message is required';
        }
        setErrors(errors);

       
        return Object.keys(errors).length === 0;
    };



    // Function to handle form submission
    const handleSubmit = async (e) => {

        e.preventDefault();
        try {
            if (validateForm()) {
                // Make a POST request to your API endpoint
                const response = await axios.post('https://localhost:7195/api/home/AddContact', formData);
                console.log('Response:', response.data); // Log the response from the API
                // Display a success toast notification
                toast.success('Contact information submitted successfully!', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    marginTop: "100px"
                });
                // Clear form fields after successful submission
                setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    phoneNo: '',
                    message: ''

                });
                Navigation('/ContactThankYou');
            }
        } catch (error) {
            // Handle errors (e.g., network error, server error)
            console.error('Error submitting contact information:', error);
            // Display an error toast notification
            toast.error('An error occurred while submitting contact information. Please try again later.', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                marginTop: "100px"
            });
        }
    };

    return (
        <div className="container-fluid page-container" style={{
            backgroundColor: "#f0f0f0",
            minHeight: "130vh",
            display: "flex",

            justifyContent: "center",
            alignItems: "center"
        }}>
            <div className="container d-flex justify-content-center align-items-center vh-100">
                <div className="card p-4 form-card" style={{
                    maxWidth: '400px', width: '120%',
                    height: "500px", overflowY: "auto",
                    marginTop: "20%", marginBottom: "50%", position: "fixed",
                    transform: "translate(-50 %, -50 %)"
                }}>

                    <div style={headerStyle}>
                        <PhoneIcon /><br />
                        <h1>Contact</h1>

                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="firstName" className="form-label">First Name:</label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                className={`form-control ${errors.firstName && 'is-invalid'}`}
                            //required
                            />
                            {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="lastName" className="form-label">Last Name:</label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                className={`form-control ${errors.lastName && 'is-invalid'}`}
                            //required
                            />
                            {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email:</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className={`form-control ${errors.email && 'is-invalid'}`}
                            //required
                            />
                            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="phoneNo" className="form-label">Phone:</label>
                            <input
                                type="tel"
                                id="phoneNo"
                                name="phoneNo"
                                pattern="[0-9]{10}"
                                placeholder="Phone No"
                                value={formData.phoneNo}
                                onChange={handleChange}
                                className={`form-control ${errors.phoneNo && 'is-invalid'}`}
                            //required
                            />
                            <small className="form-text text-muted">Format:10 Digits only</small>
                            {errors.phoneNo && <div className="invalid-feedback">{errors.phoneNo}</div>}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="message" className="form-label">Message:</label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                className={`form-control ${errors.message && 'is-invalid'}`}
                                rows="3"
                            //required
                            ></textarea>
                            {errors.message && <div className="invalid-feedback">{errors.message}</div>}
                        </div>
                        <div style={{ textAlign: "center" }}>
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
            {/* Toast container to display toast notifications */}
            <ToastContainer />
        </div>
    );
};

export default ContactStudent;