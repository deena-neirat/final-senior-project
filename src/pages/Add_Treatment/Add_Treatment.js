import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { Card, Table } from "react-bootstrap-v5";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./style.css";

const Add_Treatment = () => {
  const [patient_id, setPatientId] = useState("");
  const [courses, setCoures] = useState([]);
  const [dataSec, setDataSec] = useState([]);
  const [student, setStudent] = useState([]);
  const [isSave, setIsSave] = useState(false);
  const [isSelect, setIsSelect] = useState(false);
  const [reg_id, setRegIid] = useState("");
  const [req_id, setReqId] = useState("");
  const [allData, setAllData] = useState([]);
  const [isSelectSave, setIsSelectSave] = useState(false);
  const [student_id, setStudentId] = useState("");
  const [tooth, setTooth] = useState("");
  const [tooth_id, setToothId] = useState("");
  const [start_date, setStartDate] = useState("");
  const [end_date, setEndDate] = useState("");
  const [description, setDescription] = useState("");
  const [subData, setSubData] = useState([]);
  const [successAdd, setSucessAdd] = useState(false);
  const [level, setLevel] = useState("");
  const [resdata, setResulr] = useState(false);
  const [defaultValuelevel, setDefaultValueLevel] = useState(true);
  const [selectedOption, setSelectedOption] = useState("DEFAULT");
  const [clinic_id, setclinicId] = useState();
  const [value,setValue] = useState(false)


  const navigate = useNavigate();

  const setSlectLevel = async () => {
    console.log(level);
    let access_token = localStorage.getItem("token");
    const readClink = await axios.post(
      "http://127.0.0.1:8000/api/assistant/get_level_courses",
      {
        access_token,
        level,
      }
    );
    console.log(readClink);
    setCoures(readClink.data.courses);
    setSelectedOption("DEFAULT");
    setLevel("");
  };

  useEffect(() => {
    setSlectLevel();
    console.log("ddd");
    setIdSection("");
    setIsSelectSave(false);
  }, [defaultValuelevel]);

  const setIdSection = async (course_id) => {
    let access_token = localStorage.getItem("token");
    const readSection = await axios.post(
      "http://127.0.0.1:8000/api/assistant/get_course_sections",
      {
        access_token,
        course_id,
      }
    );
    console.log(readSection);
    setDataSec(readSection.data.sections);
  };

  const ShowStudent = async (clinic_id) => {
    console.log(clinic_id);
    let access_token = localStorage.getItem("token");
    const readSection = await axios.post(
      "http://127.0.0.1:8000/api/assistant/show_section_students",
      {
        clinic_id,
        access_token,
      }
    );

    setStudent(readSection.data.students);
    console.log(readSection);
    if (student !== []) {
      setIsSelect(true);
      setIsSave(false);
    }
  };

  const handleAddData = (
    student_id,
    name_student,
    reg_id,
    req_id,
    neme_req,
    course_id
  ) => {
    console.log(req_id);
    console.log(reg_id);
    setStudentId(student_id);
    setRegIid(reg_id);
    setReqId(req_id);
    const newAddData = {
      student_id: student_id,
      name_student: name_student,
      reg_id: reg_id,
      req_id: req_id,
      neme_req: neme_req,
      course_id: course_id,
    };
    setAllData([...allData, newAddData]);
    setIsSelectSave(true);
    setValue(true);
  };
  console.log(allData);

  const deleteReq = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        //  setSubData([]);
        setAllData([]);
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
        setIsSelectSave(false);
        setSubData([]);
      } else {
        setIsSelectSave(true);
      }
    });
  };

  const addSubTreatment = (reg_id,req_id,tooth,tooth_id,start_date,end_date,description) => {
    const subAdd = {
      patient_id: patient_id,
      reg_id: reg_id,
      req_id: req_id,
      tooth: tooth,
      tooth_id: tooth_id,
      start_date: start_date,
      end_date: end_date,
      description: description,
    };
    //  console.log(subAdd);
    //  console.log(patient_id);
    //  console.log(tooth);
    //  console.log(tooth_id);
    //  console.log(start_date);
    //  console.log(end_date);
    //  console.log(description);
    console.log(reg_id);
    console.log(req_id);
    if (
      patient_id !== "" &&
      tooth !== "" &&
      tooth_id !== "" &&
      start_date !== "" &&
      end_date !== "" &&
      description !== ""
    ) {
      console.log(patient_id);
      console.log(tooth);
      console.log(tooth_id);
      console.log(start_date);
      console.log(end_date);
      console.log(description);
      setSubData([...subData, subAdd]);
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!, Please enter all data",
      });
    }
    setTooth("");
    setToothId("");
    setStartDate("");
    setEndDate("");
    setDescription("");
  };
  console.log(subData);

  const saveAddTreatment = async () => {
    const length = subData.length;
    console.log(subData);
    console.log(length);
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You will save changes!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, saved it!",
    });
    if (result.isConfirmed) {
      if (subData.length !== 0) {
        subData.map((sub, index) => {
          if (
            sub.tooth &&
            sub.tooth_id &&
            sub.start_date &&
            sub.end_date &&
            sub.description != ""
          ) {
            setSucessAdd(!successAdd);
            setResulr(true);
            console.log(successAdd);
          } else {
            setSucessAdd(!successAdd);
            setResulr(false);
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong!, Please enter all data",
            });
            return;
          }
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!, Please enter all data",
        });
      }
    }
  };

  useEffect(() => {
    if (resdata === true) {
      let access_token = localStorage.getItem("token");
      axios
        .post(`http://127.0.0.1:8000/api/assistant/add_treatments`, {
          access_token,
          treatments: subData,
        })
        .then((readData) => {
          console.log(readData);
          if (readData.data.messages === "created successfully") {
            Swal.fire("success!", "Your Success To Add Treatment.", "success");
            setIsSelect(false);
            setIsSelectSave(false);
            setSubData([]);
            setAllData([]);
            setIsSave(false);
            // setSlectLevel(level);
            // setLevel('Open this select menu')
            setDefaultValueLevel(!defaultValuelevel);
            setPatientId("");
            navigate("/Assistant");
          } else {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "There is a conflict in the student's times in the treatments, please choose another time in which you do not conflict",
            });
            setAllData([]);
            setSubData([]);
            setIsSelectSave(false);
          }
        });
    }
  }, [successAdd]);

  const deleteSubData = (allData, subData, index) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        allData.splice(index, 1);
        if (subData !== []) {
          subData.splice(index, 1);
        }
        console.log(allData);
        console.log(subData);

        if (subData.length <= 0 && allData.length <= 0) {
          setIsSelectSave(false);
          setTooth('')
          setToothId('')
          setEndDate('')
          setStartDate('')
          setDescription('')
        } else {
          setIsSelectSave(true);
          setdataSubDelete(!dataSubDelete);
          setToothId('')
          setEndDate('')
          setStartDate('')
          setDescription('')
        }
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      } else {
        setIsSelectSave(true);
      }
    });
  };

  const [dataSubDelete,setdataSubDelete] = useState(false);

  useEffect(() => {
    if(setValue == true){
    setIsSelectSave(true);
  }
    console.log(allData);
    console.log(subData);
  },[dataSubDelete])

  return (
    <div className="p-5">
      <div className="my-reservation-container w-100 my-res">
        <div className="d-flex flex-row overflow-auto">
          <div className="my-reservation-container w-100">
            <Card className="w-100">
              <div className="row">
                <div className="col">
                  <label
                    htmlFor="patient_id"
                    className="form-label label_input"
                  >
                    Patient_Id
                  </label>
                  <label style={{ color: "red" }}>*</label>
                  <input
                    onChange={(e) => {
                      setPatientId(e.target.value);
                    }}
                    type="text"
                    className="form-control"
                    id="patient_id"
                    value={patient_id}
                  ></input>
                </div>

                <div className="col">
                  <label className="form-label label_input">
                    Level<span style={{ color: "red" }}>*</span>
                  </label>
                  <Form.Select
                    required
                    defaultValue={selectedOption}
                    aria-label="Default select example"
                    onChange={(e) => {
                      // setSlectLevel()
                      setLevel(e.target.value);
                      setDefaultValueLevel(!defaultValuelevel);
                    }}
                  >
                    <option disabled={true} value="DEFAULT">
                      Open this select menu
                    </option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </Form.Select>
                </div>

                <div className="col">
                  <label className="form-label label_input">
                    Clinic<span style={{ color: "red" }}>*</span>
                  </label>

                  <Form.Select
                    required
                    defaultValue={"DEFAULT"}
                    aria-label="Default select example"
                    onChange={(e) => setIdSection(e.target.value)}
                  >
                    <option disabled={true} value="DEFAULT">
                      Open this select menu
                    </option>
                    {courses.map((course) => (
                      <option key={course.id} value={course.id}>
                        {course.name}
                      </option>
                    ))}
                  </Form.Select>
                </div>

                <div className="col">
                  <label className="form-label label_input">
                    Time<span style={{ color: "red" }}>*</span>
                  </label>
                  <Form.Select
                    required
                    defaultValue={"DEFAULT"}
                    aria-label="Default select example"
                    onChange={(e) => ShowStudent(e.target.value)}
                  >
                    <option disabled={true} value="DEFAULT">
                      Open this select menu
                    </option>
                    {dataSec.map((dataSe) => (
                      <option key={dataSe.id} value={dataSe.id}>
                        {dataSe.day} : {dataSe.start_time} - {dataSe.end_time}
                      </option>
                    ))}
                  </Form.Select>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {isSelect && (
        <div className="my-reservation-container w-100 my-res">
          <div className="d-flex flex-row overflow-auto">
            <div className="first-reservation-container w-100">
              <Card className="w-100">
                <Table
                  key={1}
                  hover
                  size="sl"
                  className="text-center my-3 "
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    fontFamily: "Arial, sans-serif",
                    color: "#333",
                  }}
                >
                  <thead key={1}>
                    <tr>
                      <th>id</th>
                      <th>name</th>
                      <th>Start Time of Treatment</th>
                      <th>End Time of Treatment</th>
                      <th>status</th>
                      <th>select</th>
                    </tr>
                  </thead>
                  <tbody>
                    {student.map((init, index) => (
                      <Fragment key={index}>
                        <tr>
                          <td className="element2">{init.id}</td>
                          <td className="element2">{init.name}</td>
                          <td>
                            {init.reqs.map((tratdata, index) => (
                              <Fragment>
                                <tr>
                                  <td>
                                    <ol className="mt-2 d-flex justify-content-center text-center">
                                      <li>{tratdata.start_date}</li>
                                      <hr />
                                    </ol>
                                  </td>
                                </tr>
                              </Fragment>
                            ))}
                          </td>
                          <td>
                            {init.reqs.map((tratdata, index) => (
                              <Fragment>
                                <tr>
                                  <td>
                                    <ol className="mt-2 d-flex justify-content-center text-center">
                                      <li>{tratdata.end_date}</li>
                                      <hr />
                                    </ol>
                                  </td>
                                </tr>
                              </Fragment>
                            ))}
                          </td>

                          <td>
                            {init.reqs.map((tratdata, index) => (
                              <Fragment>
                                <tr>
                                  <td>
                                    <ol className="mt-2 d-flex justify-content-center text-center">
                                      <li>{tratdata.name}</li>
                                      <hr />
                                    </ol>
                                  </td>
                                </tr>
                              </Fragment>
                            ))}
                          </td>
                          <td className="element">
                            {init.reqs.map((tratdata, index) => (
                              <Fragment>
                                {console.log(tratdata.status)}
                                <tr>
                                  <td>
                                    <ol className="mt-2 d-flex justify-content-center text-center">
                                      <li>{tratdata.status}</li>
                                    </ol>
                                  </td>
                                </tr>
                              </Fragment>
                            ))}
                          </td>
                          <td>
                            {init.reqs.map((tratdata, index) => (
                              <Fragment>
                                <tr>
                                  <td>
                                    <ol>
                                      <li>
                                        {tratdata.status === "completed" ||
                                        tratdata.status === "not completed" ? (
                                          tratdata.status === "completed" ? (
                                            <div className="btn btn-outline-success mb-1 p-2 w-100">
                                              Done
                                            </div>
                                          ) : (
                                            <div className="btn btn-outline-warning mb-1 p-2 w-100">
                                              Working
                                            </div>
                                          )
                                        ) : (
                                          <button
                                            className="btn btn-outline-info mb-1 p-2 w-100"
                                            onClick={() =>
                                              handleAddData(
                                                init.id,
                                                init.name,
                                                init.reg_id,
                                                tratdata.id,
                                                tratdata.name,
                                                tratdata.course_id
                                              )
                                            }
                                          >
                                            Reserve
                                          </button>
                                        )}
                                      </li>
                                      <hr />
                                    </ol>
                                  </td>
                                </tr>
                              </Fragment>
                            ))}
                          </td>
                        </tr>
                      </Fragment>
                    ))}
                  </tbody>
                </Table>
              </Card>
            </div>
          </div>
        </div>
      )}

      {isSelectSave &&(
        <div className="my-reservation-container w-100 my-res">
          <div className="d-flex flex-row  overflow-auto">
            <div className="first-reservation-container w-100">
              <Card className="w-100">
                <Table key={1} hover size="sl" className="text-center my-3">
                  <thead key={1}>
                    <tr>
                      <th>student id</th>
                      <th>Student name</th>
                      <th>reqs</th>
                      <th>description</th>
                      <th>tooth</th>
                      <th>tooth id</th>
                      <th>start_date</th>
                      <th>end_date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allData.map((init, index) => (
                      <Fragment key={index}>
                        {console.log(allData)}
                        {console.log(init)}
                        <tr>
                          <td>{init.student_id}</td>
                          <td>{init.name_student}</td>
                          <td>{init.neme_req}</td>
                          <td>
                            {" "}
                            <input
                              onChange={(e) => setDescription(e.target.value)}
                              type="text"
                              className="form-control"
                              name="description"
                              id="description"
                              ></input>
                          </td>
                          <td>
                            <Fragment className="col-6">
                              <select
                                className="form-select"
                                name="tooth"
                                onChange={(e) => setTooth(e.target.value)}
                              >
                                <option selected>Open this select menu</option>
                                <option value="upper right">upper right</option>
                                <option value="upper left">upper left</option>
                                <option value="lower right">lower right</option>
                                <option value="lower left">lower left</option>
                              </select>
                            </Fragment>
                          </td>
                          <td>
                            {" "}
                            <select
                              className="form-select"
                              name="tooth_id"
                              onChange={(e) => setToothId(e.target.value)}
                            >
                              <option selected>Open this select menu</option>
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option>
                              <option value="5">5</option>
                              <option value="6">6</option>
                              <option value="7">7</option>
                              <option value="8">8</option>
                              <option value="A">A</option>
                              <option value="B">B</option>
                              <option value="C">C</option>
                              <option value="D">D</option>
                              <option value="E">E</option>
                              <option value="F">F</option>
                              <option value="G">G</option>
                              <option value="H">H</option>
                            </select>
                          </td>

                          <td>
                            {" "}
                            <input
                              onChange={(e) => setStartDate(e.target.value)}
                              type="date"
                              className="form-control"
                              name="start_date"
                              id="start_date"
                            />
                          </td>

                          <td>
                            {" "}
                            <input
                              onChange={(e) => setEndDate(e.target.value)}
                              type="date"
                              className="form-control"
                              name="end_date"
                              id="end_date"
                            />
                          </td>
                          <td className="row flex-nowrap mx-3">
                            <button
                              className="btn btn-outline-info"
                              onClick={() => {
                                addSubTreatment(init.reg_id,init.req_id,tooth,tooth_id,start_date,end_date,description);
                              }}
                            >
                              add
                            </button>
                            <button
                              className="btn btn-danger"
                              onClick={() => {
                                deleteSubData(allData, subData, index);
                              }}
                            >
                              delete
                            </button>
                          </td>
                        </tr>
                      </Fragment>
                    ))}
                  </tbody>
                </Table>

                <div className="mx-1 row flex-nowrap w-50">
                  <button
                    className="btn btn-outline-info w-100 d-flex justify-content-center text-center ml-5"
                    onClick={() => {
                      saveAddTreatment();
                      isSelect(false);
                      isSelectSave(false);
                      setIsSave(true);
                      setIsSelectSave(false);
                    }}
                  >
                    Save All Change
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      deleteReq();
                    }}
                  >
                    Delete All Change
                  </button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// const Add_Treatment = () => {
