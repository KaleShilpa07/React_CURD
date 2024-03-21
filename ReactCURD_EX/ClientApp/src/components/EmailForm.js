import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

function EmailForm() {
    const [email, setEmail] = useState({
        sender: '',
        recipient: '',
        subject: '',
        body: '',
        SentDate: new Date(Date.now()).toLocaleString()
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmail({ ...email, [name]: value });
    };

    const validateEmail = (emailAddress) => {
        // Basic email validation using regex
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return pattern.test(emailAddress);
    };

    useEffect(() => {
        // Set the current date and time in the SentDate field when the component mounts
        const currentDate = new Date().toISOString().slice(0, 16);
        setEmail((prevEmail) => ({
            ...prevEmail,
            SentDate: currentDate
        }));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = {};

        if (!validateEmail(email.sender)) {
            validationErrors.sender = 'Invalid sender email address';
        }

        if (!validateEmail(email.recipient)) {
            validationErrors.recipient = 'Invalid recipient email address';
        }

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);

            toast.error('Please fix the validation errors.', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                marginTop: "100px"
            });
            return;
        }

        try {
            await axios.post('https://localhost:7195/api/email/send', email);

            toast.success('Email sent successfully!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                marginTop: "100px"
            });
            // Optionally, you can clear the form fields after successful submission
            setEmail({
                sender: '',
                recipient: '',
                subject: '',
                body: '',
                SentDate: new Date(Date.now()).toLocaleString()
            });
        } catch (error) {
            console.error('Error sending email:', error);


            toast.error('Error sending email. Please try again later.', {
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
                    <h2>Send Email</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>From</label>
                            <input
                                type="email"
                                name="sender"
                                value={email.sender}
                                onChange={handleChange}
                                className={`form-control ${errors.sender ? 'is-invalid' : ''}`}
                            // required
                            />
                            {errors.sender && <div className="invalid-feedback">{errors.sender}</div>}
                        </div>
                        <div className="form-group">
                            <label>To</label>
                            <input
                                type="email"
                                name="recipient"
                                value={email.recipient}
                                onChange={handleChange}
                                className={`form-control ${errors.recipient ? 'is-invalid' : ''}`}
                            //required
                            />
                            {errors.recipient && <div className="invalid-feedback">{errors.recipient}</div>}
                        </div>
                        <div className="form-group">
                            <label>Subject</label>
                            <input
                                type="text"
                                name="subject"
                                value={email.subject}
                                onChange={handleChange}
                                className="form-control"
                            //  required
                            />
                        </div>
                        <div className="form-group">
                            <label>Body</label>
                            <textarea
                                name="body"
                                value={email.body}
                                onChange={handleChange}
                                className="form-control"
                                required
                            />
                        </div>
                        <br />
                        <div style={{ textAlign:"center" }}>
                        <button  type="submit" className="btn btn-primary">Send Email</button>
                        </div>   </form>
                </div>
                <ToastContainer />
            </div>
        </div>
    );
}

export default EmailForm;
