import React, { useState } from "react";
import { Link } from "react-router-dom";
import { signUp } from "../srcAuthService";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    mobile: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const [errors, setErrors] = useState({});
  const [showSuccessMessage, setShowSuccessMessage] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState("");

  const validate = () => {
    const newErrors = {};
    const { name, address, mobile, email, password, cpassword } = formData;

    if (!name.trim()) newErrors.name = "Full name is .";
    if (!address.trim()) newErrors.address = "Address is .";
    if (!/^\d{10}$/.test(mobile))
      newErrors.mobile = "Enter a valid 10-digit mobile number.";
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      newErrors.email = "Email is .";
    if (password.length < 6)
      newErrors.password = "Password must be at least 6 characters.";
    if (password !== cpassword) newErrors.cpassword = "Passwords do not match.";

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setShowSuccessMessage("");
      setShowErrorMessage("");
      const user = await signUp(formData.email, formData.password);

      console.log("Signed up:", {
        user,
        name: formData.name,
        address: formData.address,
        mobile: formData.mobile,
      });
      setShowSuccessMessage("Registration is successfull");
      setErrors({});
    } catch (err) {
      setShowErrorMessage(err.message);
      //   alert(err.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h2>Sign Up</h2>
      {showSuccessMessage && (
        <div className="alert alert-success" role="alert">
          {showSuccessMessage}
        </div>
      )}
      {showErrorMessage && (
        <div className="alert alert-danger" role="alert">
          {showErrorMessage}
        </div>
      )}
      <label htmlFor="name" className="mt-4">
        Full Name
      </label>
      <input
        id="name"
        type="text"
        name="name"
        placeholder="Full Name"
        value={formData.name}
        onChange={handleChange}
      />
      {errors.name && <p className="error">{errors.name}</p>}

      <label htmlFor="address" className="mt-4">
        Address
      </label>
      <input
        type="text"
        name="address"
        id="address"
        placeholder="Address"
        value={formData.address}
        onChange={handleChange}
      />
      {errors.address && <p className="error">{errors.address}</p>}

      <label htmlFor="mobile" className="mt-4">
        Mobile Number
      </label>
      <input
        type="tel"
        name="mobile"
        id="mobile"
        placeholder="Mobile Number"
        value={formData.mobile}
        onChange={handleChange}
        pattern="\d{10}"
      />
      {errors.mobile && <p className="error">{errors.mobile}</p>}

      <label htmlFor="email" className="mt-4">
        Email
      </label>
      <input
        type="email"
        name="email"
        id="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
      />
      {errors.email && <p className="error">{errors.email}</p>}

      <label htmlFor="password" className="mt-4">
        Password
      </label>
      <input
        type="password"
        name="password"
        id="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
      />
      {errors.password && <p className="error">{errors.password}</p>}

      <label htmlFor="cpassword" className="mt-4">
        Confirm Password
      </label>
      <input
        type="password"
        name="cpassword"
        id="cpassword"
        placeholder="Confirm Password"
        value={formData.cpassword}
        onChange={handleChange}
      />
      {errors.cpassword && <p className="error">{errors.cpassword}</p>}

      <button type="submit" className="mt-4">
        Sign Up
      </button>
      <Link to={"/login"}>Already have an account? Log in</Link>
    </form>
  );
};

export default Register;