//   const [patient_id, setPatientId] = useState("");

//   const [level, setSlectLevel] = useState(null);
//   const [courses, setCoures] = useState([]);
//   const [idsection, setIdSection] = useState([]);
//   const [dataSec, setDataSec] = useState([]);
//   const [clinic_id, setclinicId] = useState(null);
//   const [student, setStudent] = useState([]);
//   const [isSelectSave, setIsSelectSave] = useState(false);
//   const [isSave, setIsSave] = useState(false);
//   const [isSelect, setIsSelect] = useState(false);
//   const [saveData, setSaveData] = useState([]);

//   const [tooth, setTooth] = useState("");
//   const [tooth_id, setToothId] = useState("");
//   const [start_date, setStartDate] = useState("");
//   const [end_date, setEndDate] = useState("");
//   const [description, setDescription] = useState("");
//   const [reg_id, setRegIid] = useState("");
//   const [req_id, setReqId] = useState("");
//   const [allData, setAllData] = useState([]);

//   const [student_id, setStudentId] = useState("");

//   const [successAdd, setSucessAdd] = useState(false);

//   console.log(tooth, tooth_id, start_date, end_date, description);

//   const handleAddData = (
//     student_id,
//     name_student,
//     reg_id,
//     req_id,
//     neme_req,
//     course_id
//   ) => {
//     setStudentId(student_id);
//     setRegIid(reg_id);
//     setReqId(req_id);
//     const newAddData = {
//       student_id: student_id,
//       name_student: name_student,
//       reg_id: reg_id,
//       req_id: req_id,
//       neme_req: neme_req,
//       course_id: course_id,
//     };

