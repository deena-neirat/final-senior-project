import moment from "moment";
import axios from "axios";
import { Table, Card } from "react-bootstrap";
import React, { useState, useEffect, Fragment } from "react";
import buildCalender from "./build";
import dayStyles, { beforeToday } from "./style";
import Header from "./header";
import { Container } from "react-bootstrap";
import Swal from "sweetalert2";
import "./style.css";
import { useNavigate } from "react-router";

const Calendar = () => {
  const [calender, setCalender] = useState([]);
  const [value, setValue] = useState(moment());
  const [res, setRes] = useState({
    date: "",
    day: "",
    end_time: "",
    start_time: "",
    created_at: "",
    id: "",
    reservation_id: "",
    seats: "",
    updated_at: "",
  });

  const [dateRes, setDateRes] = useState([]);
  const [selectedDate, setSelectedDate] = useState({});
  const [message, setMessage] = useState("");
  const [isSelected, setIsSelected] = useState(false);
  const [isUpdate, setUpdate] = useState(true);
  const [isSelectedRes, setIsSelectedRes] = useState(false);
  const time = value;
  let [date, setDate] = useState();

  const [currentDate, setCurrentDate] = useState(new Date());
  //console.log(currentDate);
  // console.log(currentDate.getHours() + ':' + currentDate.getMinutes() + ':' + currentDate.getSeconds())
  const [currenttime, setCurrentTime] = useState(
    currentDate.getHours() +
      ":" +
      currentDate.getMinutes() +
      ":" +
      currentDate.getSeconds()
  );
  console.log(currenttime);
  const [currentday, setCurrentDay] = useState(
    currentDate.getFullYear() +
      "-" +
      (currentDate.getMonth() + 1) +
      "-" +
      currentDate.getDate()
  );
  console.log(currentday);

  console.log(selectedDate);
  console.log(dateRes);
  console.log(isSelectedRes);
  console.log(time);
  console.log(date);

  useEffect(() => {
    setCalender(buildCalender(value));
    setDate(moment(time).format("YYYY-MM-DD"));
  }, [value]);

  useEffect(() => {
    getData();
  }, [date]);

  const getData = () => {
    let access_token = localStorage.getItem("token");
    showDateFirstRes(access_token);
    console.log("xxxx");
  };

  // ------------------------to show all initall data ---------------------------------
  const showDateFirstRes = async (access_token) => {
    //----------to cheak if have initall clinic reservation
    console.log(access_token);
    console.log(date);
    const dataRes = await axios.get(
      `http://127.0.0.1:8000/api/patient/get_next_initial/${access_token}`
    );
    console.log(dataRes);
    if (dataRes.data.initial) {
      setRes(dataRes.data.initial);
      setIsSelectedRes(true);
    } else {
      console.log("no enital");
      setIsSelectedRes(false);
    }
    //---------------------------------------------
    setDateRes([]);
    setMessage("");
    console.log(date);

    await axios
      .post("http://127.0.0.1:8000/api/patient/show_selected_date_initials", {
        date,
        access_token,
      })
      .then((res) => {
        console.log(res);
        if (res.data.initials) {
          setDateRes(res.data.initials);
          setMessage("");
        } else if (res.data.messages) {
          setDateRes([]);
          setMessage(res.data.messages);
        }
      })
      .catch((err) => console.error(err));
  };

  //----------------------to delete----------------------
  const deleteRes = async () => {
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
      const readData = await axios.delete(
        `http://127.0.0.1:8000/api/patient/delete_initial/${access_token}`
      );
      console.log(readData);
      setIsSelectedRes(false);
      Swal.fire("Deleted!", "Your file has been deleted.", "success");
    }
  };
  // --------------------------------------------------
  const switchCases = (seats) => {
    let status = "";
    if (seats >= 4) {
      status = "green";
    } else if (seats >= 1 && seats <= 3) {
      status = "orange";
    } else {
      status = "red";
    }
    return status;
  };

  //----------------------to reserve clinic and show table delete-----------------------------
  const handleReserve = async (id, date) => {
    console.log(id);
    let access_token = localStorage.getItem("token");

    console.log(date);
    console.log(currentday, currenttime);
    let x = moment().format("YYYY-MM-DD");
    console.log(x);
    if (date === x) {
      console.log("can not select ");
      Swal.fire({
        position: "center",
        icon: "error",
        title: "You can not select at this Date, Please select day not dotay",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      await axios
        .post("http://127.0.0.1:8000/api/patient/select_initial", {
          access_token,
          id,
        })
        .then(async (res) => {
          console.log(res);
          if (res.data.bookings_num) {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "You've selected a first reservation",
              showConfirmButton: false,
              timer: 1500,
            });
            console.log(access_token);
            const dataRes = await axios.get(
              `http://127.0.0.1:8000/api/patient/get_next_initial/${access_token}`
            );
            console.log(dataRes);
            if (dataRes.data.initial) {
              setRes(dataRes.data.initial);
              setIsSelectedRes(true);
            } else {
              console.log("no enital");
              setIsSelectedRes(false);
            }
          } else {
            Swal.fire({
              position: "center",
              icon: "error",
              title: `${res.data.messages}`,
            });
          }
        })
        .catch((err) => console.error(err));
    }
  };
  //-------------------------------------------------
  return (
    <Container className="pt-3 row justify-content-center m-auto text-center">
      <h1 className="text-main">Pick a Date</h1>
      <div className="react_calender col-12 col-lg-6 p-3">
        <div className="calender d-flex">
          <Header value={value} setValue={setValue} />
          <div className="body body-calendar m-3">
            <div className="calendar-head d-flex justify-content-around">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                <div className="St">{d}</div>
              ))}
            </div>
            {calender.map((week) => (
              <div className="d-flex justify-content-around">
                {week.map((day) => (
                  <div
                    className={`day`}
                    onClick={() => {
                      !beforeToday(day) && setValue(day);
                    }}
                  >
                    <div className={dayStyles(day, value)}>
                      {day.format("D").toString()}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="first-reservation-section react_calender col-12 col-lg-6 p-3">
        <div className="d-flex flex-row overflow-auto">
          <div className="first-reservation-container w-100">
            <Card className="w-100">
              <span>Day: {date}</span>
              <Table
                key={1}
                hover
                size="sl"
                className="text-center my-3 table-borderless"
              >
                <thead key={1}>
                  <tr>
                    <th>Start_Time</th>
                    <th>End_Time</th>
                    <th>Select</th>
                  </tr>
                </thead>
                {dateRes.length > 0 ? (
                  <tbody>
                    {dateRes.map((initial, index) => (
                      <Fragment key={index}>
                        <tr>
                          <td>{initial.start_time}</td>
                          <td>{initial.end_time}</td>
                          <td>
                            <button
                              type="button"
                              className="btn btn-outline-info"
                              onClick={() => {
                                setSelectedDate(initial);
                                setIsSelected(true);
                                {
                                  isSelectedRes
                                    ? setUpdate(false)
                                    : setUpdate(true);
                                }
                              }}
                            >
                              view more
                            </button>
                          </td>
                        </tr>
                      </Fragment>
                    ))}
                  </tbody>
                ) : (
                  ""
                )}
              </Table>
              <span className="message">{message && message}</span>
            </Card>
          </div>
        </div>
      </div>

      {isSelected && (
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
                      <th>Day</th>
                      <th>Date</th>
                      <th>Start_Time</th>
                      <th>End_Time</th>
                      {/* <th>Number Of Seats</th> */}
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <Fragment>
                      <tr>
                        <th>{selectedDate.day}</th>
                        <td>{selectedDate.date}</td>
                        <td>{selectedDate.start_time}</td>
                        <td>{selectedDate.end_time}</td>

                        {/* <td className={switchCases(selectedDate.seats)}>
                          {selectedDate.seats > 0
                            ? "Available"
                            : "Not Available"}
                        </td> */}
                        <td className="row flex-nowrap mx-3">
                          {isUpdate === false && isSelectedRes === true ? (
                            <>
                              <button
                                type="button"
                                className="btn btn-outline-info"
                                onClick={() => {
                                  handleReserve(
                                    selectedDate.id,
                                    selectedDate.date
                                  ) &&
                                    setIsSelected(false) &&
                                    setUpdate(false);
                                }}
                              >
                                Update
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                type="button"
                                className="btn btn-outline-info"
                                onClick={() => {
                                  handleReserve(
                                    selectedDate.id,
                                    selectedDate.date
                                  );
                                  setIsSelected(false);
                                  setUpdate(false);
                                }}
                              >
                                Reserve
                              </button>
                            </>
                          )}
                          <button
                            type="button"
                            className="btn btn-danger ml-1"
                            onClick={() => {
                              setIsSelected(false);
                              setUpdate(true);
                            }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    </Fragment>
                  </tbody>
                </Table>
              </Card>
            </div>
          </div>
        </div>
      )}

      {isSelectedRes && (
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
                      <th>Day</th>
                      <th>Date</th>
                      <th>Start_Time</th>
                      <th>End_Time</th>
                      {/* <th>Number Of Seats</th> */}
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <Fragment>
                      <tr>
                        <th>{res.day}</th>
                        <td>{res.date}</td>
                        <td>{res.start_time}</td>
                        <td>{res.end_time}</td>
                        <td>
                          <button
                            type="button"
                            className="btn btn-danger ml-1"
                            onClick={() => {
                              deleteRes();
                              setUpdate(true);
                              setIsSelectedRes(false);
                            }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    </Fragment>
                  </tbody>
                </Table>
              </Card>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
};

export default Calendar;
