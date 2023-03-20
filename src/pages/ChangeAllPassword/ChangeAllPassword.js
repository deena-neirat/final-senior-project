import React, { useState, useEffect } from "react";
import Joi from "joi";
import { useNavigate } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import axios from "axios";
import Swal from "sweetalert2";
import "./style.css";

export default function ChangeAllPassword() {
    let navigate = useNavigate();

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    let [formData, setFormData] = useState({
        old_password: "",
        password: "",
        password_confirmation: "",
    });

    function getFormValue(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({});
    }

    function validateForm() {
        const schema = Joi.object({
            old_password: Joi.string()
                .required()
                .label("old_password")
                .messages({
                    "string.empty": "Required",
                }),
            password: Joi.string()
                .required()
                .pattern(new RegExp("[a-zA-Z0-9]{8,20}"))
                .label("password")
                .messages({
                    "string.empty": "Required",
                    "string.pattern.base": "must be greater than 8 characters",
                }),
            password_confirmation: Joi.string()
                .valid(Joi.ref("password"))
                .messages({
                    "any.only":
                        "The confirm password field must match the password field.",
                }),
        });
        return schema.validate(formData, { abortEarly: false });
    }

    const submitFormData = async (e) => {
        let access_token = localStorage.getItem("token");
        let type = localStorage.getItem("type");

        e.preventDefault();

        let result = validateForm();

        if (result.error) {
            setErrors(
                result.error.details.reduce((acc, error) => {
                    acc[error.path[0]] = error.message;
                    return acc;
                }, {})
            );
        } else {
            setLoading(true);
            await axios
                .post(`http://127.0.0.1:8000/api/change_password`, {
                    access_token,
                    ...formData,
                    type
                })
                .then(async (res) => {
                    setLoading(false);
                    await Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Your Password have been changed successfully",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    localStorage.removeItem("userData");
                    localStorage.removeItem("token");
                    localStorage.removeItem("type");
                    navigate("/login");
                })
                .catch((err) => console.error(err));
        }
    };

    return (
        <div className="backeground-SignIn1 change-password-page formInputSignin1">
            <div className="row justify-content-center align-items-center m-5 fullHeight">
                <form onSubmit={submitFormData} className="col change-password">
                    <h1 className="headTitleSignIn1">Change Password</h1>
                    <div className="mb-3">
                        <label htmlFor="old_password" className="form-label">
                            Old Password
                        </label>
                        <input
                            onChange={getFormValue}
                            type="text"
                            className="form-control"
                            name="old_password"
                            id="old_password "
                        ></input>
                        {errors.old_password && (
                            <p className="error_message">
                                {errors.old_password}
                            </p>
                        )}
                    </div>

                    <div className="mb-3">
                        <label
                            htmlFor="password"
                            className="form-label label_in_sign1"
                        >
                            New Password
                        </label>
                        <input
                            onChange={getFormValue}
                            type="password"
                            className="form-control"
                            name="password"
                            id="password"
                        ></input>
                        {errors.password && (
                            <p className="error_message">{errors.password}</p>
                        )}
                    </div>

                    <div className="mb-3">
                        <label
                            htmlFor="password_confirmation"
                            className="form-label label_in_sign1"
                        >
                            Password Confirmation
                        </label>
                        <input
                            onChange={getFormValue}
                            type="password"
                            className="form-control"
                            name="password_confirmation"
                            id="password_confirmation"
                        ></input>
                        {errors.password_confirmation && (
                            <p className="error_message">
                                {errors.password_confirmation}
                            </p>
                        )}
                    </div>

                    <button className="btn btn-outline-info submit-btn w-50 mx-auto fs-4">
                        {loading ? (
                            <Spinner animation="border" variant="dark" />
                        ) : (
                            "Submit Changes"
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}
