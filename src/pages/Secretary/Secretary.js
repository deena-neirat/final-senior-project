import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { Card, Table } from "react-bootstrap";
import "./style.css";
import Swal from "sweetalert2";

const Secretary = () => {
  const [showdata, setShowData] = useState([]);

  const getData = () => {
    let access_token = localStorage.getItem("token");
    show(access_token);
  };

  const api = axios.create({
    baseURL: `http://127.0.0.1:8000/api/secretary/show_initial_appointments`,
  });

  const apiSend = axios.create({
    baseURL: `http://127.0.0.1:8000/api/secretary/send_appointments`,
  });

  const show = async (access_token) => {
    let data = await api.get(`/${access_token}`).then(({ data }) => data);
    setShowData(data.initials);
  };
  console.log(showdata);

  useEffect(() => {
    getData();
  }, []);

  const sendData = async () => {
    let access_token = localStorage.getItem("token");
    let data = await apiSend.get(`/${access_token}`);
    console.log(data);
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Data has been send",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <div>
      {showdata.length > 0 ? (
        <div className="appointment">
          <div className="d-flex flex-row overflow-auto">
            <div className="first-reservation-container1 w-100">
              <span className="fs-1">Appointments</span>
              <hr />
              <Card>
                <Table key={1} hover size="sl" className="text-center my-3">
                  <thead key={1}>
                    <tr>
                      <th>Date</th>
                      <th>Day</th>
                      <th>start_time</th>
                      <th>end_time</th>
                      <th>Patient Name</th>
                      <th>Gender</th>
                    </tr>
                  </thead>
                  <tbody>
                    {showdata.map((show, index) => (
                      <Fragment key={index}>
                        <tr>
                          <td>{show.date}</td>
                          <td>{show.day}</td>
                          <td>{show.start_time}</td>
                          <td>{show.end_time}</td>
                          <td>
                            {show.patients.map((patient, index) => (
                              <>
                                <ul key={index} className="dot m-1 p-1">
                                  <li>{patient.name}</li>
                                </ul>
                              </>
                            ))}
                          </td>

                          <td>
                            {show.patients.map((patient, index) => (
                              <>
                                <ul key={index} className="dot m-1 p-1">
                                  <li>{patient.gender}</li>
                                </ul>
                              </>
                            ))}
                          </td>
                        </tr>
                      </Fragment>
                    ))}
                  </tbody>
                </Table>
              </Card>
            </div>
          </div>
          <button
            className="btn btn-outline-info submit-btn w-25 mx-auto"
            onClick={() => sendData()}
          >
            Send
          </button>
        </div>
      ) : (
        <span className="fs-1 m-5">"No Patient In This Date"</span>
      )}
    </div>
  );
};

export default Secretary;
