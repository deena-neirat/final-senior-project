import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Joi from "joi";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import Swal from "sweetalert2";
import "./style.css";

const Login = () => {
    let [user, setUser] = useState({
        user_name: "",
        password: "",
    });

    const navigate = useNavigate();

    const [errors, setErrors] = useState({});
    const [errorsBackPass , setErrorBackPass] = useState('');
    const [errorsBackUserName , setErrorBackUserName] = useState('');
    let [loading, setLoading] = useState(false);

    const switchNavigate = (data) => {
        switch (data.type) {
            case "students":
                navigate("/student");
                break;
            case "doctors":
                navigate("/doctor");
                break;
            case "radiographers":
                navigate("/x-ray-photographer");
                break;
            case "secretaries":
                navigate("/ShowAppointment");
                break;
            case "assistants":
                navigate("/Assistant");
                break;
            case "patients":
                // if (data.initial === null) {
                    navigate("/first-reservation");
                // } else {
                //     navigate("/patient");
                // }
                break;
            case "admins":
                navigate("/Admin");
                break;
            default:
                break;
        }
    };

    const submitFormData = async (e) => {
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
                .post("http://127.0.0.1:8000/api/login", user)
                .then((res) => {
                    setLoading(false);
                    console.log(res);
                    if(res.data.message !== 'password not correct'){
                        localStorage.setItem("token", res.data.access_token);
                        localStorage.setItem("type", res.data.type);
                        localStorage.setItem("userData", JSON.stringify(res.data));
                        switchNavigate(res.data);
                    }else{
                        setErrorBackPass(res.data.message)
                        console.log(errorsBackPass)
                    }

                    if(res.data.message === 'We have sent a verification code to your phone, please verifiy your account.'){
                        if (res.data.id) {
                            let id = res.data.id;
                            Swal.fire({
                                title: res.data.message,
                                input: "text",
                                inputLabel: "Your code send",
                                inputPlaceholder: "Enter your key",
                                allowOutsideClick: false,
                                allowEscapeKey: false,
                                inputValidator: async (value) => {
                                    if (!value) {
                                        return "You need to enter a value";
                                    } else {
                                        let key = value;
                                        return await axios
                                            .post(
                                                "http://127.0.0.1:8000/api/patient/mobile_verification",
                                                { id: id, key: key }
                                            )
                                            .then((res) => {
                                                if (
                                                    res.data.messages ===
                                                    "incorrect verification code"
                                                ) {
                                                    return "Incorrect Verification Code";
                                                } else {
                                                    // setInfoStu(res.data);
                                                    navigate("/login");
                                                    Swal.fire({
                                                        position: "center",
                                                        icon: "success",
                                                        title: "You've selected a first reservation",
                                                        showConfirmButton: false,
                                                        timer: 1500,
                                                      });
                                                }
                                            })
                                            .catch((err) => console.error(err));
                                    }
                                },
                            });
                        }
                    }

                    
                })
                .catch((err) => 
                {console.error(err)
                setErrorBackUserName('User Name Not Correct')
                setLoading(false);
                setErrorBackPass('Password Not Correct')

                });
        }
    };

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
                .pattern(new RegExp("[a-zA-Z0-9]{3,20}"))
                .label("password")
                .messages({
                    "string.empty": "Required",
                }),
        });
        return schema.validate(user, { abortEarly: false });
    }

    const forgetPass = async () => {
        Swal.fire({
            title: "Please enter your username",
            input: "text",
            inputPlaceholder: "Enter your username",
            inputValidator: async (value) => {
                if (!value) {
                    return "You need to enter a value";
                } else {
                    let user_name = value;
                    return await axios
                        .post(`http://127.0.0.1:8000/api/forget_password`, {
                            user_name,
                        })
                        .then((res) => {
                            if (res.data.user_name) {
                                Swal.fire({
                                    title: res.data.message,
                                    input: "text",
                                    inputLabel: "Your code send",
                                    inputPlaceholder: "Enter your key",
                                    inputValidator: async (value) => {
                                        if (!value) {
                                            return "You need to enter a value";
                                        } else {
                                            let key = value;
                                            return await axios
                                                .post(
                                                    "http://127.0.0.1:8000/api/password_verification",
                                                    {
                                                        user_name: user_name,
                                                        key: key,
                                                    }
                                                )
                                                .then(async (res) => {
                                                    if (
                                                        res.data.message ===
                                                        "verified successfully"
                                                    ) {
                                                        await Swal.fire({
                                                            position: "center",
                                                            icon: "success",
                                                            title: res.data
                                                                .message,
                                                            showConfirmButton: false,
                                                            timer: 1500,
                                                        });
                                                        navigate(
                                                            `/Change_Forgotten_Password/${user_name}`
                                                        );
                                                    } else {
                                                        return res.data.message;
                                                    }
                                                })
                                                .catch((err) =>
                                                    console.error(err)
                                                );
                                        }
                                    },
                                });
                            } else {
                                return res.data.message;
                            }
                        })
                        .catch((err) => console.error(err));
                }
            },
        });
    };

    return (
        <div className="backeground-SignIn formInputSignin">
            <h1 className="headTitleSignIn mb-4">LogIn</h1>

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
                            id="user_name"
                        ></input>
                        {errors.password && (
                            <p className="error_message">{errors.user_name}</p>
                        )}
                        {errorsBackUserName?<p className="error_message">{errorsBackUserName}</p>:""}
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
                            <p className="error_message">{errors.password}</p>
                            )}
                        {errorsBackPass? <p className="error_message">{errorsBackPass}</p> :''}
                    </div>
                    <p className="forget-password" onClick={forgetPass}>
                        Did you forget a password?
                    </p>

                    <button className="btn btn-outline-info submit-btn w-50 mx-auto">
                        {loading ? (
                            <Spinner animation="border" variant="dark" />
                        ) : (
                            "Login"
                        )}
                    </button>
                    <span className="or-text">OR</span>
                    <button
                        type="button"
                        className="btn btn-outline-info submit-btn w-50 mx-auto"
                        onClick={() => navigate("/signUp")}
                    >
                        SignUp
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
