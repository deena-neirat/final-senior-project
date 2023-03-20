import React, { useEffect, useState } from "react";
import {
    Navbar,
    Nav,
    Button,
    Dropdown,
    Image,
    Container,
} from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import Logo from "../../assets/img1.png";
import Swal from "sweetalert2";
import "./style.css";
import axios from "axios";

const GlobalNavbar = ({ position }) => {
    const navigate = useNavigate();

    const [isLoggedIn, setisLoggedIn] = useState(false);
    const [routes, setRoutes] = useState([]);
    const [userData, setUserData] = useState({});
    const access_token=localStorage.getItem("token")
    // const changeAll = localStorage.getItem("changeAll")

    const getToken = async () => {
        // console.log('get token function')
        // var access_token = localStorage.getItem("token");
        var type = localStorage.getItem("type");
        // JSON.parse(userData).id
        if (access_token) {
         await axios
                .post("http://127.0.0.1:8000/api/get_name", {
                    access_token,
                    type,
                })
                .then((res) => {
                    //  console.log(res.data);
                    setisLoggedIn(true);
                    setUserData(res.data);
                    // console.log(isLoggedIn,'login')
                 })
                 .catch((err) => console.log(err));
        } else {
            setisLoggedIn(false);
        }
    };

// console.log(userData)
   

    const patientRoutes = [
        {
            path: "/Profile",
            text: "Profile",
        },
        {
            path: "/my-reservation",
            text: "My Reservation",
        },
    ];

    const studentRoutes = [
        {
            path: "/Profile",
            text: "Profile",
        },
        {
            path: "/student",
            text: "My Courses",
        },

    ];
    const doctorRoutes = [
        {
            path: "/Profile",
            text: "Profile",
        },
        {
            path: "/doctor",
            text: "Course Name",
        },

    ];
    const radiographerRoutes = [
        {
            path: "/Profile",
            text: "Profile",
        },
   
        {
            path: "/x-ray-photographer",
            text: "Upload X-ray",
        },
    ];
    const secretaryRoutes = [
        {
            path: "/Profile",
            text: "Profile",
        },
        {
            path: "/ShowAppointment",
            text: "Show Appointment",
        },
      
    ];
    const assistantRoutes = [
        {
            path: "/Profile",
            text: "Profile",
        },
        {
            path: "/Assistant",
            text: "New Record",
        },
 
    ];
    const adminRoutes = [
        {
            path: "/Profile",
            text: "Profile",
        },
        {
            path: "/admin",
            text: "Clinic Reviews",
        },
    ];

    const logout = async () => {
        localStorage.removeItem("token");
        localStorage.removeItem("type");
        await Swal.fire({
            position: "center",
            icon: "success",
            title: "Your have logged out successfully",
            showConfirmButton: false,
            timer: 1500,
        });
        navigate("/login");
        setisLoggedIn(false);
    };

    const switchRoute = () => {
        let path = [];
        // let userData = localStorage.getItem("userData");
        let type = localStorage.getItem("type");
        // if (type) {
        //     type = JSON.parse(userData).type;
        // } else {
        //     type = undefined;
        // }
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
        getToken();
        switchRoute();
        
    },[access_token]);

    return (
        <Navbar
            // collapseOnSelect
            variant="dark"
            // bg="dark"
            expand="md"
            className={`fixed-top px-3 ${
                position === "fixed" ? "navGlobale" : "navGlobaleColor"
            }`}
        >
            <Container >
                <Navbar.Brand href="/">
                    <Image
                        src={Logo}
                        alt="health teeth logo Image"
                        className="navbar-logo"
                        width="120px"
                    />
                </Navbar.Brand>
                {isLoggedIn ? (
                    <Dropdown className="order-md-1 ml-auto">
                        <Dropdown.Toggle variant="link">
                            <span>{userData.user_name}</span>
                            <img className="navbar-profile m-2" src={userData.user_image}/>
                        </Dropdown.Toggle>
                        <Dropdown.Menu align="end">
                            {routes.map((route) => {
                                return (
                                    <Dropdown.Item href={route.path}>
                                        {route.text}
                                    </Dropdown.Item>
                                );
                            })}

                            <Dropdown.Divider />
                            <Dropdown.Item
                                href="#"
                                onClick={() => {
                                    navigate("/change-password");
                                }}
                            >
                                Change Password
                            </Dropdown.Item>
                            <Dropdown.Item href="#" onClick={logout}>
                                Logout
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                ) : (
                    <Button
                        variant="light"
                        className="order-md-1 ml-auto submit-btn1 btn btn-outline-info"
                        onClick={() => navigate("/login")}
                    >
                        Login
                    </Button>
                )}
                <Navbar.Toggle
                    aria-controls="basic-navbar-nav"
                />
                <Navbar.Collapse id="basic-navbar-nav" className="mr-auto">
                    <Nav>
                        <Nav.Link
                            as={NavLink}
                            to={`/dental-services`}
                            activeClassName="active"
                        >
                            Dental Services
                        </Nav.Link>
                        <Nav.Link
                            as={NavLink}
                            to={`/medical-advice`}
                            activeClassName="active"
                        >
                            Medical Advice
                        </Nav.Link>
                        <Nav.Link
                            as={NavLink}
                            to={`/user-guide`}
                            activeClassName="active"
                        >
                            User's Guide
                        </Nav.Link>
                        <Nav.Link
                            as={NavLink}
                            to={`/about-us`}
                            activeClassName="active"
                        >
                            About us
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default GlobalNavbar;
