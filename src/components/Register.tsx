import { useFormik } from "formik";
import { FunctionComponent, useState } from "react";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { registerUser } from "../services/authService";
import RegisterData from "../interfaces/Register";

interface RegisterProps { }

const Register: FunctionComponent<RegisterProps> = () => {
    const navigate = useNavigate();

    const [successMsg, setSuccessMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const formik = useFormik({
        initialValues: {
            name: {
                first: "",
                last: "",
            },
            phone: "",
            email: "",
            password: "",
            image: {
                url: "",
            },
            address: {
                country: "",
                city: "",
                street: "",
                houseNumber: 0,
                zip: 0,
            },
            userType: "client",
        },

        validationSchema: yup.object({
            name: yup.object({
                first: yup.string().required("First name is required").min(2),
                last: yup.string().required("Last name is required").min(2),
            }),
            phone: yup.string().required("Phone is required"),
            email: yup.string().email("Invalid email").required("Email is required"),
            password: yup
                .string()
                .required("Password is required")
                .min(7, "Password must be at least 7 characters"),
            image: yup.object({
                url: yup
                    .string()
                    .url("Must be a valid URL")
                    .required("Image URL is required"),
            }),
            address: yup.object({
                country: yup.string().required("Country is required"),
                city: yup.string().required("City is required"),
                street: yup.string().required("Street is required"),
                houseNumber: yup
                    .number()
                    .typeError("House number must be a number")
                    .required("House number is required"),
                zip: yup
                    .number()
                    .typeError("ZIP must be a number")
                    .required("ZIP is required"),
            }),
            userType: yup.string().oneOf(["client", "business"]),
        }),

        onSubmit: (values) => {
            setSuccessMsg("");
            setErrorMsg("");

            const payload: RegisterData = {
                name: {
                    first: values.name.first.trim(),
                    last: values.name.last.trim(),
                },
                phone: values.phone.trim(),
                email: values.email.trim(),
                password: values.password,
                image: {
                    url: values.image.url.trim(),
                    alt: "user profile picture",
                },
                address: {
                    country: values.address.country.trim(),
                    city: values.address.city.trim(),
                    street: values.address.street.trim(),
                    houseNumber: Number(values.address.houseNumber),
                    zip: Number(values.address.zip),
                },
                isBusiness: values.userType === "business",
            };

            registerUser(payload)
                .then(() => {
                    setSuccessMsg("Registration successful! Redirecting to login...");
                    setTimeout(() => navigate("/login"), 1500);
                })
                .catch((error) => {
                    if (axios.isAxiosError(error)) {
                        if (error.response?.data?.message) {
                            setErrorMsg(error.response.data.message);
                        } else if (error.request) {
                            setErrorMsg(
                                "No response from server. Please check your internet connection."
                            );
                        } else {
                            setErrorMsg("Unexpected error occurred. Please try again.");
                        }
                    } else {
                        setErrorMsg("An unknown error occurred.");
                    }
                });
        },
    });

    return (
        <div className="page">
            <h2>Register</h2>

            {successMsg && <p style={{ color: "green" }}>{successMsg}</p>}
            {errorMsg && <p>{errorMsg}</p>}

            <form onSubmit={formik.handleSubmit}>
                <input
                    name="name.first"
                    placeholder="First name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.name?.first && formik.errors.name?.first && (
                    <p>{formik.errors.name.first}</p>
                )}

                <input
                    name="name.last"
                    placeholder="Last name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.name?.last && formik.errors.name?.last && (
                    <p>{formik.errors.name.last}</p>
                )}

                <input
                    name="phone"
                    placeholder="Phone"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.phone && formik.errors.phone && (
                    <p>{formik.errors.phone}</p>
                )}

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.email && formik.errors.email && (
                    <p>{formik.errors.email}</p>
                )}

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.password && formik.errors.password && (
                    <p>{formik.errors.password}</p>
                )}

                <input
                    name="image.url"
                    placeholder="Profile image URL"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.image?.url && formik.errors.image?.url && (
                    <p>{formik.errors.image.url}</p>
                )}

                <input
                    name="address.country"
                    placeholder="Country"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                <input
                    name="address.city"
                    placeholder="City"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                <input
                    name="address.street"
                    placeholder="Street"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                <input
                    type="number"
                    name="address.houseNumber"
                    placeholder="House number"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                <input
                    type="number"
                    name="address.zip"
                    placeholder="ZIP"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />

                <select
                    name="userType"
                    value={formik.values.userType}
                    onChange={formik.handleChange}
                >
                    <option value="client">Client</option>
                    <option value="business">Business</option>
                </select>

                <button type="submit" disabled={!formik.isValid || !formik.dirty}>
                    Register
                </button>
            </form>

            <Link to="/login">Already have an account? Login here</Link>
        </div>
    );
};

export default Register;
