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
            <div className="title-div">
                <h2 className="title">Contact Us!</h2>
                <img
                loading='lazy'
                className="title-image"
                src={sixPack}
                alt="Beverage Express Six Pack Logo"
                />
            </div>

            <p className='page-description'>
                In case you're not in Carlisle, PA at the moment or you just have a question about our products in general, you can get
                in touch with someone at Beverage Express via this contact form, the phone, email, or social media. We value customer 
                service just as much as we value providing a wide, diverse selection of quality beers. We look forward to helping you
                in any way you choose to contact us.
            </p>

            {/* contact form */}
            <form className="contact-form" onSubmit={handleSubmit}>
                <label htmlFor="name">Name</label>
                <input placeholder='First and Last Name' className='input' id="name" type="text" name="name" />
                
                <label htmlFor="email">Email Address</label>
                <input placeholder='email@email.com' className='input' id="email" type="email" name="email" />
                <ValidationError prefix="Email" field="email" errors={state.errors} />
                
                <label htmlFor="message">Your Message</label>
                <textarea placeholder='Type your message here' className='input' id="message" name="message" />
                <ValidationError
                    prefix="Message"
                    field="message"
                    errors={state.errors}
                />
                
                <button
                    className="button contact-submit"
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

