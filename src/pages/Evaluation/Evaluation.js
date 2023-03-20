import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { FaStar } from "react-icons/fa";
import Swal from "sweetalert2";
import "./style.css";

const Evaluation = () => {
  const [ratedIndex, setRatedIndex] = useState(null);
  const [ratedValue, setRatedValue] = useState(null);
  const [hoverRatedValue, setHoverRatedValue] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [sentencesRating, setSentencesRating] = useState([]);
  const [access_token, setAccessToken] = useState("");
  const [sentimant,setSentimant] = useState('');

  const getStatres = async () => {
    let access_token = localStorage.getItem("token");
    setAccessToken(access_token);
    const rate = await axios.get(
      `http://127.0.0.1:8000/api/patient/get_stars_topics/${access_token}`
    );
    setSentencesRating(rate.data.topics);
    // console.log(sentencesRating)
  };

  //console.log(sentencesRating);

  useEffect(() => {
    getStatres();
  }, []);

  const ratingData = async (id, value, index,topic) => {
    console.log(id);
    console.log(value);
    console.log(access_token);

    setRatedValue(value);
    setRatedIndex(index);
    let ratingValue=(value%5)+1
    const ratreStare = await axios.post(
      "http://127.0.0.1:8000/api/patient/stars_evaluation",
      { id, value:ratingValue, access_token }
    );
    console.log(ratreStare);
    Swal.fire({
      position: 'top',
      icon: 'success',
      title: `Your Evaluate Success for ${topic} Thank You `,
      showConfirmButton: false,
      timer: 1500
    })
  };

  var count = 0;
  const inRange = (ratingVal, ratedValue, ratedIndex) => {
    return (
      ratedValue !== null &&
      ratedIndex !==
        null && (
          ratingVal <= ratedValue &&
            ratingVal >= ratedIndex * 5 &&
            ratingVal < (ratedIndex + 1) * 5
        )
    );
  };

  const sentimantFun = async(sentimant) => {
    console.log('xxxxx')
    console.log(sentimant)
    await axios .post("http://127.0.0.1:8000/api/patient/send_comment",
    {
      access_token , txt:sentimant
    })
    .then((res) =>{
      // if (res.data === 200){
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Thanks you for write opinien",
          showConfirmButton: false,
          timer: 1500,
        });
      // }
      setSentimant('')
    })
    .catch((err) => {
    console.error(err)
    Swal.fire({
      position: "center",
      icon: "error",
      title: "Please Enter data",
      showConfirmButton: false,
      timer: 1500,
    
    })
  });
  }


  return (
    <div className="mx-1 text-center p-3 ">
      <div className=" d-flex flex-column">
        <Card className="p-4 shadow my-5 w-100">
          {sentencesRating.map((sentence, index) => {
            return (
              <Fragment key={index}>
                <div
                  className="border-1 border-bottom mb-4 pb-4 w-100"
                  key={sentence.id}
                >
                  <h2 className="text-main mb-3">{sentence.topic}</h2>

                  {[...Array(5)].map((star, i) => {
                    const ratingValue = count++;

                    return (
                      <label>
                        <input
                          type="radio"
                          onClick={() =>
                            ratingData(sentence.id, ratingValue, index,sentence.topic)
                          }
                          name={`rating-${sentence.id}`}
                          value={ratingValue}
                          className="removedotradio"
                          checked={ratingValue === ratedValue}
                        />
                        <FaStar
                          className="stare"
                          onMouseLeave={() => {
                            setHoveredIndex(null);
                            setHoverRatedValue(null);
                          }}
                          onMouseEnter={() => {
                            setHoveredIndex(index);
                            setHoverRatedValue(ratingValue);
                          }}
                          color={
                            inRange(
                              ratingValue,
                              hoverRatedValue,
                              hoveredIndex
                            ) || inRange(ratingValue, ratedValue, ratedIndex)
                              ? "#ffc107"
                              : "#e4e5e9"
                          }
                          size={30}
                        />
                      </label>
                    );
                  })}
                </div>
              </Fragment>
            );
          })}
        </Card>
      </div>

      {/* to write opinion */}
      <Card className="p-4 shadow my-5 w-100">
        <Card.Header className="p-3 my-3">
          <h1 className="text-main mb-3 text-center">Write Your Opinion</h1>
        </Card.Header>
        <div className="mb-3">
          <textarea
            onChange={(e) => setSentimant(e.target.value)}
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="5"
            name="opinin"
            value={sentimant}
          ></textarea>
        </div>
        <button
          type="button"
          className="btn btn-outline-info fs-5 m-auto navlinka7"
          onClick={()=>sentimantFun(sentimant)}
          
        >
          Submit
        </button>
      </Card>
    </div>
  );
};

export default Evaluation;