//     setAllData([...allData, newAddData]);
//     setIsSelectSave(true);
//   };
//   console.log(allData);

//   console.log(saveData);

//   const [subData, setSubData] = useState([]);

//   const addSubTreatment = () => {
//     const subAdd = {
//       patient_id: patient_id,
//       reg_id: reg_id,
//       req_id: req_id,
//       tooth: tooth,
//       tooth_id: tooth_id,
//       start_date: start_date,
//       end_date: end_date,
//       description: description,
//     };
//     console.log(subAdd);

//     console.log(patient_id);
//     console.log(tooth);
//     console.log(tooth_id);
//     console.log(start_date);
//     console.log(end_date);
//     console.log(description);

//     if (
//       patient_id !== "" &&
//       tooth !== "" &&
//       tooth_id !== "" &&
//       start_date !== "" &&
//       end_date !== "" &&
//       description !== ""
//     ) {
//       console.log(patient_id);
//       console.log(tooth);
//       console.log(tooth_id);
//       console.log(start_date);
//       console.log(end_date);
//       console.log(description);

//       setSubData([...subData, subAdd]);
//     } else {
//       Swal.fire({
//         icon: "error",
//         title: "Oops...",
//         text: "Something went wrong!, Please enter all data",
//       });
//     }
//     setTooth("");
//     setToothId("");
//     setStartDate("");
//     setEndDate("");
//     setDescription("");
//   };

