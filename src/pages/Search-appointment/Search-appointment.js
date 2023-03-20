import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { Card, Table } from "react-bootstrap";
import "./style.css";

const SearchAppointment = () => {

  const [finds, setFinds] = useState([]);
  let [date, setDate] = useState();
  let [access_token, setAccess_Token] = useState();

  function getFormValue(e) {
    let myUser = { ...date };
    myUser[e.target.name] = e.target.value;
    setDate(myUser);
  }
  console.log(date);

  const getData = () => {
    let token = localStorage.getItem("token");
    setAccess_Token(token);
  };

  console.log(access_token);

  async function searchPationt(current_date) {
    console.log(access_token);

    const search = await axios.post(
      "http://127.0.0.1:8000/api/secretary/search_initial",
      { access_token, date : current_date }
    );
    console.log(search.data.initials);
    setFinds(search.data.initials);
  }
  console.log(finds);

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div className="d-flex appointment11">
        <input
          className="form-control len mx-1 my-3"
          type="date"
          placeholder="Search"
          aria-label="Search"
          name="date"
          id="date"
          onChange={getFormValue}
        />
        <a
          className="btn btn-outline-info navlinka4 my-3 mx-2"
          onClick={() => searchPationt(date)}
        >
          Search
        </a>
      </div>

    {finds.length > 0 ? (
      <div className="appointment1">
      <div className="d-flex flex-row overflow-auto">
        <div className="first-reservation-container11 w-100">
          <span className="fs-1">Show Patient</span>
          <Card>
            <Table
              key={1}
              hover
              size="sl"
              className="text-center my-3"
            >
              <thead key={1}>
                <tr>
                  <th>Date</th>
                  <th>Day</th>
                  <th>Patient Name</th>
                  <th>Gender</th>
                  <th>start_time</th>
                  <th>end_time</th>
                </tr>
              </thead>
                <tbody>
                  {finds.map((find, index) => (
                    <Fragment key={index}>
                      <tr>
                        <td>{find.date}</td>
                        <td>{find.day}</td>
                        <td>
                          {find.patients.map((patient, index) => (
                            <>
                              <ul key={index} className="dot1 m-1 p-1">
                                <li>{patient.name}</li>
                              </ul>
                            </>
                          ))}
                        </td>

                        <td>
                          {find.patients.map((patient, index) => (
                            <>
                              <ul key={index} className="dot1 m-1 p-1">
                                <li>{patient.gender}</li>
                              </ul>
                            </>
                          ))}
                        </td>
                          <td>{find.start_time}</td>
                          <td>{find.end_time}</td>
                      </tr>
                    </Fragment>
                  ))}
                </tbody>
            </Table>
          </Card>
        </div>
        </div>
      </div>
          ) : (
            <span className="fs-1 m-5">"No Patient In This Date"</span>
          )}
    </div>
  );
};

export default SearchAppointment;

