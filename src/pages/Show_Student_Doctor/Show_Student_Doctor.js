import { useNavigate } from "react-router-dom";
import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { Card, Table } from "react-bootstrap";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { Bar } from "react-chartjs-2";

import "./style.css";

ChartJS.register(CategoryScale, LinearScale, BarElement);

const Show_Student_Doctor = () => {
  const [statusnot_completed1, setstatusnot_completed1] = useState([]);
  const [status_completed1, setstatus_completed1] = useState([]);
  const [status_cancel1, setstatus_cancel1] = useState([]);
  const [req1, setReq1] = useState([]);

  let statusnot_completed = [];
  let status_completed = [];
  let status_cancel = [];
  let req = [];

  var options = {
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    legend: {
      lables: {
        fontSize: 26,
      },
    },
  };

  const [students, setStudent] = useState([
    {
      student_id: "",
      student_name: "",
      registeration_id: "",
    },
  ]);
  const [clinics, setClinic] = useState({
    name: "",
    section: "",
    id: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const ShowProgressRecord = (student_id) => {
    localStorage.setItem("student_id", student_id);
    navigate("/Student_Info");
  };

  const showStudent = async (access_token, clinic_id) => {
    await axios
      .post("http://127.0.0.1:8000/api/doctor/get_clinic_students", {
        clinic_id,
        access_token,
      })
      .then((res) => {
        console.log(res);
        if (res.data.students) {
          setStudent(res.data.students);
          setClinic(res.data.clinic);
          setMessage("");
        } else if (res.data.messages) {
          setStudent([]);
          setMessage(res.data.messages);
        }
      })
      .catch((err) => console.error(err));
  };

  const showStudentProgress = async (access_token, clinic_id) => {
    await axios
      .post("http://127.0.0.1:8000/api/doctor/get_over_view", {
        clinic_id,
        access_token,
      })
      .then((res) => {
        console.log(res.data.over_view);
        for (const dataObj of res.data.over_view) {
          if (!req.includes(dataObj.name)) {
            req.push(dataObj.name);
            statusnot_completed.push(dataObj.not_completed);
            status_completed.push(dataObj.completed);
            status_cancel.push(dataObj.null);
          }
        }

        console.log(req);
        console.log(statusnot_completed);
        console.log(status_completed);
        console.log(status_cancel);
        setstatusnot_completed1(statusnot_completed);
        setstatus_completed1(status_completed);
        setstatus_cancel1(status_cancel);
        setReq1(req);
      })
      .catch((err) => console.error(err));
  };

  console.log(students, clinics);
  useEffect(() => {
    let access_token = localStorage.getItem("token");
    let clinic_id = localStorage.getItem("clinic_id");
    statusnot_completed = [];
    status_completed = [];
    status_cancel = [];
    req = [];

    setstatusnot_completed1([]);
    setstatus_completed1([]);
    setstatus_cancel1([]);
    setReq1([]);

    showStudent(access_token, clinic_id);
    showStudentProgress(access_token, clinic_id);
  }, []);

  var data = {
    labels: req1,
    datasets: [
      {
        label: "# of not_completed",
        data: statusnot_completed1, //[19, 5, 6],//data of all not compleate
        borderWidth: 1,
        backgroundColor: [
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
      },
      {
        label: "# of completed",
        data: status_completed1, //[32, 5, 6],
        borderWidth: 1,
        backgroundColor: [
          "rgba(75, 192, 192, 0.2)",
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
      },
      {
        label: "# of cancel",
        data: status_cancel1, //[19, 55, 6],
        borderWidth: 1,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
      },
    ],
    // {console.log(req);}
  };

  return (
    <div>
      <Card>
        <sapn className="m-3 text-main">section : {clinics.section}</sapn>
        {students.length > 0 ? (
          <div className="appointment7">
            <div className="d-flex flex-row overflow-auto">
              <div className="first-reservation-container17 w-100">
                <span className="fs-1">Student Info</span>
                <Table>
                  <thead>
                    <tr>
                      <th>Student Name</th>
                      <th>Student Id</th>
                      <th>Progress</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((student, index) => (
                      <Fragment key={index}>
                        <tr>
                          <td>{student.student_name}</td>
                          <td>{student.student_id}</td>
                          <td>
                            <button
                              style={{ width: "max-content" }}
                              className="btn btn-outline-info"
                              onClick={() =>
                                ShowProgressRecord(student.student_id)
                              }
                            >
                              Show Progress Record
                            </button>
                          </td>
                        </tr>
                      </Fragment>
                    ))}
                  </tbody>
                </Table>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </Card>
      <div className="appointment7">
        <div className="d-flex flex-row overflow-auto">
          <div className="first-reservation-container17 w-100">
            <Card>
              <div>
                <Bar data={data} height={400} options={options} />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Show_Student_Doctor;
