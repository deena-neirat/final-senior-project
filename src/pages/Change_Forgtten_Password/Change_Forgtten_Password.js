import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Joi from "joi";
import Spinner from "react-bootstrap/Spinner";
import Swal from "sweetalert2";
import "./style.css";

const Change_Forgotten_Password = () => {
    const query = useParams();
    const [errors, setErrors] = useState({});
    let [loading, setLoading] = useState(false);

    let [user, setUser] = useState({
        user_name: query.user_name,
        password: "",
        password_confirmation: "",
    });
    const navigate = useNavigate();

    function getFormValue(e) {
        setUser({ ...user, [e.target.name]: e.target.value });
        setErrors({});
    }

    function validateForm() {
        const schema = Joi.object({
            user_name: Joi.string().required().label("user_name").messages({
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
                .required()
                .messages({
                    "string.empty": "Required",
                    "any.only":
                        "The confirm password field must match the password field.",
                }),
        });
        return schema.validate(user, { abortEarly: false });
    }

    async function submitFormData(e) {
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
            console.log({ ...user });
            await axios
                .post(`http://127.0.0.1:8000/api/change_forgotten_password`, {
                    ...user,
                })
                .then(async (res) => {
                    setLoading(false);
                    if (res.data.msg === " password changed") {
                        await Swal.fire({
                            position: "center",
                            icon: "success",
                            title: "Your Password have been reset",
                            showConfirmButton: false,
                            timer: 1500,
                        });
                        navigate("/login");
                    } else if (res.data.msg) {
                        Object.keys(res.data.msg).map((key) => {
                            setErrors({
                                ...errors,
                                [key]: res.data.msg[key][0],
                            });
                            return "";
                        });
                    }
                })
                .catch((err) => console.error(err));
        }
    }

    return (
        <>
            <div className="backeground-Rest formInputSignin">
                <h1 className="headTitleSignIn mb-4">Reset Password</h1>

                <div className="auth_card">
                    <form onSubmit={submitFormData} className="col">
                        <div className="mb-3">
                            <label
                                htmlFor="user_name"
                                className="form-label label_in_sign"
                            >
                                User Name
                            </label>
                            <input
                                onChange={getFormValue}
                                type="text"
                                className="form-control"
                                name="user_name"
                                value={query.user_name}
                                id="user_name"
                            ></input>
                            {errors.password && (
                                <p className="error_message">
                                    {errors.user_name}
                                </p>
                            )}
                        </div>

                        <div className="mb-2">
                            <label
                                htmlFor="password"
                                className="form-label label_in_sign"
                            >
                                Password
                            </label>
                            <input
                                onChange={getFormValue}
                                type="password"
                                className="form-control"
                                name="password"
                                id="password"
                            ></input>
                            {errors.password && (
                                <p className="error_message">
                                    {errors.password}
                                </p>
                            )}
                        </div>

                        <div className="mb-2">
                            <label
                                htmlFor="password_confirmation"
                                className="form-label label_in_sign"
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

                        <button className="btn btn-outline-info submit-btn w-50 mx-auto">
                            {loading ? (
                                <Spinner animation="border" variant="dark" />
                            ) : (
                                "Reset"
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Change_Forgotten_Password;
