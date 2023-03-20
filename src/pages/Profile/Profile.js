import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import "./style.css";

const Profile = () => {
  //const [profiles,setProfiles] = useState();
  const [typeUser, setTypeUser] = useState();
  const [update, setUpdate] = useState(false);
  // const [changeAll ,setChangeAll] = useState(false);

  const [secretaries, setSecretaries] = useState({
    user_name: "",
    email: "",
    image: "",
    phone: "",
    name: "",
  });

  const [patients, setPatients] = useState({
    image: "",
    phone: "",
    name: "",
    address: "",
    date_of_birth: "",
    id: "",
  });

  const [students, setStudents] = useState({
    user_name: "",
    email: "",
    image: "",
    phone: "",
    name: "",
    level: "",
    gpa: "",
    id: "",
  });

  const [assistants, setAssistants] = useState({
    user_name: "",
    email: "",
    image: "",
    phone: "",
    name: "",
  });

  const [radiographers, setRadiographers] = useState({
    user_name: "",
    email: "",
    image: "",
    phone: "",
    name: "",
  });

  const [doctors, setDoctors] = useState({
    user_name: "",
    email: "",
    image: "",
    phone: "",
    name: "",
  });

  const [admins, setAdmins] = useState({
    user_name: "",
    email: "",
    image: "",
    phone: "",
    name: "",
  });

  console.log(admins);
  console.log(doctors);

  // const ChangeImg = async () => {
  //   const { value: file } = await Swal.fire({
  //     title: "Select image",
  //     input: "file",
  //     inputAttributes: {
  //       accept: "image/*",
  //       "aria-label": "Upload your profile picture",
  //     },
  //   });

  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = (e) => {
  //       Swal.fire({
  //         title: "Your uploaded picture",
  //         imageUrl: e.target.result,
  //         imageAlt: "The uploaded picture",
  //       });
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  const getProfile = async (access_token, type) => {
    if (type === "patients") {
      const profiles = await axios.post(
        "http://127.0.0.1:8000/api/get_profile",
        { access_token, type }
      );
      console.log(profiles);
      setPatients(profiles.data.user_name);
    }

    if (type === "secretaries") {
      const profiles = await axios.post(
        "http://127.0.0.1:8000/api/get_profile",
        { access_token, type }
      );
      console.log(profiles);

      setSecretaries(profiles.data.user_name);
    }

    if (type === "students") {
      const profiles = await axios.post(
        "http://127.0.0.1:8000/api/get_profile",
        { access_token, type }
      );
      console.log(profiles);
      setStudents(profiles.data.user_name);
    }

    if (type === "assistants") {
      const profiles = await axios.post(
        "http://127.0.0.1:8000/api/get_profile",
        { access_token, type }
      );
      console.log(profiles.data.user_name);
      setAssistants(profiles.data.user_name);
    }
    console.log(assistants);

    if (type === "radiographers") {
      const profiles = await axios.post(
        "http://127.0.0.1:8000/api/get_profile",
        { access_token, type }
      );
      console.log(profiles);
      setRadiographers(profiles.data.user_name);
    }
    if (type === "doctors") {
      const profiles = await axios.post(
        "http://127.0.0.1:8000/api/get_profile",
        { access_token, type }
      );
      console.log(profiles);
      setDoctors(profiles.data.user_name);
    }
    if (type === "admins") {
      const profiles = await axios.post(
        "http://127.0.0.1:8000/api/get_profile",
        { access_token, type }
      );
      console.log(profiles);
      setAdmins(profiles.data.user_name);
    }
  };

  useEffect(() => {
    let access_token = localStorage.getItem("token");
    let type = localStorage.getItem("type");
    setTypeUser(type);
    getProfile(access_token, type);
  }, [update]);

  const updatImg = async () => {
    // setChangeAll(!changeAll);
    // localStorage.setItem("changeAll", changeAll);

    let access_token = localStorage.getItem("token");
    const { value: image } = await Swal.fire({
      title: "Select image",
      input: "file",
      inputAttributes: {
        accept: "image/*",
        "aria-label": "Upload your profile picture",
      },
    });

    if (image) {
      const reader = new FileReader();
      reader.onload = (e) => {
        Swal.fire({
          title: "Your uploaded picture",
          imageUrl: e.target.result,
          imageAlt: "The uploaded picture",
        });
      };
      reader.readAsDataURL(image);

      const imageData = new FormData();
      imageData.append("access_token", access_token);
      imageData.append("image", image);
      imageData.append("type", typeUser);

      await axios
        .post("http://127.0.0.1:8000/api/set_image", imageData)
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Your work has been saved",
              showConfirmButton: false,
              timer: 1500,
            });
          } else {
            console.log("Image set not successfully!");
          }
        })
        .catch((err) =>
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
            footer: '<a href="">Why do I have this issue?</a>',
          })
        );
      setUpdate(!update);
    }
  };

  return (
    <div>
      {console.log(typeUser)}

      {typeUser === "patients" ? (
        <div>
          <div className="appointment1 mx-5 text-center text-sm-start ">
            <h2 className="text-main fw-bold text-center">Profile</h2>
            <hr />
            <div className="mt-5 row p-5 justify-content-center rounded-3">
              <div className="col-12 col-sm-6">
                <div className="my-3">
                  <b>Id :</b> {patients.id}
                </div>

                <div className="my-3">
                  <b>Name :</b> {patients.name}
                </div>

                <div className="my-3">
                  <b>Address :</b> {patients.address}
                </div>

                <div className="my-3">
                  <b>Date_of_Birth :</b> {patients.date_of_birth}
                </div>
                <div className="my-3">
                  <b>Phone :</b>
                  {patients.phone}
                </div>

                <div className="my-3">
                  <button
                    type="button"
                    className="btn btn-outline-info"
                    onClick={() => {
                      updatImg();
                    }}
                  >
                    Update Image
                  </button>
                </div>
              </div>

              <div className="col-12 col-sm-6">
                <img
                  src={patients.image}
                  className="rounded-pill m-2 w-100"
                  style={{ height: "300px", width: "50px" }}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}

      {typeUser === "admins" ? (
        <div>
          <div className="appointment1 mx-5 text-center text-sm-start">
            <h2 className="text-main fw-bold text-center">Profile</h2>
            <hr />
            <div className="mt-5 row p-5 justify-content-center rounded-3">
              <div className="col-12 col-sm-6">
                <div className="my-3">
                  <b>Email : </b> {admins.email}
                </div>
                <div className="my-3">
                  <b>Name :</b>
                  {admins.name}
                </div>
                <div className="my-3">
                  <b>User Name :</b>
                  {admins.user_name}
                </div>
                <div className="my-3">
                  <b>Phone : </b>
                  {admins.phone}
                </div>

                <div className="my-3">
                  <button
                    type="button"
                    className="btn btn-outline-info"
                    onClick={() => {
                      updatImg();
                    }}
                  >
                    Update Image
                  </button>
                </div>
              </div>
              <div className="col-12 col-sm-6">
                <img
                  src={admins.image}
                  className="rounded-pill m-2 w-100"
                  style={{ height: "300px", width: "50px" }}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}

      {typeUser === "radiographers" ? (
        <div className="m-5">
          <div className="appointment1 mx-5 text-center text-sm-start">
            <h2 className="text-main fw-bold text-center">Profile</h2>
            <hr />
            <div className="mt-5 row p-5 justify-content-center rounded-3">
              <div className="col-12 col-sm-6">
                <div className="my-3">
                  <b>Name :</b> {radiographers.name}
                </div>
                <div className="my-3">
                  <b>User Name :</b> {radiographers.user_name}
                </div>
                <div className="my-3">
                  <b>Phone :</b> {radiographers.phone}
                </div>
                <div className="my-3">
                  <b>Email :</b> {radiographers.email}
                </div>

                <div className="my-3">
                  <button
                    type="button"
                    className="btn btn-outline-info"
                    onClick={() => {
                      updatImg();
                    }}
                  >
                    Update Image
                  </button>
                </div>
              </div>
              <div className="col-12 col-sm-6">
                <img
                  src={radiographers.image}
                  className="rounded-pill m-2 w-75 h-50"
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}

      {typeUser === "secretaries" ? (
        <div>
          <div className="appointment1 mx-5 text-center text-sm-start ">
            <h2 className="text-main fw-bold text-center">Profile</h2>
            <hr />
            <div className="mt-5 row p-5 justify-content-center rounded-3">
              <div className="col-12 col-sm-6">
                <div className="my-3">
                  <b>Name :</b> {secretaries.name}
                </div>

                <div className="my-3">
                  <b>User Name :</b> {secretaries.user_name}
                </div>

                <div className="my-3">
                <b>Phone :</b>
                  {secretaries.phone}
                </div>

                <div className="my-3">
                <b>Email :</b>
                  {secretaries.email}
                </div>
                
                <div className="my-3">
                  <button
                    type="button"
                    className="btn btn-outline-info"
                    onClick={() => {
                      updatImg();
                    }}
                  >
                    Update Image
                  </button>
                </div>
              </div>

              <div className="col-12 col-sm-6">
                <img
                  src={secretaries.image}
                  className="rounded-pill m-2 w-100"
                  style={{ height: "300px", width: "50px" }}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}

      {/* {typeUser === "students" ? (
        <div>
          <div className="appointment1 mx-5 text-center text-sm-start">
            <h2 className="text-main fw-bold text-center">Profile</h2>
            <hr />
            <div className="mt-5 row p-5 justify-content-center rounded-3">
              <div className="col-12 col-sm-6 mx-5">
                <div className="my-3">
                  <b>Id :</b> {students.id}
                </div>

                <div className="my-3">
                  <b>Name :</b> {students.name}
                </div>

                <div className="my-3">
                  <b>User Name :</b> {students.user_name}
                </div>

                <div className="my-3">
                  <b>GPA :</b> {students.gpa}
                </div>

                <div className="my-3">
                  <b>Level :</b> {students.level}
                </div>

                <div className="my-3">
                  <b>Phone :</b> {students.phone}
                </div>

                <div className="my-3">
                  <b>Email :</b>
                  {students.email}
                </div>

                <div className="my-3">
                  <button
                    type="button"
                    className="btn btn-outline-info"
                    onClick={() => {
                      updatImg();
                    }}
                  >
                    Update Image
                  </button>
                </div>
              </div>
              <div className="col-12 col-sm-6">
                <img src={students.image} className="rounded-pill m-2 w-100" />
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )} */}


{typeUser === "students" ? (
        <div>
          <div className="appointment1 mx-5 text-center text-sm-start ">
            <h2 className="text-main fw-bold text-center">Profile</h2>
            <hr />
            <div className="mt-5 row p-5 justify-content-center rounded-3">
              <div className="col-12 col-sm-6">
                <div className="my-3">
                  <b>Id :</b> {students.id}
                </div>

                <div className="my-3">
                <b>Name :</b> {students.name}
                </div>

                <div className="my-3">
                  <b>User Name :</b> {students.user_name}
                </div>

                <div className="my-3">
                <b>GPA :</b> {students.gpa}
                </div>

                <div className="my-3">
                <b>Level :</b> {students.level}
                </div>

                <div className="my-3">
                  <b>Phone :</b> {students.phone}
                </div>

                <div className="my-3">
                  <b>Email :</b>
                  {students.email}
                </div>
                
                <div className="my-3">
                  <button
                    type="button"
                    className="btn btn-outline-info"
                    onClick={() => {
                      updatImg();
                    }}
                  >
                    Update Image
                  </button>
                </div>
              </div>

              <div className="col-12 col-sm-6">
                <img
                  src={students.image}
                  className="rounded-pill m-2 w-100"
                  style={{ height: "300px", width: "50px" }}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}

      {typeUser === "assistants" ? (
        <div>
          <div className="appointment1 mx-5 text-center text-sm-start">
            <h2 className="text-main fw-bold text-center">Profile</h2>
            <hr />
            <div className="first-reservation-container2 w-75 d-flex mt-5">
              <div className="col-12 col-sm-6 mx-5">
                <div className="my-3">
                  <b>Name :</b> {assistants.name}
                </div>
                <div className="my-3">
                  <b>User Name :</b> {assistants.user_name}
                </div>
                <div className="my-3">
                  <b>Phone :</b> {assistants.phone}
                </div>
                <div className="my-3">
                  <b>Email :</b> {assistants.email}
                </div>

                <div className="my-3">
                  <button
                    type="button"
                    className="btn btn-outline-info"
                    onClick={() => {
                      updatImg();
                    }}
                  >
                    Update Image
                  </button>
                </div>
              </div>
              <div className="col-12 col-sm-6">
                <img
                  src={assistants.image}
                  className="rounded-pill m-2 w-100"
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}

      {typeUser === "doctors" ? (
        <div className="appointment1 mx-5 text-center text-sm-start">
          <h2 className="text-main fw-bold text-center">Profile</h2>
          <hr />
          <div className="first-reservation-container2 w-75 d-flex m-5">
            <div className="col-12 col-sm-6 mx-5">
              <div className="my-3">
                <b>Name :</b> {doctors.name}
              </div>
              <div className="my-3">
                <b>User Name :</b> {doctors.user_name}
              </div>
              <div className="my-3">
                <b>Phone : </b>
                {doctors.phone}
              </div>
              <div className="my-3">
                <b>Email : </b>
                {doctors.email}
              </div>
              <div className="my-3">
                <button
                  type="button"
                  className="btn btn-outline-info"
                  onClick={() => {
                    updatImg();
                  }}
                >
                  Update Image
                </button>
              </div>
            </div>
            <div className="col-12 col-sm-6">
              <img src={doctors.image} className="rounded-pill m-2 w-100" />
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Profile;