//   console.log(subData);

//   const deleteReq = () => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, delete it!",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         setSubData([]);
//         setAllData([]);
//         Swal.fire("Deleted!", "Your file has been deleted.", "success");
//         setIsSelectSave(false);
//       } else {
//         setIsSelectSave(true);
//       }
//     });

//   };

//   const saveAddTreatment = async () => {
//     const length = subData.length;
//     console.log(length);
//     const result = await Swal.fire({
//       title: "Are you sure?",
//       text: "You will save changes!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, saved it!",
//     });

//     if (result.isConfirmed) {
//       let access_token = localStorage.getItem("token");
//       if (subData.length > 0) {
//         subData.map((sub, index) => {
//           if (
//             sub.tooth &&
//             sub.tooth_id &&
//             sub.start_date &&
//             sub.end_date &&
//             sub.description != ""
//           ) {
//             setSucessAdd(true);
//             console.log(successAdd);
//           }
//         });
//         if (successAdd === true) {
//           const readData = await axios.post(
//             `http://127.0.0.1:8000/api/assistant/add_treatments`,
//             {
//               access_token,
//               treatments: subData,
//             }
//           );
//           console.log(readData);
//           Swal.fire("success!", "Your Success To Add Treatment.", "success");
//           setTooth("");
//           setToothId("");
//           setStartDate("");
//           setEndDate("");
//           setDescription("");
//           setPatientId("");
//           setRegIid("");
//           setReqId("");
//           setSlectLevel("");
//           setPatientId("");
//           setIdSection("");
//           setclinicId("");
//           setIsSelect(false);
//           setIsSelectSave(false);
//           setSubData([]);
//         setAllData([]);
//         setIsSave(false);
//         }
//       } else {
//         Swal.fire({
//           icon: "error",
//           title: "Oops...",
//           text: "Something went wrong!, Please enter all data",
//         });
//       }
//     }
//   };

