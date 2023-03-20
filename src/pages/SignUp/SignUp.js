import React, { useState } from "react";
import Joi from "@hapi/joi";
import axios from "axios";
import MuiPhoneNumber from "material-ui-phone-number";
import { useNavigate } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import Form from "react-bootstrap/Form";
import Swal from "sweetalert2";
import "./style.css";

const SignUp = () => {
    let [user, setUser] = useState({
        firstName: "",
        middleName: "",
        lastName: "",
        id: "",
        password: "",
        password_confirmation: "",
        date_of_birth: "",
        gender: "",
        address: "",
        phone: "",
    });

    const [errors, setErrors] = useState({});
    let [loading, setLoading] = useState(false);
    let [infoStu, setInfoStu] = useState("");
    let navigate = useNavigate();

    const handleChangePhone = (value) => {
        setErrors({});
        setUser({ ...user, phone: value });
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
                .post("http://127.0.0.1:8000/api/patient/register", user)
                .then((res) => {
                    console.log(res)
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
                                                setInfoStu(res.data);
                                                navigate("/login");
                                            }
                                        })
                                        .catch((err) => console.error(err));
                                }
                            },
                        });
                    } else if (res.data.msg) {
                        Object.keys(res.data.msg).map((key) => {
                            setErrors({
                                ...errors,
                                [key]: res.data.msg[key][0],
                            });
                        });
                    }
                    setLoading(false);
                })
                .catch((err) => console.error(err));
        }
    };

    function getFormValue(e) {
        let myUser = { ...user };
        myUser[e.target.name] = e.target.value;
        setUser(myUser);
        setErrors({});
    }

    const validateForm = () => {
        const schema = Joi.object({
            firstName: Joi.string().required().label("firstName").messages({
                "string.empty": "Required",
            }),
            middleName: Joi.string().required().label("middleName").messages({
                "string.empty": "Required",
            }),
            lastName: Joi.string().required().label("lastName").messages({
                "string.empty": "Required",
            }),
            id: Joi.number().required().label("id").messages({
                "number.base": "Must enter a number",
                "number.empty": "Required",
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
            gender: Joi.string().required().label("gender").messages({
                "string.empty": "Required",
            }),
            date_of_birth: Joi.date()
                .required()
                .label("date_of_birth")
                .messages({
                    "date.base": "Must enter a date",
                    "date.empty": "Required",
                }),
            phone: Joi.number().required().label("phone").messages({
                "number.base": "Must enter a number",
                "number.empty": "Required",
            }),
            address: Joi.string().required().label("address").messages({
                "string.empty": "Required",
            }),
        });
        return schema.validate(user, { abortEarly: false });
    };

    return (
        <div id="signUp" className="backeground-SignUp formInput">
            <h1 className="headTitle mb-4">SignUp</h1>
            <div className="auth_card">
                <form onSubmit={submitFormData} className="col signUp_form">
                    <div className="row">
                        <div className="col-sm-12 col-md-4">
                            <label
                                htmlFor="firstName"
                                className="form-label label_input"
                            >
                                First Name
                            </label>
                            <label style={{ color: "red" }}>*</label>
                            <input
                                onChange={getFormValue}
                                type="text"
                                className="form-control"
                                name="firstName"
                                id="firstName"
                            ></input>
                            {errors.firstName && (
                                <p className="error_message">
                                    {errors.firstName}
                                </p>
                            )}
                        </div>
                        <div className="col-sm-12 col-md-4">
                            <label
                                htmlFor="middleName"
                                className="form-label label_input"
                            >
                                Middle Name
                            </label>
                            <label style={{ color: "red" }}>*</label>
                            <input
                                onChange={getFormValue}
                                type="text"
                                className="form-control"
                                name="middleName"
                                id="middleName"
                            ></input>
                            {errors.middleName && (
                                <p className="error_message">
                                    {errors.middleName}
                                </p>
                            )}
                        </div>
                        <div className="col-sm-12 col-md-4">
                            <label
                                htmlFor="lastName"
                                className="form-label label_input"
                            >
                                Last Name
                            </label>
                            <label style={{ color: "red" }}>*</label>
                            <input
                                onChange={getFormValue}
                                type="text"
                                className="form-control"
                                name="lastName"
                                id="lastName"
                            ></input>
                            {errors.lastName && (
                                <p className="error_message">
                                    {errors.lastName}
                                </p>
                            )}
                        </div>
                    </div>

                    <div>
                        <label htmlFor="id" className="form-label label_input">
                            User Name
                        </label>
                        <label style={{ color: "red" }}>*</label>
                        <input
                            onChange={getFormValue}
                            type="number"
                            className="form-control"
                            placeholder="Identification Number [Entert 9 number]"
                            name="id"
                            id="id"
                        ></input>
                        {errors.id && (
                            <p className="error_message">{errors.id}</p>
                        )}
                    </div>

                    <div className="mb-3">
                        <label
                            htmlFor="password"
                            className="form-label label_input"
                        >
                            Password
                        </label>
                        <label style={{ color: "red" }}>*</label>
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
                            className="form-label label_input"
                        >
                            Confirm Password
                        </label>
                        <label style={{ color: "red" }}>*</label>
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

                    <div className="mb-3">
                        <label
                            htmlFor="date_of_birth"
                            className="form-label label_input"
                        >
                            Date of Birth
                        </label>
                        <label style={{ color: "red" }}>*</label>
                        <input
                            onChange={getFormValue}
                            type="date"
                            className="form-control"
                            name="date_of_birth"
                            id="date_of_birth"
                        />
                        {errors.date_of_birth && (
                            <p className="error_message">
                                {errors.date_of_birth}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="form-label me-4 label_input">
                            Gender<span style={{ color: "red" }}>*</span> :
                        </label>
                        <input
                            onChange={getFormValue}
                            type="radio"
                            id="male"
                            name="gender"
                            value="male"
                        />
                        <label
                            htmlFor="male"
                            className="form-label label_input male"
                        >
                            Male
                        </label>
                        <input
                            onChange={getFormValue}
                            type="radio"
                            id="female"
                            name="gender"
                            value="female"
                        />
                        <label
                            htmlFor="female"
                            className="form-label label_input"
                        >
                            Female
                        </label>
                        <br />
                        {errors.gender && (
                            <p className="error_message">{errors.gender}</p>
                        )}
                    </div>

                    <div>
                        <label className="form-label me-4 label_input">
                            Address<span style={{ color: "red" }}>*</span> :
                        </label>
                        <Form.Select
                            required
                            defaultValue={"DEFAULT"}
                            aria-label="Default select example"
                            name="address"
                            onChange={getFormValue}
                        >
                            <option disabled={true} value="DEFAULT">
                                Open this select menu
                            </option>
                            <option value="Jenin">Jenin</option>
                            <option value="Nablus">Nablus</option>
                            <option value="Ramallah">Ramallah</option>
                            <option value="Jabaa">Jabaa</option>
                            <option value="Khalil">Khalil</option>
                            <option value="Tubas">Tubas</option>
                        </Form.Select>
                        {errors.address && (
                            <p className="error_message">{errors.address}</p>
                        )}
                    </div>

                    <div className="mb-3">
                        <label
                            htmlFor="phone"
                            className="form-label label_input"
                        >
                            Phone
                        </label>
                        <label style={{ color: "red" }}>*</label>
                        <MuiPhoneNumber
                            defaultCountry={"lb"}
                            name="phone"
                            value={user.phone}
                            inputClass="form-control phone-input"
                            onChange={handleChangePhone}
                        />
                        {errors.phone && (
                            <p className="error_message">{errors.phone}</p>
                        )}
                    </div>

                    <button className="btn btn-outline-info submit-btn w-50 mx-auto">
                        {loading ? (
                            <Spinner animation="border" variant="dark" />
                        ) : (
                            "Register"
                        )}
                    </button>

                    <span className="or-text">OR</span>
                    <button
                        type="button"
                        className="btn btn-outline-info submit-btn w-50 mx-auto"
                        onClick={() => navigate("/login")}
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
