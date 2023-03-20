import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import axios from "axios";
// import { setLabels } from 'react-chartjs-2/dist/utils'

ChartJS.register(CategoryScale, LinearScale, BarElement);

const Courses_Plan = () => {
  let req = [];
  let status = [];

  const [req1,setReq] = useState([]);
  const [status1,setStatus] = useState([]);

  console.log(status1);

  var data = {
    labels: req1,
    datasets: [
      {
        label: "Completion rate : completed => 2 / not completed => 1 / canceld => 0",
        data: status1,
        borderWidth: 1,
        backgroundColor: "rgba(255,55,132,0.5)",
      },
    ],
  };


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

  const api = axios.create({
    baseURL: `http://127.0.0.1:8000/api/student/show_progress`,
  });

  const showDataCourse = async (access_token) => {
    const data = await api.get(`/${access_token}`);
    console.log(data.data.progress);
    getDataRes(data.data.progress);
  };

  const getDataRes = (progress) => {
    console.log(progress);

    // console.log(progress.progress);

    for (const dataObject of progress) {
      // console.log(dataObject);
      for (const reqObject of dataObject.progress) {
        // console.log(reqObject);
        req.push(reqObject.name);
        //console.log(reqObject.status)
        if(reqObject.status !==null){
          if (reqObject.status.status === "not completed") {
            status.push(1);
          } else if (reqObject.status.status === "completed") {
            status.push(2);
          }
        }
         else {
          status.push(0);
        }
      }
    }

    setReq(req);
    setStatus(status);

    console.log(req);
    console.log(status);

    
  };

  useEffect(() => {
    let access_token = localStorage.getItem("token");
    req = [];
    status = [];
    showDataCourse(access_token);
  }, []);

  return (
    <div>
      <Bar data={data} height={400} options={options} />
    </div>
  );
};

export default Courses_Plan;
