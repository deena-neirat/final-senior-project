import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./style.css";

export default function Patient_Info() {
  const [dataPatient, setDataPatient] = useState([]);
  const navigate = useNavigate();

  const showSelectedCoursePatient = async () => {
    let access_token = localStorage.getItem("token");
    let course_id = localStorage.getItem("course_id");

    const data = await axios.post(
      "http://127.0.0.1:8000/api/student/get_req_status",
      {
        access_token,
        course_id,
      }
    );
    console.log(data.data.student_req);
    setDataPatient(data.data.student_req);
  };
  //console.log(dataPatient)

  useEffect(() => {
    showSelectedCoursePatient();
  }, []);

  const ShowMedicalRecord = (disease_id, status) => {
    localStorage.setItem("status", status);
    localStorage.setItem("disease_id", disease_id);
    navigate("/Show_Medical_Record");
    console.log(disease_id);
    //هل بعرض نفس داتا تبعت المريض لرؤيه السجل ولا  نعمل صفحه جديده
  };

  return (
    <div>
      <div className="appointment2">
        <div className="d-flex flex-row overflow-auto">
          <div className="first-reservation-container12 w-100">
            <span className="fs-1">Patient Information</span>
            

            <Card>
                <Table
                  key={1} hover size="sl" className="text-center my-3"
                >
                  <thead key={1}>
                    <tr>
                      <th>Name</th>
                      <th>Requerment</th>
                      <th>status</th>
                      <th>start_date - end_date</th>
                      <th>
                        information<i className="fa-solid fa-user-pen p-2"></i>
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {dataPatient.map((dataTreatment, index) => (
                      <>
                        <tr>
                          <td className="align-middle">
                            {dataTreatment.patient}
                          </td>
                          <td className="align-middle">{dataTreatment.name}</td>
                          <th className="align-middle">
                            {dataTreatment.status}
                          </th>
                          <th className="align-middle">
                            {dataTreatment.start_date} -{" "}
                            {dataTreatment.end_date}
                          </th>
                          <td>
                            <button
                              type="button"
                              onClick={() =>
                                ShowMedicalRecord(
                                  dataTreatment.disease_id,
                                  dataTreatment.status
                                )
                              }
                              className="btn btn-outline-info navlinka9 mt-2"
                            >
                              <b>View</b>
                            </button>
                          </td>
                        </tr>
                      </>
                    ))}
                  </tbody>
                </Table>

            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
