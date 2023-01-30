import React from 'react';

// formspree form
import { useForm, ValidationError } from '@formspree/react';

// styling and images
import sixPack from '../assets/images/bx-six-pack.webp';
import '../styles/Contact.css';

function Contact() {
    const [state, handleSubmit] = useForm('xjvdvzdd');

    // message to be sent when customer sends an enquiry
    if (state.succeeded) {
        return (
            <p className='success-message'>
                Thanks for your message! One of our team members will get back to you as soon as possible. Send another message on the <a href='/contact'>Contact Page by clicking here</a> or return to the <a href='/'>Home Page here</a>.
            </p>
        );
    };

    return (
        <>
            {/* page title */}
            <div className="contact-title-div">
                <h2 className="contact-title">Contact Us!</h2>
                <img
                className="contact-header-image"
                src={sixPack}
                alt="Beverage Express Six Pack Logo"
                />
            </div>

            {/* contact form */}
            <form className="contact-form" onSubmit={handleSubmit}>
                <label htmlFor="name">Name</label>
                <input id="name" type="text" name="name" />
                
                <label htmlFor="email">Email Address</label>
                <input id="email" type="email" name="email" />
                <ValidationError prefix="Email" field="email" errors={state.errors} />
                
                <label htmlFor="message">Your Message</label>
                <textarea id="message" name="message" />
                <ValidationError
                    prefix="Message"
                    field="message"
                    errors={state.errors}
                />
                
                <button
                    className="contact-submit"
                    type="submit"
                    disabled={state.submitting}
                >
                Submit
                </button>
            </form>
        </>
    );
};

export default Contact;

