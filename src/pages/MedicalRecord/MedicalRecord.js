import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { Card, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./style.css";

const MedicalRecord = () => {
  const [dataMedicals, setDataMedicals] = useState([]);

  const navigate = useNavigate();

  const showTable = async () => {
    let access_token = localStorage.getItem("token");
    console.log('nnnnnn')
    const dataInital = await axios.get(
      `http://127.0.0.1:8000/api/patient/get_patient_files/${access_token}`
    );
    console.log(dataInital.data.messages);
    setDataMedicals(dataInital.data.messages);
  };
  console.log(dataMedicals)

  const ShowMedicalRecord = (disease_id) => {
    localStorage.setItem("disease_id", disease_id);
    navigate("/Show_Medical_Record");
  };

  console.log(dataMedicals);

  useEffect(() => {
    showTable();
  }, []);

  return (
    <div>
      <div className="appointment">
        <h1 className="text-main fw-bold mb-3">Show Record</h1>

        <div className="d-flex flex-row overflow-auto">
          <div className="first-reservation-container1 w-100">
            {/* <span className="fs-1">Appointments</span> */}
            <hr />
            <Card>
              <Table key={1} hover size="sl" className="text-center my-3">
                <thead key={1}>
                  <tr>
                    <th>Date</th>
                    <th>treatments</th>
                    <th>treatments status</th>
                    <th>Show Medical Record</th>
                  </tr>
                </thead>
                <tbody>
                  {dataMedicals.map((dataMedical, index) => (
                    <Fragment key={index}>
                      <tr>
                        <td>{dataMedical.created_at}</td>
                        <td>
                          {dataMedical.treatments.map((treatment, index) => (
                            <>
                              <ul key={index} className="dot m-1 p-1">
                                <li>{treatment.description}</li>
                              </ul>
                            </>
                          ))}
                        </td>

                        <td>
                          {dataMedical.treatments.map((treatment, index) => (
                            <>
                              <ul key={index} className="dot m-1 p-1">
                                <li>{treatment.status}</li>
                              </ul>
                            </>
                          ))}
                        </td>
                        <td>
                        <button
                          className="btn btn-outline-info my-1"
                          onClick={() => ShowMedicalRecord(dataMedical.id)}
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
    </div>
  );
};

export default MedicalRecord;
