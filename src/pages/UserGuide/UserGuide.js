import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import "./style.css";
import Capture from "../images/Capture.PNG";
import project from '../images/Project2.mp4' 
import axios from "axios";

const UserGuide = () => {
  const [video,setVideo] = useState('');

  useEffect (  () => {
    axios.get(
      "http://127.0.0.1:8000/api/get_vedio"
    )
    .then((res) => {

      console.log(res.data.msg);
      setVideo(res.data.msg)
    })
  },[])

  return (
    <div className="userGuide">
      <div className="vidoGuidediv">
        <div className="vidoGuideText m-5 ar-f">
          <div className="fw-bold">
            <h2> دليل استخدام الموقع </h2>
          </div>
        </div>
      </div>

      {/* <div className="w-100">
      <img className="slider" src={Capture} alt="Third slide" />
      </div> */}
     
       <div className="vidoGuide d-md-flex d-block">
        {/* <iframe width="75vw" height="50vw"
          style={{
            // height: "50vw",
            maxHeight: "550px",
            // width: "75vw",
            margin: "20px 0",
          }}
          src={video}
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe> */}
{/* <video>
    
    <source src='https://youtu.be/YW4iEX_uMaY'controls  width="75vw" height="50vw"/>
    Sorry, your browser doesn't support videos.
</video> */}

<ReactPlayer
            className="col-lg-8 col-12 my-5 child order-lg-0 order-1"
            controls
            url="https://youtu.be/YW4iEX_uMaY"
          />

      </div> 
    </div>
  );
};

export default UserGuide;
