import axios from "axios";
import { object } from "joi";
import React, { Fragment, useEffect, useState } from "react";
import { Card, Table } from "react-bootstrap";

const Week_appointment = () => {
  const [data, setData] = useState([]);
  const [finds, setFinds] = useState({});

  const getData = async () => {
    let access_token = localStorage.getItem("token");
    const search = await axios.get(
      `http://127.0.0.1:8000/api/secretary/get_week_appointments/${access_token}`
    );
    console.log(search)
    console.log(search.data.initials);
    setFinds(search.data.initials);
    console.log(Object.keys(finds));
    //setData(Object.entries(finds));
  };

  console.log(finds);
  // console.log(data);

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div className="first-reservation-section w-100 react_calender">
        <div className="d-flex flex-row overflow-auto">
          <div className="first-reservation-container w-100">
            <Card className="w-100">
            <span className="fs-1">Show Patient</span>
            <Table key={1} hover size="sl" className="text-center my-3">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Day</th>
                  <th>Start-Time / End-Time</th>
                  <th>Patient Name</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(finds).map((key) => (
                  <>
                    {finds[key].length > 0 ? (
                      <>
                        <>
                          {finds[key].map((k, index) => (
                            <tr>
                              {console.log(k)}
                              <td>{k.date}</td>
                              <td>{k.day}</td>
                              <td>
                                {k.start_time} - {k.end_time}
                              </td>
                              <td>
                                {k.patients.length > 0 ? (
                                  <>
                                    {k.patients.map((patient, index) => (
                                      <ol>
                                        <li>{patient.name}</li>
                                      </ol>
                                    ))}
                                  </>
                                ) : (
                                  ""
                                )}
                                
                              </td>
                            </tr>
                          ))}
                          {console.log(finds[key])}
                        </>
                      </>
                    ) : (
                      ""
                    )}
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
};
export default Week_appointment;
