import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { Card, Table } from "react-bootstrap";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";

import "./style.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Admin = () => {
  let [date, setDate] = useState();
  const [positeve, setPositeve] = useState([]);
  const [negitave, setNegative] = useState([]);
  const [isSelect, setIsSelect] = useState(false);

  function getFormValue(e) {
    let myUser = { ...date };
    myUser[e.target.name] = e.target.value;
    setDate(myUser);
  }

  var options = {
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    legend: {
      lables: {
        fontSize: 26,
      },
    },
  };

  const [view, setView] = useState({
    total_treatments: "",
    cancelled_treatments: "",
    clients: "",
  });

  const [ShowEvaluate, setShowEvaluate] = useState([]);
  const [ShowEvaluateSentimantMonth, setShowEvaluateSentimant] = useState([]);
  const [ShowEvalua, setShowEvalua] = useState([]);

  const api = axios.create({
    baseURL: `http://127.0.0.1:8000/api/admin/get_general_info`,
  });

  const showEvaluation = async (access_token) => {
    let data = await api.get(`/${access_token}`);
    console.log(data.data);
    setView(data.data);
  };

  const show_stars_evaluation = async () => {
    let data2 = await axios.get(
      "http://127.0.0.1:8000/api/show_stars_evaluation"
    );
    console.log(data2.data.topics);
    setShowEvaluate(data2.data.topics);
  };

  const get_sentiments_result = async () => {
    let data3 = await axios.get(
      "http://127.0.0.1:8000/api/admin/get_sentiments_result"
    );
    console.log(data3.data.values_avg);

    setShowEvaluateSentimant(Object.keys(data3.data.values_avg));
    setShowEvalua(Object.values(data3.data.values_avg));
  };

  console.log(view);
  console.log(ShowEvaluate);
  console.log(ShowEvaluateSentimantMonth);
  console.log(ShowEvalua);

  var data = {
    labels: ShowEvaluateSentimantMonth,
    datasets: [
      {
        label: "Value of result of Sentimant Analysis in Month",
        data: ShowEvalua,
        borderWidth: 5,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        // backgroundColor :["rgba(25,92,11,0.5)"],
        // borderColor: 'rgb(53, 162, 235)',
      },
    ],
  };

  useEffect(() => {
    let access_token = localStorage.getItem("token");
    showEvaluation(access_token);
    show_stars_evaluation();
    get_sentiments_result();
  }, []);

  const readData = async (date) => {
    let access_token = localStorage.getItem("token");
    await axios
      .post("http://127.0.0.1:8000/api/admin/get_comment_text", {
        access_token,
        date,
      })
      .then((res) => {
        console.log(res);
        // setIsSelect(true)
        setPositeve(res.data.positive);
        setNegative(res.data.negative);
      });
  };

  console.log(negitave);
  console.log(positeve);

  return (
    <div>
      <div className="d-flex flex-row">
        <div className="appointment9  w-100">
          <div className="d-flex flex-row overflow-auto space">
            <div className="row contentCard">
              <Card
                style={{ width: "20rem" }}
                className="col-md-4 col-12 m-5 contentCardContent  contentCard service-item color1"
              >
                <Card.Body className="cardText overlay ">
                  <Card.Title className="ar-f">total_treatments</Card.Title>
                  <Card.Text>{view.total_treatments}</Card.Text>
                </Card.Body>
              </Card>

              <Card
                style={{ width: "20rem" }}
                className="col-md-4 col-12 m-5 contentCardContent  contentCard service-item color2"
              >
                <Card.Body className="cardText overlay">
                  <Card.Title className="ar-f">cancelled_treatments</Card.Title>
                  <Card.Text>{view.cancelled_treatments}</Card.Text>
                </Card.Body>
              </Card>

              <Card
                style={{ width: "20rem" }}
                className="col-md-4 col-12 m-5 contentCardContent  contentCard service-item color3"
              >
                <Card.Body className="cardText overlay">
                  <Card.Title className="ar-f">clients</Card.Title>
                  <Card.Text>{view.clients}</Card.Text>
                </Card.Body>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Card className="m-5">
        <div className="m-5">
          <Bar data={data} height={400} options={options} />
        </div>
      </Card>

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
                        <td className="w-35">
                          <span>{show.topic}</span>
                        </td>
                        <td>
                          <input
                            className="range"
                            type="range"
                            value={show.evaluation}
                            min="0"
                            max="5"
                            style={{
                              backgroundColor: "red",
                              // background: (() => {
                              //   if (
                              //     show.evaluation >= 4 &&
                              //     show.evaluation <= 5
                              //   ) {
                              //     return "green";
                              //   } else if (
                              //     show.evaluation > 2 &&
                              //     show.evaluation <= 3
                              //   ) {
                              //     return "orange";
                              //   } else if (
                              //     show.evaluation > 0 &&
                              //     show.evaluation < 2
                              //   ) {
                              //     return "red";
                              //   }
                              // })(),
                            }}
                          />
                        </td>
                        <td>
                          <span>{show.evaluation}</span>
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

      <div className="appointment4">
        <div className="d-flex flex-row overflow-auto">
          <div className="first-reservation-container14 w-100">
            <span className="fs-1">Read Data</span>
            <Card>
              <Card.Body className="shadow">
                <div className="d-flex">
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
                    onClick={() => readData(date)}
                  >
                    Search
                  </a>
                </div>

                <div className="row mt-4">
                  <div className="col-12 col-md-6">
                    <p>Positive Data</p>
                    <hr/>
                    <br />
                    <div>
                      {positeve.map((txt, index) => (
                        <ol>
                          <li>{txt.text}</li>
                        </ol>
                      ))}
                    </div>
                    {/* <hr/> */}
                  </div>
                  <div className="col-12 col-md-6">
                    <p>Negative Data</p>
                    <hr/>
                    <br />
                    <div>
                      {negitave.map((txt, index) => (
                        <ol>
                          <li>{txt.text}</li>
                        </ol>
                      ))}
                    </div>
                    {/* <hr/> */}
                  </div>
                </div>

                {/* <Table key={1} hover size="sl" className=" my-3">
                  <thead>
                    <tr>
                      <th>Positive Data</th>
                      <th>Negative Data</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                    <td>
                      {positeve.map((txt, index) => (
                        <ul>
                          <li>{txt.text}</li>
                        </ul>
                      ))}
                    </td>
                    <td>
                      {negitave.map((txt, index) => (
                        <ul>
                          <li>{txt.text}</li>
                        </ul>
                      ))}
                    </td>
                    </tr>
                  </tbody>
                </Table> */}
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