//   const data = async (level) => {
//     let access_token = localStorage.getItem("token");
//     const readClink = await axios.post(
//       "http://127.0.0.1:8000/api/assistant/get_level_courses",
//       {
//         access_token,
//         level,
//       }
//     );
//     setIsSave(false);
//     setCoures(readClink.data.courses);
//     console.log(readClink.data.courses);
//   };
//   console.log(courses);

//   useEffect(() => {
//     if (level !== null) {
//       data(level);
//     }
//   }, [level, isSave]);

//   const sectionId = async (course_id) => {
//     let access_token = localStorage.getItem("token");
//     const readSection = await axios.post(
//       "http://127.0.0.1:8000/api/assistant/get_course_sections",
//       {
//         access_token,
//         course_id,
//       }
//     );
//     console.log(readSection);
//     setDataSec(readSection.data.sections);
//   };
//   console.log(dataSec);

//   useEffect(() => {
//     if (idsection !== []) {
//       sectionId(idsection);
//     }
//   }, [idsection, isSave]);

//   const ShowStudent = async (clinic_id) => {
//     console.log(clinic_id);
//     let access_token = localStorage.getItem("token");
//     const readSection = await axios.post(
//       "http://127.0.0.1:8000/api/assistant/show_section_students",
//       {
//         clinic_id,
//         access_token,
//       }
//     );
//     setStudent(readSection.data.students);
//     console.log("xxxxx");
//     console.log(readSection);
//     if (student !== []) {
//       setIsSelect(true);
//       setIsSave(false);
//     }
//   };
//   console.log(student);

