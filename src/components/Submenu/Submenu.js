import React, { useEffect, useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "./style.css";

const Submenu = () => {
  const [routes, setRoutes] = useState([]);

  const patientRoutes = [
    {
      path: "/first-reservation",
      text: "First Reservation",
    },
    {
      path: "/my-reservation",
      text: "My Reservation",
    },
    {
      path: "/medical-record",
      text: "Record",
    },
    {
      path: "/evaluation",
      text: "Evaluation",
    },
  ];

  const studentRoutes = [
    {
      path: "/student",
      text: "My Couress",
    },
    {
      path: "/Courses_Plan",
      text: "Courses Plan",
    },
  ];

  const doctorRoutes = [
    {
      path: "/Doctor",
      text: "Course Name ",
    },
  ];
  const radiographerRoutes = [
    {
      path: "/x-ray-photographer",
      text: "Upload X-ray",
    },
  ];
  const secretaryRoutes = [
    {
      path: "/ShowAppointment",
      text: "Show Appointmen",
    },
    {
      path: "/SearchAppointment",
      text: "Search Appointment",
    },
    {
      path: "/Week_appointment",
      text: "Week appointment",
    },
  ];
  const assistantRoutes = [
    {
      path: "/Assistant",
      text: "New record",
    },
    {
      path: "/Add_Treatment",
      text: "Add Treatments",
    },
    {
      path: "/Show_Record",
      text: "show record",
    },
  ];
  const adminRoutes = [
    {
      path: "/admin",
      text: "Clinic Reviews",
    },
    {
      path: "/Clinic_Scheduling",
      text: "Clinic Scheduling",
    },
    {
      path: "/Add_Evaluating_Aspects",
      text: "Add Evaluating Aspects",
    },
    {
      path: "/Add_Medical_Advice",
      text: "Medical advice",
    },
  ];

  const switchRoute = () => {
    let path = [];
    let userData = localStorage.getItem("userData");
    let type;
    if (userData) {
      type = JSON.parse(userData).type;
    } else {
      type = undefined;
    }
    switch (type) {
      case "students":
        path = [...studentRoutes];
        break;
      case "doctors":
        path = [...doctorRoutes];
        break;
      case "radiographers":
        path = [...radiographerRoutes];
        break;
      case "secretaries":
        path = [...secretaryRoutes];
        break;
      case "assistants":
        path = [...assistantRoutes];
        break;
      case "patients":
        path = [...patientRoutes];
        break;
      case "admins":
        path = [...adminRoutes];
        break;
      default:
        path = [...patientRoutes];
        break;
    }
    setRoutes(path);
  };

  useEffect(() => {
    switchRoute();
  }, []);

  if (routes.length > 0) {
    return (
      <Navbar
        collapseOnSelect
        bg="light"
        variant="light"
        className="fixed-top px-2 submenu"
        style={{ zIndex: 2 }}
      >
        <Container>
          <Nav>
            {routes.map((route) => {
              return (
                <Nav.Link as={NavLink} to={route.path} activeClassName="active">
                  {route.text}
                </Nav.Link>
              );
            })}
          </Nav>
        </Container>
      </Navbar>
    );
  } else {
    return <></>;
  }
};

export default Submenu;
