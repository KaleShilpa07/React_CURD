import React from 'react';

const ContactThankYou = () => {
    return (
        <div className="container" style={{ color:"black", display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div style={{ textAlign: "center" }}>
                <h1>Thank you for contacting us!</h1>
                <p>We will get back to you shortly.</p>
            </div>
        </div>
    );
};

export default ContactThankYou;
