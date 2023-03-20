import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { Card, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";

const Student_Info = () => {
  const [message, setMessage] = useState("");
  const [students, setStudents] = useState({
    id: "",
    name: "",
    reg_id: "",
    reqs: [],
  });
  const [status, setStatus] = useState("");
  const [reqs, setReqs] = useState([]);
  const [reg_id, setRegId] = useState("");
  const [req_id, setReqId] = useState("");
  const [selectedOption, setSelectedOption] = useState('DEFAULT');
const [defultData,setDefultdata] =useState(true);

  console.log(reg_id,req_id,status);

  const showStudentProgress = async (access_token, clinic_id, student_id) => {
    await axios
      .post("http://127.0.0.1:8000/api/doctor/get_student_req", {
        clinic_id,
        access_token,
        student_id,
      })
      .then((res) => {
        console.log(res.data.student);
        setReqs(res.data.student.reqs);
        setStudents(res.data.student);
        // setStatus('');
      })
      .catch((err) => console.error(err));
  };

  console.log(reqs);
  console.log(students);
  console.log(reg_id,req_id,status);
  
  useEffect(() => {
    let access_token = localStorage.getItem("token");
    let clinic_id = localStorage.getItem("clinic_id");
    let student_id = localStorage.getItem("student_id");
    showStudentProgress(access_token, clinic_id, student_id);
  }, [status]);

  const navigate = useNavigate();

  const ShowMedicalRecord = (disease_id) => {
    localStorage.setItem("disease_id", disease_id);
    navigate("/Show_Medical_Record");
    console.log(disease_id);
    //هل بعرض نفس داتا تبعت المريض لرؤيه السجل ولا  نعمل صفحه جديده
  };

  // const ChangeStatus = async (reg_id, req_id, status) => {
  //   let access_token = localStorage.getItem("token");
  //   console.log("xxxx");
  //   console.log(reg_id,req_id,status);

  //   const readSection = await axios.post(
  //     "http://127.0.0.1:8000/api/doctor/update_treatment_status",
  //     {
  //       access_token,
  //       reg_id,
  //       req_id,
  //       status,
  //     }
  //   );

  //   console.log(readSection);
  //   let clinic_id = localStorage.getItem("clinic_id");
  //   let student_id = localStorage.getItem("student_id");
  //   showStudentProgress(access_token, clinic_id, student_id);
  // };

  const ChangeStatus = async (access_token, reg_id, req_id, status) => {
    console.log("xxxx");
    console.log(reg_id,req_id,status);

    const readSection = await axios.post(
      "http://127.0.0.1:8000/api/doctor/update_treatment_status",
      {
        access_token,
        reg_id,
        req_id,
        status,
      }
    );

    console.log(readSection);
    let clinic_id = localStorage.getItem("clinic_id");
    let student_id = localStorage.getItem("student_id");
    showStudentProgress(access_token, clinic_id, student_id);
  };

  useEffect(() => {
    let access_token = localStorage.getItem("token");
    if (status !== "non") {
      ChangeStatus(access_token, reg_id, req_id, status);
    }
  }, [defultData]);

  useEffect(() => {
    setSelectedOption('DEFAULT');
  }, [defultData])


  return (
    <div className="p-5">
      <div className="my-reservation-container w-100 my-res">
        <div className="d-flex flex-row overflow-auto">
          <div className="my-reservation-container w-100">
            <Card className="w-100">
              <div className="text-main">Name : {students.name}</div>
              <Table hover size="sl" className="text-center my-3">
                <thead>
                  <tr>
                    <th>Requrment</th>
                    <th>Start/End time</th>
                    <th>Patient Name</th>
                    <th>Status</th>
                    <th>Change Status</th>
                    <th>Show_Medical_Record</th>
                  </tr>
                </thead>
                <tbody>
                  {reqs.map((req, index) => (
                    <Fragment key={index}>
                      <tr>
                        <td>{req.name}</td>
                        <td>
                          {req.start_date}-{req.end_date}
                        </td>
                        <td>{req.patient_name}</td>
                        <td>{req.status}</td>
                        <td>
                          <Form.Select
                            required
                            defaultValue={selectedOption}
                            aria-label="Default select example"
                            name="status"
                            onChange={(e) => {
                              setStatus(e.target.value);
                              setRegId(students.reg_id);
                              setReqId(req.id);
                              setDefultdata(!defultData)
                              // ChangeStatus(reg_id, req_id, status)
                            }}
                          >
                            <option disabled={true} value="DEFAULT">
                              Open this select menu
                            </option>
                            <option value="completed">completed</option>
                            <option value="not completed">not completed</option>
                            <option value="canceled">canceled</option>
                          </Form.Select>
                        </td>
                        <td>
                          <button
                            className=" btn btn-outline-info w-100  d-flex justify-content-center text-center"
                            onClick={() => ShowMedicalRecord(req.disease_id)}
                          >
                            Show Medical Record
                          </button>
                        </td>
                      </tr>
                    </Fragment>
                  ))}
                </tbody>
              </Table>
            </Card>
          </div>
        </div>
      </div>

      {/* <Card>
        <div>{students.id}</div>
        <div>{students.name}</div>
        <Table>
          <thead>
            <tr>
              <th>requiremint</th>
              <th>Status</th>
              <th>Change Status</th>
              <th>Show recored</th>
            </tr>
          </thead>
          <tbody>
            {students && (
              <Fragment>
                {students.reqs.map((req, index) => (
                  <Fragment key={index}>
                    <tr>
                      <td>{req.name}</td>
                      <td>{req.status}</td>
                      <td>
                        <Form.Select
                          required
                          defaultValue={"DEFAULT"}
                          aria-label="Default select example"
                          name="address"
                          onChange={(e) => setStatus(e.target.value)}
                        >
                          <option disabled={true} value="DEFAULT">
                            Open this select menu
                          </option>
                          <option value="canceled">canceled</option>
                          <option value="not completed">not completed</option>
                          <option value="completed">completed</option>
                        </Form.Select>
                      </td>
                      <td>
                        <button style={{ width: 'max-content'}} className="btn btn-outline-info" onClick={() => ShowProgressRecord(student.student_id)}>Show Progress Record</button>
                      </td>
                    </tr>
                  </Fragment>
                ))}
              </Fragment>
            )}
          </tbody>
        </Table>
      </Card> */}
    </div>
  );
};

export default Student_Info;
