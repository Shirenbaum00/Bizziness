import { FunctionComponent } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

import LoginData from "../interfaces/Login";
import { loginUser } from "../services/authService";

interface LoginProps { }

const validationSchema = Yup.object({
    email: Yup.string()
        .email("Invalid email")
        .required("Email is required"),
    password: Yup.string()
        .min(7, "Password must be at least 7 characters")
        .required("Password is required"),
});

const Login: FunctionComponent<LoginProps> = () => {
    const navigate = useNavigate();

    const formik = useFormik<LoginData>({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                const response = await loginUser(values);
                localStorage.setItem("token", response.data);
                navigate("/");
            } catch {
                alert("Login failed");
            }
        },
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <div>
                <label>Email</label>
                <input
                    type="email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.email && formik.errors.email && (
                    <p>{formik.errors.email}</p>
                )}
            </div>

            <div>
                <label>Password</label>
                <input
                    type="password"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.password && formik.errors.password && (
                    <p>{formik.errors.password}</p>
                )}
            </div>

            <button type="submit" disabled={!formik.isValid || !formik.dirty}>
                Login
            </button>
        </form>
    );
};

export default Login;
