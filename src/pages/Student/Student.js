import { Outlet, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import "./style.css";

const Student = () => {
  const [courses, setCourses] = useState([]);

  const navigate = useNavigate();

  const api = axios.create({
    baseURL: `http://127.0.0.1:8000/api/student/get_student_courses`,
  });

  const showClinic = async (access_token) => {
    let data = await api.get(`/${access_token}`);
    console.log(data.data.courses);
    setCourses(data.data.courses);
  };

  useEffect(() => {
    let access_token = localStorage.getItem("token");
    showClinic(access_token);
  }, []);

  async function getTreatment(course_id) {
    localStorage.setItem("course_id", course_id);
    console.log("fbsfb");
    navigate("/Patient_Info");
  }

  return (
    <div>
      <div className="appointment5">
        <div className="d-flex flex-row overflow-auto">
          <div className="first-reservation-container15 w-100">
            <Card>
              <section className="service-section" id="categories">
                <div className="container">
                  <Card.Header className="section-title pb-4 mx-2">
                    <h1>Medical Clinics</h1>
                  </Card.Header>

                  <div className="row">
                    {courses.map((course) => (
                      <Fragment key={course.id}>
                        <div
                          onClick={() => getTreatment(course.id)}
                          className="service-item p-5"
                        >
                          <div className="service-item-inner">
                            <img src={course.image} />
                            <div className="overlay">
                              <h3>{course.name}</h3>
                              <br />
                              <h3>{course.day}</h3>
                              <br />
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

export default Student;
