import { useNavigate } from "react-router-dom";
import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import "./style.css";

const Doctor_Section_info = () => {
  const [courses, setCourses] = useState([]);
  const [messages, setMessage] = useState("");

  const navigate = useNavigate();

  const showClinic = async (access_token, course_id) => {
    await axios
      .post("http://127.0.0.1:8000/api/doctor/get_course_clinics", {
        course_id,
        access_token,
      })
      .then((res) => {
        console.log(res);
        if (res.data.clinics) {
          setCourses(res.data.clinics);
          setMessage("");
        } else if (res.data.messages) {
          setCourses([]);
          setMessage(res.data.messages);
        }
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    let access_token = localStorage.getItem("token");
    let course_id = localStorage.getItem("course_id");
    showClinic(access_token, course_id);
  }, []);

  async function getTreatment(clinic_id) {
    localStorage.setItem("clinic_id", clinic_id);
    navigate("/Show_Student_Doctor");
  }

  return (
    <div>
      <div className="appointment6">
        <div className="d-flex flex-row overflow-auto">
          <div className="first-reservation-container16 w-100">
            <Card>
              <Card.Header>
              <span className="fs-1">Medical Clinics</span>
              </Card.Header>
              <section className="service-section" id="categories">
                <div className="container">
                 

                  <div className="row">
                    {courses.map((course) => (
                      <Fragment key={course.clinic_id}>
                        <div
                          onClick={() => getTreatment(course.clinic_id)}
                          className="service-item p-5"
                        >
                          <div className="service-item-inner">
                            <img src={course.image} />
                            <div className="overlay">
                              <h3>{course.name}</h3>
                              <h4 style={{color:'white'}}>level : {course.level}</h4>
                              <h4 style={{color:'white'}}>Day : {course.day}</h4>
                              <h4 style={{color:'white'}}>
                                {course.start_time} - {course.end_time}
                              </h4>
                            </div>
                          </div>
                        </div>
                      </Fragment>
                    ))}
                  </div>
                </div>
              </section>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Doctor_Section_info;
