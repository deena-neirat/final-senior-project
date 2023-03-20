import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import { Card, Container } from "react-bootstrap";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./style.css";

const FirstReservation = ({ date }) => {
    const [dateRes, setDateRes] = useState([]);
    const [userData, setUserData] = useState();
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(true);
    const [initialData, setInitialData] = useState([]);
    const [selectInit, setselectInit] = useState({
        id: "",
        day: "",
        date: "",
        start_time: "",
        end_time: "",
    });
    const navigate = useNavigate();

    const getData = () => {
        let access_token = localStorage.getItem("token");
        // setUserData(userData);
        showDateFirstRes(access_token);
    };

    const sendChooseData = async (id, day, date, start_time, end_time) => {
        // const infoSelect = { id, day, date, start_time, end_time };
        let access_token = userData.access_token;

        // await axios
        //     .post("http://127.0.0.1:8000/api/patient/select_initial", {
        //         access_token,
        //         id,
        //     })
        //     .then(async (res) => {
        //         if (res.data.bookings_num) {
        //             let newUserInfo = {
        //                 ...userData,
        //                 initial: { day, date, start_time, end_time },
        //                 patient: {
        //                     ...userData.patient,
        //                     initial_id: id,
        //                     bookings_num: userData.patient.bookings_num + 1,
        //                 },
        //             };
        //             localStorage.setItem(
        //                 "userData",
        //                 JSON.stringify(newUserInfo)
        //             );
        //             Swal.fire({
        //                 position: "top-end",
        //                 icon: "success",
        //                 title: "You've selected a first reservation",
        //                 showConfirmButton: false,
        //                 timer: 1500,
        //             });
        //             navigate("/patient");
        //         } else {
        //             Swal.fire({
        //                 position: "top-end",
        //                 icon: "error",
        //                 title: `${res.data.messages}`,
        //             });
        //         }
        //     })
        //     .catch((err) => console.error(err));
    };

    const updateChooseData = async (id, day, date, start_time, end_time) => {
        // const infoSelect = { id, day, date, start_time, end_time };
        let access_token = userData.access_token;
        // if (userData.patient.bookings_num > 2) {
        //     Swal.fire({
        //         position: "top-end",
        //         icon: "error",
        //         title: `You can't update a reservation more than 3 times`,
        //     });
        // } else if (userData.patient.bookings_num === 2) {
        //     Swal.fire({
        //         title: "Are you sure?",
        //         text: "This is the last chance to update a reservation",
        //         icon: "warning",
        //         showCancelButton: true,
        //         confirmButtonColor: "#d33",
        //         cancelButtonColor: "#3085d6",
        //         confirmButtonText: "Yes, update it!",
        //     }).then(async (result) => {
        //         if (result.isConfirmed) {
        //             await axios
        //                 .post(
        //                     "http://127.0.0.1:8000/api/patient/update_initial",
        //                     {
        //                         access_token,
        //                         id,
        //                     }
        //                 )
        //                 .then(async (res) => {
        //                     // console.log(res);
        //                     if (res.data.select) {
        //                         let newUserInfo = {
        //                             ...userData,
        //                             initial: {
        //                                 day,
        //                                 date,
        //                                 start_time,
        //                                 end_time,
        //                             },
        //                             patient: {
        //                                 ...userData.patient,
        //                                 initial_id: id,
        //                                 bookings_num:
        //                                     userData.patient.bookings_num + 1,
        //                             },
        //                         };
        //                         localStorage.setItem(
        //                             "userData",
        //                             JSON.stringify(newUserInfo)
        //                         );
        //                         Swal.fire({
        //                             position: "top-end",
        //                             icon: "success",
        //                             title: "You've selected a first reservation",
        //                             showConfirmButton: false,
        //                             timer: 1500,
        //                         });
        //                         navigate("/patient");
        //                     } else {
        //                         Swal.fire({
        //                             position: "top-end",
        //                             icon: "error",
        //                             title: `${res.data.messages}`,
        //                         });
        //                     }
        //                 })
        //                 .catch((err) => console.error(err));
        //         }
        //     });
        // } else {
        //     await axios
        //         .post("http://127.0.0.1:8000/api/patient/update_initial", {
        //             access_token,
        //             id,
        //         })
        //         .then(async (res) => {
        //             // console.log(res);
        //             if (res.data.select) {
        //                 let newUserInfo = {
        //                     ...userData,
        //                     initial: {
        //                         day,
        //                         date,
        //                         start_time,
        //                         end_time,
        //                     },
        //                     patient: {
        //                         ...userData.patient,
        //                         initial_id: id,
        //                         bookings_num: userData.patient.bookings_num + 1,
        //                     },
        //                 };
        //                 localStorage.setItem(
        //                     "userData",
        //                     JSON.stringify(newUserInfo)
        //                 );
        //                 Swal.fire({
        //                     position: "top-end",
        //                     icon: "success",
        //                     title: "You've selected a first reservation",
        //                     showConfirmButton: false,
        //                     timer: 1500,
        //                 });
        //                 navigate("/patient");
        //             } else {
        //                 Swal.fire({
        //                     position: "top-end",
        //                     icon: "error",
        //                     title: `${res.data.messages}`,
        //                 });
        //             }
        //         })
        //         .catch((err) => console.error(err));
        // }
    };

    const switchCases = (seats) => {
        let status = "";
        if (seats >= 4) {
            status = "green";
        } else if (seats >= 1 && seats <= 3) {
            status = "orange";
        } else {
            status = "red";
        }
        return status;
    };

    const showDateFirstRes = async (access_token) => {
        setDateRes([]);
        setMessage("");
        await axios
            .post(
                "http://127.0.0.1:8000/api/patient/show_selected_date_initials",
                { date, access_token }
            )
            .then((res) => {
                console.log(res);
                if (res.data.initials) {
                    setDateRes(res.data.initials);
                    setMessage("");
                } else if (res.data.messages) {
                    setDateRes([]);
                    setMessage(res.data.messages);
                }
                setLoading(false);
            })
            .catch((err) => console.error(err));
    };

    useEffect(() => {
        getData();
    }, [date]);

    return (
        <div className="first-reservation-section w-50 react_calender">
            {/* vertical tab */}
            <div className="overflow-auto d-flex flex-row ">
                <div className="first-reservation-container w-100">
                    <Card className="w-100">
                        <span>Day: {date}</span>
                        <Table
                            key={1}
                            // striped
                            hover
                            size="sl"
                            className="text-center my-3 table-borderless"
                        >
                            <thead key={1}>
                                <tr>
                                    {/* <th>Day</th>
                                    <th>Date</th> */}
                                    <th>Start_Time</th>
                                    <th>End_Time</th>
                                    <th>Select</th>
                                    {/* <th>Number Of Seats</th>
                                    <th>Determine</th> */}
                                </tr>
                            </thead>
                            {dateRes.length > 0 ? (
                                <tbody>
                                    {dateRes.map((initial, index) => (
                                        <Fragment key={index}>
                                            <tr>
                                                {/* <th>{initial.day}</th>
                                                <td>{initial.date}</td> */}
                                                <td>{initial.start_time}</td>
                                                <td>{initial.end_time}</td>
                                                <td>
                                                    <button
                                                        type="button"
                                                        className="btn btn-outline-info"
                                                        onClick={() =>{}
                                                        }
                                                    >
                                                        view more
                                                    </button>
                                                </td>

                                                {/* <td
                                                    className={switchCases(
                                                        initial.seats
                                                    )}
                                                >
                                                    {initial.seats}
                                                </td>
                                                <td>
                                                    {!loading &&
                                                    userData.initial ===
                                                        null ? (
                                                        <Link
                                                            type="button"
                                                            className={`btn submit-btn btn-info m-auto navlinka6 ${
                                                                userData.patient
                                                                    .initial_id ===
                                                                    initial.id ||
                                                                userData.patient
                                                                    .bookings_num >
                                                                    2
                                                                    ? "disabled"
                                                                    : ""
                                                            }`}
                                                            onClick={() => {
                                                                sendChooseData(
                                                                    initial.id,
                                                                    initial.day,
                                                                    initial.date,
                                                                    initial.start_time,
                                                                    initial.end_time
                                                                );
                                                            }}
                                                        >
                                                            select
                                                        </Link>
                                                    ) : (
                                                        <Link
                                                            type="button"
                                                            className={`btn submit-btn btn-info m-auto navlinka6 ${
                                                                userData.patient
                                                                    .initial_id ===
                                                                    initial.id ||
                                                                userData.patient
                                                                    .bookings_num >
                                                                    2
                                                                    ? "disabled"
                                                                    : ""
                                                            }`}
                                                            onClick={() => {
                                                                updateChooseData(
                                                                    initial.id,
                                                                    initial.day,
                                                                    initial.date,
                                                                    initial.start_time,
                                                                    initial.end_time
                                                                );
                                                            }}
                                                        >
                                                            update
                                                        </Link>
                                                    )}
                                                </td> */}
                                            </tr>
                                        </Fragment>
                                    ))}
                                </tbody>
                            ) : (
                                ""
                            )}
                        </Table>
                        <span className="message">{message && message}</span>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default FirstReservation;
