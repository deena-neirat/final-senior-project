import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { Card, Table } from "react-bootstrap";
import Swal from "sweetalert2";
import "./style.css";


const Add_Evaluating_Aspects = () => {
  const [change, setChange] = useState("");
  const [ShowEvaluate, setShowEvaluate] = useState([]);
  const [isSelectedRes, setIsSelectedRes] = useState(false);
  const [name, setName] = useState("");
  const [newname, setNewName] = useState("");

  console.log(change);

  const AddAspects = async (change) => {
        let access_token = localStorage.getItem("token");
    await axios
      .post("http://127.0.0.1:8000/api/admin/add_stars_aspect", {
        topic: change,
        access_token,
      })
      .then((res) => {
        console.log(res);
        if (res.data.message === "created") {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Your Add Success",
            showConfirmButton: false,
            timer: 1500,
          });
          setChange('');
          show_stars_evaluation()
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "this filed must be enter!",
          });
        }
      })
      .catch((err) => console.error(err));
  };

  const show_stars_evaluation = async () => {
    let data2 = await axios.get(
      "http://127.0.0.1:8000/api/show_stars_evaluation"
    );
    console.log(data2.data.topics);
    setShowEvaluate(data2.data.topics);
  };

console.log(ShowEvaluate)

  const deletStars = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });
    if (result.isConfirmed) {
      let access_token = localStorage.getItem("token");
      const data = await axios.post(
        "http://127.0.0.1:8000/api/admin/delete_stars_aspect",
        {
          access_token,
          id,
        }
      );
      console.log(data);
      setIsSelectedRes(!isSelectedRes);
      Swal.fire("Deleted!", "It's deleted.", "success");
    }
  };

  const updateStars = async (id) => {
    let access_token = localStorage.getItem("token");

    Swal.fire({
      title: "Please enter new name",
      input: "text",
      inputPlaceholder: "Enter your new name",
      inputValidator: async (value) => {
        if (!value) {
          return "You need to enter a value";
        } else {
          console.log(value);
          return await axios
            .post(`http://127.0.0.1:8000/api/admin/update_stars_aspect`, {
              access_token,
              topic: value,
              id,
            })
            .then((res) => {
              setIsSelectedRes(!isSelectedRes);
              console.log(isSelectedRes);
              console.log(res);
            });
        }
      },
    });
  };

  useEffect(() => {
    show_stars_evaluation();
  }, [isSelectedRes]);

  return (
    <div>
      <div className="appointment">
        <div className="d-flex flex-row overflow-auto">
          <div className="w-100">
            <input
              onChange={(e) => setChange(e.target.value)}
              type="text"
              className="form-control w-100 my-5 ms-5"
              name="firstName"
              id="firstName"
              placeholder="Evaluation Aspects"
              value={change}
            ></input>
          </div>
          <button
            className="btn btn-outline-info w-50 h-50 m-5"
            onClick={() => AddAspects(change)}
          >
            Add Aspects
          </button>
        </div>
      </div>

      <div className="appointment9">
        <div className="d-flex flex-row overflow-auto">
          <div className="first-reservation-container12 w-100">
            <Card>
              <Table>
                <thead></thead>
                <tbody>
                  {ShowEvaluate.map((show, index) => (
                    <Fragment key={index}>
                      <tr>
                        <td>
                          <span>{show.topic}</span>
                        </td>
                        <td>
                          <input
                            className="range"
                            type="range"
                            value={show.evaluation}
                            min="0"
                            max="5"
                          />
                        </td>
                        <td>
                          <span>{show.evaluation}</span>
                        </td>
                        <td className="row flex-nowrap mx-3 widthbtn">
                          <button
                            type="button"
                            onClick={() => updateStars(show.id)}
                            className="btn btn-outline-info navlinka9 mt-2"
                          >
                            <b>Update</b>
                          </button>

                          <button
                            type="button"
                            className="btn btn-danger navlinka9 mt-2"
                            onClick={() => {
                              deletStars(show.id);
                            }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                      <div className="d-flex flex-row overflow-auto p-3">
                        <span className="box"></span>
                      </div>
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

export default Add_Evaluating_Aspects;
