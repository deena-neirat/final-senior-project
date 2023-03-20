import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { Card, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./style.css";

const MyReservation = () => {
  const [next, setNext] = useState();
  const [inits, setInits] = useState();

  const [isSelected, setIsSelected] = useState(false);
  const [isSelectedInit, setIsSelectedInit] = useState(false);
  const [deleteSelected,setDeletSelected] = useState(false)
  const navigate = useNavigate();

  const showNext = async () => {
    let access_token = localStorage.getItem("token");
    const dataInital = await axios.get(
      `http://127.0.0.1:8000/api/patient/get_next_treatments/${access_token}`
    );
    console.log(dataInital);
    setNext(dataInital.data.treatments);
    setIsSelected(true);
    setIsSelectedInit(false);
  };

  const showInitial = async () => {
    let access_token = localStorage.getItem("token");
    const dataInital = await axios.get(
      `http://127.0.0.1:8000/api/patient/get_reserved_initials/${access_token}`
    );
    console.log(dataInital);
    setInits(dataInital.data.initials);
    setIsSelectedInit(true);
    setIsSelected(false);
  };

  // useEffect(() => {
  //   showNext();
  // }, []);

  useEffect(() => {
    showNext();
  }, [deleteSelected]);

  // ------------------------ShowMedicalRecord-----------------------

  const ShowMedicalRecord = (disease_id) => {
    localStorage.setItem("disease_id", disease_id);
    navigate("/Show_Medical_Record");
  };

  //--------------------------------------

  const deleteNextTratment = async(treatment_id) => {
    
    console.log(treatment_id)
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You will cancel your reservation Do you want to confirm this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it!",
    });
    if (result.isConfirmed) {

      let access_token = localStorage.getItem("token");
      const deleteNext = await axios.post(
        "http://127.0.0.1:8000/api/patient/cancel_treatment",
        { treatment_id, access_token }
      );
      console.log(deleteNext);
      Swal.fire("Cancel!", "Your reservation has been cancelled.", "success");
      setDeletSelected(false)
    }
  
  }
  return (
    <div className="p-3">
      <div className="row justify-content-center text-center ">
        <h1 className="text-main mb-3">My Reservation</h1>
        <div className="col-6 px-4">
          <button
            style={
              isSelectedInit
                ? {
                    transform: "scale(1.05 ,1.25)",
                    fontWeight: "bold",
                    borderBottom: "#19aae6 solid 2px",
                    backgroundColor: "black",
                  }
                : null
            }
            type="button"
            className="btn btn-outline-info  mt-4 w-100"
            onClick={() => showInitial()}
          >
            Initial Examinations
          </button>
        </div>

        <div className="col-6 px-4">
          <button
            style={
              isSelectedInit
                ? null
                : {
                    transform: "scale(1.05 ,1.25)",
                    fontWeight: "bold",
                    borderBottom: "#19aae6 solid 2px",
                    backgroundColor: "black",
                  }
            }
            type="button"
            className="btn btn-outline-info  mt-4  w-100"
            onClick={() => showNext()}
          >
            Next Treatment
          </button>
        </div>
      </div>
      {/* -------------------------------inital tratment table------------------------------ */}

      {isSelectedInit && (
        <div className="my-reservation-container w-100 my-res">
          <div className="d-flex flex-row overflow-auto">
            <div className="my-reservation-container w-100">
              <Card className="w-100">
                <Table hover size="sl" className="text-center my-3">
                  <thead key={1}>
                    <tr>
                      <th>Patient_Id</th>
                      <th>Date</th>
                      <th>Day</th>
                      <th>Start_Time</th>
                      <th>End_Time</th>
                      <th>Medical Record</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inits.map((init, index) => (
                      <Fragment key={index}>
                        <tr>
                          <td>{init.patient_id}</td>
                          <td>{init.date}</td>
                          <td>{init.day}</td>
                          <td>{init.start_time}</td>
                          <td>{init.end_time}</td>
                            {/* {console.log(init.disease_id)} */}
                          {/* <td>{init.sta}</td> */}
                          <td>
                            {init.disease_id ? (
                              <>
                                <button
                                  style={{ width: "max-content" }}
                                  className="btn btn-outline-info"
                                  onClick={() =>
                                    ShowMedicalRecord(init.disease_id)
                                  }
                                >
                                  Show Medical Record
                                </button>
                              </>
                            ) : (
                              ""
                            )}
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

      {/* -------------------------------next tratment table ----------------------------- */}
      {isSelected &&  (
        <div className="my-reservation-container w-100 my-res">
          <div className="d-flex flex-row overflow-auto">
            <div className="my-reservation-container w-100">
              <Card className="w-100">
                <Table hover size="sl" className="text-center my-3">
                  <thead key={1}>
                    <tr>
                      <th>Name Student</th>
                      <th>Day</th>
                      <th>Time</th>
                      <th>Date</th>
                      <th>Phone Student</th>
                      <th>Hall</th>
                      <th>Tooth</th>
                      <th>Tooth Number</th>
                      <th>Description</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {next.map((nexts, index) => (
                      <Fragment key={index}>
                        <tr>
                          <td>{nexts.name}</td>
                          <td>{nexts.day}</td>
                          <td>
                            {nexts.start_time}-{nexts.end_time}
                          </td>
                          <td>
                            {nexts.start_date}-{nexts.end_date}
                          </td>
                          <td>{nexts.phone}</td>
                          <td>{nexts.hall}</td>
                          <td>{nexts.tooth}</td>
                          <td>{nexts.tooth_id}</td>
                          <td>{nexts.description}</td>
                          <td><button
                          className="btn btn-outline-info my-1"
                          onClick={() => {deleteNextTratment(nexts.id)
                            setDeletSelected(true)}}
                        >
                          Canled
                        </button></td>
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

export default MyReservation;
