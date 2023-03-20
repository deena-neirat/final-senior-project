import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import Swal from "sweetalert2";

const Clinic_Scheduling = () => {
  const [start_date, setStart_Date] = useState("");
  const [end_date, setEnd_Date] = useState("");

  async function AddInitRes(start_date, end_date) {
    console.log(start_date, end_date);
    let access_token = localStorage.getItem("token");
    if(start_date === '' || end_date ===''){
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "this filed must be enter!",
      });
    }else{

      const search = await axios
        .post("http://127.0.0.1:8000/api/admin/add_initial", {
          access_token,
          start_date,
          end_date,
        })
        .then((res) => {
          console.log(res);
          if (res) {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Your Add Success",
              showConfirmButton: false,
              timer: 1500,
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "this filed must be enter!",
            });
          }
        })
        .catch((err) =>
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "this filed must be enter!",
          })
        );
        console.log(search);
    }
    setStart_Date('');
    setEnd_Date('');
  }

  return (
    <div className="mb-5 mt-5 h-100">
      <Card className="p-4 shadow my-2 w-100">
        <Card.Header className="p-3 my-3">
          <div className="text-main text-center">
            <h1 className="fs-1">Add Initial Reservation</h1>
          </div>
        </Card.Header>

        <Card.Body className="shadow">
          <form class="d-flex ">
            <input
              className="form-control len mx-1 my-3"
              type="date"
              placeholder="first_data"
              aria-label="first_date"
              id="start_date"
              name="start_date"
              onChange={(e) => setStart_Date(e.target.value)}
            />

            <input
              className="form-control len mx-1 my-3"
              type="date"
              placeholder="end_data"
              aria-label="end_date"
              id="end_date"
              name="end_date"
              onChange={(e) => setEnd_Date(e.target.value)}
            />

            <a
              class="btn btn-outline-info navlinka11 my-3 mx-2"
              onClick={() => AddInitRes(start_date, end_date)}
            >
              Add
            </a>
          </form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Clinic_Scheduling;
