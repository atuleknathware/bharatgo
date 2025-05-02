// src/components/AuthForm.js
import React, { useEffect, useState } from "react";
import { signIn } from "../srcAuthService";
import "../Styles/AuthForm.css";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loginStatus, setLoginStatus] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };
  const validate = () => {
    const newErrors = {};
    const { email, password } = formData;
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      newErrors.email = "Email is invalid";
    if (password.length < 6)
      newErrors.password = "Password must be at least 6 characters.";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    console.log("here", validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const user = await signIn(formData.email, formData.password);

      localStorage.setItem("accessToken", user.accessToken);
      localStorage.setItem("loggedEmail", formData.email);

      setLoginStatus({
        message: "Login is successfull",
        success: true,
        active: true,
      });
    } catch (err) {
      setLoginStatus({ message: err.message, success: false, active: true });
      console.log(err.message);
      // alert(err.message);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      console.log(loginStatus);
      setLoginStatus({ active: false });
      if (loginStatus.success) {
        navigate("/all");
      }
    }, 2000);
  }, [loginStatus]);

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h2>Login</h2>
      {loginStatus.active && (
        <div
          className={`alert ${
            loginStatus.success ? "alert-success" : "alert-danger"
          }`}
          role="alert"
        >
          {loginStatus.message}
        </div>
      )}
      <label htmlFor="email" className="mt-4">
        Email
      </label>
      <input
        type="text"
        name="email"
        id="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
      />
      {errors.email && <p className="error">{errors.email}</p>}
      <label htmlFor="email" className="mt-4">
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
      <button type="submit" className="mt-4">
        Login
      </button>
      <Link to={"/register"}>Create an account</Link>

      <br></br>
      <Link to={"/all"}>continue shopping</Link>
    </form>
  );
};

export default Login;
