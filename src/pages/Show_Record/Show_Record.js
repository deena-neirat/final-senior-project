import axios from "axios";
import React, { Fragment, useState } from "react";
import { Card, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Show_Record = () => {
  const access_token = localStorage.getItem("token");
  let [patientid, setPatientid] = useState();
  let [objdata, setObjData] = useState({
    created_at: "",
    id: "",
    treatments: "",
  });
  const [isSelected, setIsSelected] = useState(false);

  function getFormValue(e) {
    setPatientid({ ...patientid, [e.target.name]: e.target.value });
  }

  async function searchID(patient_id) {
    console.log(access_token);
    console.log(patient_id);
    const showId = await axios.post(
      "http://127.0.0.1:8000/api/assistant/get_patient_files",
      { access_token, patient_id }
    );
    setIsSelected(true);
    console.log(showId.data.diseases);
    setObjData(showId.data.diseases);

    //{objdata.map}
  }

  console.log(objdata);
  const navigate = useNavigate();

  const ShowMedicalRecord = (disease_id) => {
    localStorage.setItem("disease_id", disease_id);
    navigate("/Show_Medical_Record");
    console.log(disease_id);
    //هل بعرض نفس داتا تبعت المريض لرؤيه السجل ولا  نعمل صفحه جديده
  };

  return (
    <div className="p-5">
      <div className="my-reservation-container w-100 my-res">
        <div className="d-flex flex-row overflow-auto">
          <div className="my-reservation-container w-100">
            <Card className="w-100">
              <h2 className="text-main">Search</h2>
              <Card.Body className="shadow">
                <div className="row mt-4">
                  <div className="col">
                    <input
                      type="number"
                      className="form-control"
                      name="patient_id"
                      id="patient_id"
                      placeholder="patient_id"
                      onChange={getFormValue}
                    ></input>
                  </div>
                  <div className="col">
                    <button
                      type="button"
                      className="btn btn-outline-info w-100"
                      onClick={() => searchID(patientid)}
                    >
                      Send
                    </button>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>

      {isSelected && (
        <div className="my-reservation-container w-100 my-res">
          <div className="d-flex flex-row overflow-auto">
            <div className="my-reservation-container w-100">
              <Card className="w-100">
                <Table hover size="sl" className="text-center my-3">
                  <thead key={1}>
                    <tr>
                      <th>created_at</th>
                      <th>treatments</th>
                      <th>Status</th>
                      <th>Show medical</th>
                    </tr>
                  </thead>
                  <tbody>
                    {objdata.map((init, index) => (
                      <Fragment key={index}>
                        {console.log(objdata)}
                        <tr>
                          <td>{init.created_at}</td>

                          <td>
                            {console.log(init)}
                            {init.treatments.map((tratdata, index) => (
                              <ol>
                                <li>{tratdata.requirement}</li>
                              </ol>
                            ))}
                          </td>

                          <td>
                            {init.treatments.map((tratdata, index) => (
                              <ol>
                                <li>{tratdata.status}</li>
                              </ol>
                            ))}
                          </td>
                          <td>
                            {/* {init.treatments != 0 ? ( */}
                              <>
                                <button
                                  className=" btn btn-outline-info w-100  d-flex justify-content-center text-center"
                                  onClick={() => ShowMedicalRecord(init.id)}
                                >
                                  Show Medical Record
                                </button>
                              </>
                             {/* ) : (
                              ""
                            )}  */}
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
      )}
    </div>
  );
};

export default Show_Record;