//   useEffect(() => {
//     if (clinic_id !== null) {
//       ShowStudent(clinic_id);
//     }
//   }, [clinic_id, isSave]);

//   console.log(student);
//   console.log(patient_id);

//   return (
//     <div className="p-5">
//       <div className="my-reservation-container w-100 my-res">
//         <div className="d-flex flex-row overflow-auto">
//           <div className="my-reservation-container w-100">
//             <Card className="w-100">
//               <div className="row">
//                 <div className="col">
//                   <label
//                     htmlFor="patient_id"
//                     className="form-label label_input"
//                   >
//                     Patient_Id
//                   </label>
//                   <label style={{ color: "red" }}>*</label>
//                   <input
//                     onChange={(e) => setPatientId(e.target.value)}
//                     type="text"
//                     className="form-control"
//                     id="patient_id"
//                     value={patient_id}
//                   ></input>
//                 </div>

//                 <div className="col">
//                   <label className="form-label label_input">
//                     Level<span style={{ color: "red" }}>*</span>
//                   </label>
//                   <Form.Select
//                     required
//                     defaultValue={"DEFAULT"}
//                     aria-label="Default select example"
//                     onChange={(e) => setSlectLevel(e.target.value)}
//                   >
//                     <option disabled={true} value="DEFAULT">
//                       Open this select menu
//                     </option>
//                     <option value="4">4</option>
//                     <option value="5">5</option>
//                   </Form.Select>
//                 </div>

//                 <div className="col">
//                   <label className="form-label label_input">
//                     Clinic<span style={{ color: "red" }}>*</span>
//                   </label>

