import React, { useState } from "react";
import "./ContactForm.css";
import pkLogo from "./assets/pk-logo.jpeg";
import { FaLinkedin, FaGithub, FaInstagram, FaFacebook } from "react-icons/fa";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    dob: "",
    address: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";
    if (!formData.mobile.trim()) newErrors.mobile = "Mobile number is required";
    else if (!/^\d{10}$/.test(formData.mobile))
      newErrors.mobile = "Mobile must be 10 digits";
    if (!formData.dob.trim()) newErrors.dob = "Date of Birth is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      alert("Form submitted successfully!");
      console.log(formData);
      setFormData({
        name: "",
        email: "",
        mobile: "",
        dob: "",
        address: "",
      });
      setErrors({});
    }
  };

  return (
    <div className="contact-page">
      <h2 className="con-pan">Contact Us</h2>

      <form className="contact-form" onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label>Mobile Number</label>
          <input
            type="text"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            placeholder="Enter your mobile number"
          />
          {errors.mobile && <span className="error">{errors.mobile}</span>}
        </div>

        <div className="form-group">
          <label>Date of Birth</label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
          />
          {errors.dob && <span className="error">{errors.dob}</span>}
        </div>

        <div className="form-group">
          <label>Address</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter your address"
          />
          {errors.address && <span className="error">{errors.address}</span>}
        </div>

        <button type="submit">Submit</button>
      </form>

      {/* Footer Section */}
      <div className="footer">
        <div className="footer-content">
          <img src={pkLogo} alt="Pankaj Verma" className="footer-photo" />

          <div className="footer-info">
            <h3>Pankaj Verma</h3>
            <p>Education: B.Tech Computer Science</p>
            <p>Profession: Frontend Developer</p>
            <p>Mobile: +91 9759430871</p>
            <p>Email: Pankajverma141414@gmail.com</p>
            <div className="social-links">
              <a
                href="https://www.linkedin.com/in/pankaj-verma-429981229/"
                target="_blank"
                rel="noreferrer"
              >
                <FaLinkedin />
              </a>
              <a
                href="http://github.com/Pankajverma9759/"
                target="_blank"
                rel="noreferrer"
              >
                <FaGithub />
              </a>
              <a
                href="https://www.instagram.com/pankajverma141414"
                target="_blank"
                rel="noreferrer"
              >
                <FaInstagram />
              </a>
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noreferrer"
              >
                <FaFacebook />
              </a>
            </div>
          </div>
        </div>
        <p className="footer-power">Powered By Pankaj Verma</p>
      </div>
    </div>
  );
}
