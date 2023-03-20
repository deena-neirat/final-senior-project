import React, { useState } from "react";
import { Card } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";
import "./style.css";

const XRayPhotographer = () => {
  let [patientid, setPatientid] = useState();
  let [objPatientName, setObjPatientName] = useState();
  let [image, setImage] = useState('');

  const access_token = localStorage.getItem("token");

  function getFormValue(e) {
    setPatientid({ ...patientid, [e.target.name]: e.target.value });
  }

  function getImgValue(e) {
    setImage(e.target.files[0]);
  }

  // api use to enter patient_id to return pateint name and id and store it in local storge
  async function searchID(patient_id) {
    // let access_token = getToken();
    console.log(access_token);
    console.log(patient_id);
    const showId = await axios.post(
      "http://127.0.0.1:8000/api/radiographer/show_patient_files",
      { access_token, patient_id }
    );
    console.log(showId);
    setPatientid(showId.data.patient[0].id);
    console.log(showId.data.patient[0].id);
    setObjPatientName(showId.data.patient[0].name);
    console.log(showId.data.patient[0].name);
  }

  const sendPic = async (patient_id, image) => {
    const imageData = new FormData();
    imageData.append("access_token", access_token);
    imageData.append("patient_id", patient_id);
    imageData.append("image", image);
    await axios
      .post(
        "http://127.0.0.1:8000/api/radiographer/set_patient_image",
        imageData
      )
      .then((res) => {
        console.log(res)
        if (res.status === 200) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          console.log("Image set not successfully!");
        }
      })
      .catch((err) =>
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          footer: '<a href="">Why do I have this issue?</a>',
        })
      );
      
      setPatientid('');
      setObjPatientName('');
      setImage('');
  };

  return (
    <>
      {/*------------------------- Search for patient by using id-------------------------------*/}

      <div className="appointment3">
        <div className="d-flex flex-row overflow-auto">
          <div className="first-reservation-container13 w-100">
            <span className="fs-1">Search</span>
            <Card>
              <Card.Body className="shadow">
                <div>
                  <div className="mt-4">
                    <span htmlFor="patient_id" className="form-label">
                      ID Number :
                    </span>
                    <input
                      type="number"
                      className="form-control"
                      name="patient_id"
                      id="patient_id"
                      placeholder="patient_id"
                      onChange={getFormValue}
                    ></input>
                  </div>

                  <button
                    type="button"
                    className="btn btn-info my-4  w-75 putcenter submit-btnshow"
                    onClick={() => searchID(patientid)}
                  >
                    confirm
                  </button>
                </div>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>

      <div className="appointment4">
        <div className="d-flex flex-row overflow-auto">
          <div className="first-reservation-container14 w-100">
            <span className="fs-1">Upload the Figure</span>
            <Card>
              <Card.Body className="shadow">
                <div className="row mt-4">
                  <div className="col-12 col-md-6">
                    <label className="form-label">ID Number</label>
                    <input
                      type="number"
                      className="form-control"
                      value={patientid}
                      readOnly={true}
                    ></input>
                  </div>

                  <div className="col-12 col-md-6">
                    <label className="form-label">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={objPatientName}
                      readOnly={true}
                    ></input>
                  </div>
                  {/* ---------------------upload--------------------------------- */}
                  <div className="col-12">
                    <label htmlFor="image" className="form-label">
                      Upload Figure
                    </label>
                    <input
                      className="form-control"
                      type="file"
                      name="image"
                      id="image"
                      onChange={getImgValue}
                    />
                  </div>

                  <button
                    type="button"
                    className="btn btn-info my-4  w-25 mx-auto submit-btnshow"
                    onClick={() => sendPic(patientid, image)}
                  >
                    Send
                  </button>
                </div>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default XRayPhotographer;
