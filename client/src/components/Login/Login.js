import React from "react";
import "../../App";
import "./Login.css";
import { loginUser } from "../../api/UsersAPI";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useUser } from "../../UserContext";

export default function Login() {
  const navigate = useNavigate();
  const { setUser } = useUser();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const res = await loginUser(values);
        alert("Login successful!");

        localStorage.setItem("user", JSON.stringify(res.user));
        localStorage.setItem("token", res.token);
        setUser(res.user);

        resetForm();
        if(res.user.role === "admin") {
          navigate("/admin/dashboard");
        }
        else {
          navigate("/home"); 
        }
      } catch (error) {
        alert("Failed to login!! Please try again.");
        throw new Error(error.message);
      }
    },
  });

  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100 register">
      <div className="bg-white p-5 rounded shadow col-11 col-sm-10 col-md-8 col-lg-6 col-xl-5">
        <h2>Login</h2>
        <form onSubmit={formik.handleSubmit}>
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
            {formik.touched.email && formik.errors.email && (
              <div className="text-danger">{formik.errors.email}</div>
            )}
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
            {formik.touched.password && formik.errors.password && (
              <div className="text-danger">{formik.errors.password}</div>
            )}
          </div>

          <button type="submit" className="btn btn-success w-100 rounded-0 mt-4">
            Login
          </button>

          <Link
            to="/register"
            className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none mt-2"
          >
            Register
          </Link>
        </form>
      </div>
    </div>
  );
}
