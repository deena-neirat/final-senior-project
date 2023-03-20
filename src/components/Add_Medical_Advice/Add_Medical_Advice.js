import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { Card, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./style.css";

export default function Add_Medical_Advice() {
  const [advices, setAdvice] = useState([]);
  const [link, setLink] = useState("");
  const [body, setBody] = useState("");
  const [title, setTitle] = useState("");
  const [access_token, setAccess_token] = useState("");
  const [loding, setLoding] = useState(false);

  const navigate = useNavigate();
  console.log(link, body, title);

  const showFirstPagesData = async () => {
    let data = await axios.get(
      "http://127.0.0.1:8000/api/admin/get_medical_advice"
    );
    console.log(data.data.advice);
    setAdvice(data.data.advice);
  };

  console.log(advices);

  const updatData = (link, body, title, id) => {
    localStorage.setItem("link", link);
    localStorage.setItem("body", body);
    localStorage.setItem("title", title);
    localStorage.setItem("id", id);

    console.log(link, body, title, id);

    navigate("/UpdateAdvice");
  };

  const deletData = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to delete this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });
    console.log(access_token);
    if (result.isConfirmed) {
      const data = await axios.post(
        "http://127.0.0.1:8000/api/admin/delete_medical_advice",
        {
          access_token,
          id,
        }
      );

      if (data) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Your work has been deleted",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      }
      console.log(data);
    }
    setLoding(!loding);
  };

  const saveData = async (link, body, title) => {
    console.log(access_token);

    try {
      const { data } = await axios.post(
        "http://127.0.0.1:8000/api/admin/add_medical_advice",
        {
          access_token,
          link,
          body,
          title,
        }
      );

      if (data.message === "created") {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        throw new Error();
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
    setLoding(!loding);
    setLink("");
    setBody("");
    setTitle("");
  };

  const showMedical = async () => {
    const data = await axios.get(
      "http://127.0.0.1:8000/api/admin/get_medical_advice"
    );
    console.log(data);
  };

  useEffect(() => {
    setAccess_token(localStorage.getItem("token"));
    showFirstPagesData();
    showMedical();
  }, [loding]);

  return (
    <div>
      <div className="first-reservation-section w-100 react_calender">
        <div className="d-flex flex-row overflow-auto">
          <div className="first-reservation-container w-100">
            <Card className="w-100">
              <Table
                key={1}
                hover
                size="sl"
                className="text-center my-3 table-borderless"
              >
                <thead key={1}>
                  <tr>
                    <th>Vedios Links</th>
                    <th>Title</th>
                    <th>Body</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {advices.map((device, index) => (
                    <>
                      <tr>
                        <td>{device.link}</td>
                        <td>{device.body}</td>
                        <td>{device.title}</td>
                        <td className="row flex-nowrap mx-3 widthbtn">
                          <button
                            type="button"
                            className="btn btn-outline-info"
                            onClick={() => {
                              updatData(
                                device.link,
                                device.body,
                                device.title,
                                device.id
                              );
                            }}
                          >
                            Update
                          </button>
                          <button
                            type="button"
                            className="btn btn-danger ml-1"
                            onClick={() => {
                              deletData(device.id);
                            }}
                          >
                            Delete
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

      <div className="first-reservation-section w-100 react_calender">
        <div className="d-flex flex-row overflow-auto">
          <div className="first-reservation-container w-100">
            <Card className="w-100">
              <Table
                key={1}
                hover
                size="sl"
                className="text-center my-3 table-borderless"
              >
                <thead key={1}>
                  <tr>
                    <th>Vedios Links</th>
                    <th>Title</th>
                    <th>Body</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <input
                        type="text"
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                      ></input>
                    </td>

                    <td>
                      <input
                        type="text"
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                      ></input>
                    </td>

                    <td>
                      <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      ></input>
                    </td>

                    <td className="row flex-nowrap mx-3">
                      <button
                        type="button"
                        className="btn btn-outline-info"
                        onClick={() => {
                          saveData(link, body, title);
                        }}
                      >
                        Add
                      </button>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
