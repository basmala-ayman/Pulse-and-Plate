import React, { useState } from "react";
import "./ContactUs.css";
import "../../App.css";

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Thank you ${formData.name}, your message has been sent!`);
        setFormData({ name: "", email: "", message: "" });
    };

    return (
        <div className="contact-us-page">
            <div className="container">
                <h2 className="title">Contact Us</h2>
                <div className="content-wrapper">
                    {/* Form Section */}
                    <div className="form-section">
                        <form className="contact-form" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label className="form-label">
                                    Name<span className="required-asterisk">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    className="form-control"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">
                                    Email<span className="required-asterisk">*</span>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    className="form-control"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">
                                    Message<span className="required-asterisk">*</span>
                                </label>
                                <textarea
                                    name="message"
                                    className="form-control"
                                    required
                                    value={formData.message}
                                    onChange={handleChange}
                                ></textarea>
                            </div>

                            <button type="submit" className="submit-btn">
                                Send Message
                            </button>
                        </form>
                    </div>

                    {/* Image Section */}
                    <div className="image-section d-none d-lg-block">
                        <img
                            src=".\images\contact-image-01.png"
                            alt="Contact Us"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