//                   <Form.Select
//                     required
//                     defaultValue={"DEFAULT"}
//                     aria-label="Default select example"
//                     onChange={(e) => setIdSection(e.target.value)}
//                   >
//                     <option disabled={true} value="DEFAULT">
//                       Open this select menu
//                     </option>
//                     {courses.map((course) => (
//                       <option key={course.id} value={course.id}>
//                         {course.name}
//                       </option>
//                     ))}
//                   </Form.Select>
//                 </div>

//                 <div className="col">
//                   <label className="form-label label_input">
//                     Time<span style={{ color: "red" }}>*</span>
//                   </label>
//                   <Form.Select
//                     required
//                     defaultValue={"DEFAULT"}
//                     aria-label="Default select example"
//                     onChange={(e) => setclinicId(e.target.value)}
//                   >
//                     <option disabled={true} value="DEFAULT">
//                       Open this select menu
//                     </option>
//                     {dataSec.map((dataSe) => (
//                       <option key={dataSe.id} value={dataSe.id}>
//                         {dataSe.day} : {dataSe.start_time} - {dataSe.end_time}
//                       </option>
//                     ))}
//                   </Form.Select>
//                 </div>
//               </div>
//             </Card>
//           </div>
//         </div>
//       </div>

//       {isSelect && (
//         <div className="my-reservation-container w-100 my-res">
//           <div className="d-flex flex-row overflow-auto">
//             <div className="first-reservation-container w-100">
//               <Card className="w-100">
//                 <Table
//                   key={1}
//                   hover
//                   size="sl"
//                   className="text-center my-3 "
//                   style={{
//                     width: "100%",
//                     borderCollapse: "collapse",
//                     fontFamily: "Arial, sans-serif",
//                     color: "#333",
//                   }}
//                 >
//                   <thead key={1}>
//                     <tr>
//                       <th>id</th>
//                       <th>name</th>
//                       <th>reg_id</th>
//                       <th>reqs</th>
//                       <th>status</th>
//                       <th>select</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {student.map((init, index) => (
//                       <Fragment key={index}>
//                         <tr>
//                           <td>{init.id}</td>

//                           <td>{init.name}</td>
//                           <td>{init.reg_id}</td>

//                           <td>
//                             {init.reqs.map((tratdata, index) => (
//                               <Fragment>
//                                 <tr>
//                                   <td>
//                                     <ol>
//                                       <li>{tratdata.name}</li>
//                                       <hr />
//                                     </ol>
//                                   </td>
//                                 </tr>
//                               </Fragment>
//                             ))}
//                           </td>

//                           <td className="element">
//                             {init.reqs.map((tratdata, index) => (
//                               <Fragment>
//                                 <tr>
//                                   <td>
//                                     <ol className="mt-2 d-flex justify-content-center text-center">
//                                       <li>{tratdata.status}</li>
//                                     </ol>
//                                   </td>
//                                 </tr>
//                               </Fragment>
//                             ))}
//                           </td>

//                           <td>
//                             {init.reqs.map((tratdata, index) => (
//                               <Fragment>
//                                 <tr>
//                                   <td>
//                                     <ol>
//                                       <li>
//                                         {tratdata.status === "completed" ||
//                                         tratdata.status === "not completed" ? (
//                                           tratdata.status === "completed" ? (
//                                             <div className="btn btn-outline-success mb-1 p-2 w-100">
//                                               Done
//                                             </div>
//                                           ) : (
//                                             <div className="btn btn-outline-warning mb-1 p-2 w-100">
//                                               Working
//                                             </div>
//                                           )
//                                         ) : (
//                                           <button
//                                             className="btn btn-outline-info mb-1 p-2 w-100"
//                                             onClick={() =>
//                                               handleAddData(
//                                                 init.id,
//                                                 init.name,
//                                                 init.reg_id,
//                                                 tratdata.id,
//                                                 tratdata.name,
//                                                 tratdata.course_id
//                                               )
//                                             }
//                                           >
//                                             Reserve
//                                           </button>
//                                         )}
//                                       </li>
//                                       <hr />
//                                     </ol>
//                                   </td>
//                                 </tr>
//                               </Fragment>
//                             ))}
//                           </td>
//                         </tr>
//                       </Fragment>
//                     ))}
//                   </tbody>
//                 </Table>
//               </Card>
//             </div>
//           </div>
//         </div>
//       )}

