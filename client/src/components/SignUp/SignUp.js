import React from "react";
import "../../App";
import "./SignUp.css";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../api/UsersAPI";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function SignUp() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Please confirm your password"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        await registerUser({
          name: values.name,
          email: values.email,
          password: values.password,
        });
        alert("Registration successful!");
        resetForm();
        navigate("/login");
      } catch (error) {
        console.error(error);
        alert("Failed to register. Please try again.");
      }
    },
  });

  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary form-container register">
      <div className="bg-white p-5 rounded shadow col-11 col-sm-10 col-md-8 col-lg-6 col-xl-5">
        <h2>Register</h2>
        <form onSubmit={formik.handleSubmit}>

          <div className="mb-3">
            <label htmlFor="name" className="form-label"><strong>Full Name</strong></label>
            <input
              type="text"
              className="form-control rounded-0"
              name="name"
              placeholder="Enter Full Name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.name && formik.errors.name && <div className="text-danger">{formik.errors.name}</div>}
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label"><strong>Email</strong></label>
            <input
              type="email"
              className="form-control rounded-0"
              name="email"
              placeholder="Enter Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email && <div className="text-danger">{formik.errors.email}</div>}
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label"><strong>Password</strong></label>
            <input
              type="password"
              className="form-control rounded-0"
              name="password"
              placeholder="Enter Password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password && <div className="text-danger">{formik.errors.password}</div>}
          </div>

          {/* Confirm Password */}
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label"><strong>Confirm Password</strong></label>
            <input
              type="password"
              className="form-control rounded-0"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword && <div className="text-danger">{formik.errors.confirmPassword}</div>}
          </div>

          <button type="submit" className="btn btn-success w-100 rounded-0 mt-4">Register</button>

          <Link to="/login" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none mt-2">
            Login
          </Link>
        </form>
      </div>
    </div>
  );
}