//       {isSelectSave && (
//         <div className="my-reservation-container w-100 my-res">
//           <div className="d-flex flex-row  overflow-auto">
//             <div className="first-reservation-container w-100">
//               <Card className="w-100">
//                 <Table key={1} hover size="sl" className="text-center my-3">
//                   <thead key={1}>
//                     <tr>
//                       <th>student id</th>
//                       <th>Student name</th>
//                       <th>reqs</th>
//                       <th>description</th>
//                       <th>tooth</th>
//                       <th>tooth id</th>
//                       <th>start_date</th>
//                       <th>end_date</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {allData.map((init, index) => (
//                       <Fragment key={index}>
//                         <tr>
//                           <td>{init.student_id}</td>
//                           <td>{init.name_student}</td>
//                           <td>{init.neme_req}</td>
//                           <td>
//                             {" "}
//                             <input
//                               onChange={(e) => setDescription(e.target.value)}
//                               type="text"
//                               className="form-control"
//                               name="description"
//                               id="description"
//                             ></input>
//                           </td>
//                           <td>
//                             <Fragment className="col-6">
//                               <select
//                                 className="form-select"
//                                 name="tooth"
//                                 onChange={(e) => setTooth(e.target.value)}
//                               >
//                                 <option selected>Open this select menu</option>
//                                 <option value="upper right">upper right</option>
//                                 <option value="upper left">upper left</option>
//                                 <option value="lower right">lower right</option>
//                                 <option value="lower left">lower left</option>
//                               </select>
//                             </Fragment>
//                           </td>
//                           <td>
//                             {" "}
//                             <select
//                               className="form-select"
//                               name="tooth_id"
//                               onChange={(e) => setToothId(e.target.value)}
//                             >
//                               <option selected>Open this select menu</option>
//                               <option value="1">1</option>
//                               <option value="2">2</option>
//                               <option value="3">3</option>
//                               <option value="4">4</option>
//                               <option value="5">5</option>
//                               <option value="6">6</option>
//                               <option value="7">7</option>
//                               <option value="8">8</option>
//                               <option value="A">A</option>
//                               <option value="B">B</option>
//                               <option value="C">C</option>
//                               <option value="D">D</option>
//                               <option value="E">E</option>
//                               <option value="F">F</option>
//                               <option value="G">G</option>
//                               <option value="H">H</option>
//                             </select>
//                           </td>

//                           <td>
//                             {" "}
//                             <input
//                               onChange={(e) => setStartDate(e.target.value)}
//                               type="date"
//                               className="form-control"
//                               name="start_date"
//                               id="start_date"
//                             />
//                           </td>

//                           <td>
//                             {" "}
//                             <input
//                               onChange={(e) => setEndDate(e.target.value)}
//                               type="date"
//                               className="form-control"
//                               name="end_date"
//                               id="end_date"
//                             />
//                           </td>
//                           <td className="row flex-nowrap mx-3">
//                             <button
//                               className="btn btn-outline-info"
//                               onClick={() => {
//                                 addSubTreatment();
//                               }}
//                             >
//                               add
//                             </button>
//                           </td>
//                         </tr>
//                       </Fragment>
//                     ))}
//                   </tbody>
//                 </Table>

//                 <div className="mx-1 row flex-nowrap w-50">
//                   <button
//                     className="btn btn-outline-info w-100 d-flex justify-content-center text-center ml-5"
//                     onClick={() => {
//                       saveAddTreatment();
//                       isSelect(false);
//                       isSelectSave(false);
//                       setIsSave(true);
//                       setIsSelectSave(false);
//                     }}
//                   >
//                     Save All Change
//                   </button>
//                   <button
//                     className="btn btn-danger"
//                     onClick={() => {
//                       deleteReq();
//                     }}
//                   >
//                     Delete All Change
//                   </button>
//                 </div>
//               </Card>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

export default Add_Treatment;
