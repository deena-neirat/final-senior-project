import img8 from "../images/img8.jpg";
import img9 from "../images/solve.jpg";
import img11 from "../images/img11.jpg";
import img12 from "../images/img12.jpg";
import img13 from "../images/img13.jpg";
import img14 from "../images/img14.png";
import Carousel from "react-bootstrap/Carousel";
import pepole from "../images/pepole.png";
import deena from "../images/Deena.png";
import Donia from "../images/Donia.png";
import "./style.css";
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
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

const Home = () => {
  const [ShowEvaluateSentimantMonth, setShowEvaluateSentimant] = useState([]);
  const [ShowEvalua, setShowEvalua] = useState([]);
  const [ShowEvaluate, setShowEvaluate] = useState([]);

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

  const get_sentiments_result = async () => {
    let data3 = await axios.get(
      "http://127.0.0.1:8000/api/admin/get_sentiments_result"
    );
    console.log(data3.data.values_avg);

    setShowEvaluateSentimant(Object.keys(data3.data.values_avg));
    setShowEvalua(Object.values(data3.data.values_avg));
  };

  const show_stars_evaluation = async () => {
    let data2 = await axios.get(
      "http://127.0.0.1:8000/api/show_stars_evaluation"
    );
    console.log(data2.data.topics);
    setShowEvaluate(data2.data.topics);
  };

  useEffect(() => {
    // let access_token = localStorage.getItem("token");
    // showEvaluation(access_token);
    show_stars_evaluation();
    get_sentiments_result();
  }, []);

  return (
    <div className="allSlide">
      <Carousel>
        <Carousel.Item>
          <img className="slider" src={img8} alt="First slide" />
          <Carousel.Caption className="test2">
            <div className=" title">
              تحظى خدمات العلاج بالجامعة بتقدير عالٍ وتحظى بتقدير جيد ، مع
              تقييمات إيجابية من الزائرين الذين شرفونا في عيادات الجامعه لتقديم
              لهم أفضل الخدمات المتوفره لمعالجه أسنانهم. وأيضا توفر مجموعة واسعة
              من دعم لمساعدة الطلاب على النجاح أكاديميا وشخصيا
              <br /> ومن العيادات المتوفره و الخدمات المقدمة
            </div>

            <div className="text2">
              <h4 className="fs-2">عيادات الأطفال</h4>
              <p>
                ...تقديم كافة الخدمات العلاجية للاطفال من قلع الاسنان وتسوس
                الاسنان وغيرها
              </p>
            </div>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item className="shadow-lg">
          <img className="slider" src={img9} alt="Second slide" />
          <Carousel.Caption>
            <div className=" title">
              تحظى خدمات العلاج بالجامعة بتقدير عالٍ وتحظى بتقدير جيد ، مع
              تقييمات إيجابية من الزائرين الذين شرفونا في عيادات الجامعه لتقديم
              لهم أفضل الخدمات المتوفره لمعالجه أسنانهم. وأيضا توفر مجموعة واسعة
              من دعم لمساعدة الطلاب على النجاح أكاديميا وشخصيا
              <br /> ومن العيادات المتوفره و الخدمات المقدمة
            </div>
            <div className="text2">
              <h4 className="fs-2">عيادات علاج جذور الأسنان </h4>
              <p>
                قناة الجذر هي إحدى الإجراءات الطبية العلاجية في عالم الأسنان.
                يستخدم هذا النوع من العلاج لإنقاذ الأسنان الذي يكاد يتآكل من
                التسوس ، أو لإنقاذ سن تعرض لالتهاب أو ضرر شديد. هذا العلاج
                يستهدف قلب العصب السني الموجود داخل الجذر قناة السن. من مزيج من
                الأعصاب والدم أوعية.
              </p>
            </div>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item className="shadow-lg">
          <img className="slider" src={img12} alt="Third slide" />
          <Carousel.Caption>
            <div className=" title">
              تحظى خدمات العلاج بالجامعة بتقدير عالٍ وتحظى بتقدير جيد ، مع
              تقييمات إيجابية من الزائرين الذين شرفونا في عيادات الجامعه لتقديم
              لهم أفضل الخدمات المتوفره لمعالجه أسنانهم. وأيضا توفر مجموعة واسعة
              من دعم لمساعدة الطلاب على النجاح أكاديميا وشخصيا
              <br /> ومن العيادات المتوفره و الخدمات المقدمة
            </div>
            <div className="text2">
              <h4 className="fs-2">عيادات طب الأسنان التحفظي</h4>
              <p>
                وهو عملية علاجية يتم من خلالها إزالة الحد الأدنى من بنية الأسنان
                السليمة أثناء عملية الترميم ، هو بطبيعته هدف مرغوب فيه للأسنان.
                لا يزال المينا الطبيعي وعاج الأسنان الطبيعي من أفضل المواد
                الموجودة في طب الأسنان ، وبالتالي يفضل إجراء إجراءات طفيفة
                التوغل للحفاظ على المزيد من بنية الأسنان الصحية الأصلية.
              </p>
            </div>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item className="shadow-lg">
          <img className="slider" src={img13} alt="Four slide" />
          <Carousel.Caption>
            <div className=" title">
              تحظى خدمات العلاج بالجامعة بتقدير عالٍ وتحظى بتقدير جيد ، مع
              تقييمات إيجابية من الزائرين الذين شرفونا في عيادات الجامعه لتقديم
              لهم أفضل الخدمات المتوفره لمعالجه أسنانهم. وأيضا توفر مجموعة واسعة
              من دعم لمساعدة الطلاب على النجاح أكاديميا وشخصيا
              <br /> ومن العيادات المتوفره و الخدمات المقدمة
            </div>
            <div className="text2">
              <h4 className="fs-2">عيادات أمراض اللثه</h4>
              <p>
                تنجم أمراض اللثة بشكل رئيسي عن التهابات والتهابات اللثة عظام
                التي تحيط بالأسنان وتدعمها. يمكن أن تصبح اللثة منتفخة وحمراء ،
                وقد تنزف. في شكله الأكثر خطورة ، والذي يسمى التهاب دواعم السن
                يمكن أن تبتعد اللثة عن الأسنان، وقد ترتخي الأسنان أو تتساقط
              </p>
            </div>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item className="shadow-lg">
          <img className="slider" src={img14} alt="Five slide" />
          <Carousel.Caption>
            <div className=" title">
              تحظى خدمات العلاج بالجامعة بتقدير عالٍ وتحظى بتقدير جيد ، مع
              تقييمات إيجابية من الزائرين الذين شرفونا في عيادات الجامعه لتقديم
              لهم أفضل الخدمات المتوفره لمعالجه أسنانهم. وأيضا توفر مجموعة واسعة
              من دعم لمساعدة الطلاب على النجاح أكاديميا وشخصيا
              <br /> ومن العيادات المتوفره و الخدمات المقدمة
            </div>
            <div className="text2">
              <h4 className="fs-2">عيادات الجراحه </h4>
              <p>
                إجراء قد يلجأ إليه الطبيب لإزالة سن لا يمكن إصلاحها باستخدام
                الحشوات أو غيرها من الإجراءات التقليدية، وذلك كما في حالات تعرض
                إحداها لتهشم شديد، أو كونها مدفونة أسفل اللثة، أو بها تشوهات
                أصابت جذرها.
              </p>
            </div>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item className="shadow-lg">
          <img className="slider" src={img11} alt="Six slide" />
          <Carousel.Caption>
            <div className=" title">
              تحظى خدمات العلاج بالجامعة بتقدير عالٍ وتحظى بتقدير جيد ، مع
              تقييمات إيجابية من الزائرين الذين شرفونا في عيادات الجامعه لتقديم
              لهم أفضل الخدمات المتوفره لمعالجه أسنانهم. وأيضا توفر مجموعة واسعة
              من دعم لمساعدة الطلاب على النجاح أكاديميا وشخصيا
              <br /> ومن العيادات المتوفره و الخدمات المقدمة
            </div>
            <div className="text2">
              <h4 className="fs-2">عيادات التعويضات السنية</h4>
              <p>
                فرع من فروع طب الأسنان مخصص لاستبدال الأسنان المفقودة أو
                التالفة. تشمل علاجات التعويضات السنية الشائعة أطقم الأسنان
                وزراعة الأسنان والتيجان والجسور
              </p>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      {/* <div className="side1">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-4 col-12 fw-bold fs-1 titleA">
              حول التطبيق{" "}
            </div>
            <div className="col-md-8 col-12">
              <ul className="textil">
                <li className="textilol">
                  يساعد الزائر على التسجيل في عيادات الجامعة للقيام بالفحص
                  الأولي في التاريخ الذي يناسبه و الوقت الذي يناسبه
                </li>
                <br />
                <li className="textilol">
                  يساعد الطلاب على رؤية مواعيد العيادات المسجل فيها حيث يستطيع
                  أن يرى المريض المسجل عنده و سجله الطبي
                </li>
                <br />
                <li className="textilol">
                  يساعد المساعد يقوم على وضع المريض في العياده التي سوف تعالج
                  أمراضه ويسستطيع أن يعمل سجل للمريض و قراءة سجل المريض
                </li>
                <br />
                <li className="textilol">
                  يستطيع دكتور الأسنان رؤيه عياداته و مواعيدها و اسماء الطلاب
                  المسجلين بهذه العياده مع اسماء المرضى اللذين تمت معالجتهم
                  ورؤية سجلهم العلاجي
                </li>
                <br />
                <li className="textilol">
                  يساعد السكرتيره ان ترى اسماء الزوار اللذين سوف ياتون حسب
                  التاريخ اللذي تريده مع ارساله ملف للأمن باسماء الزوار القادمين
                </li>
                <br />
                <li className="textilol">
                  يساعد مصور الأشعه ان يرفع صوره الأسنان للمريض حيث يتم اضافته
                  في السجل الخاص بالمريض
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div> */}

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
      

      <div className="container">
        <div className="titleAbout mt-5">فريقنا</div>

        <div className="row contentCard">
          <Card
            style={{ width: "20rem" }}
            className="col-md-4 col-12 m-5 contentCardContent3  contentCard service-item"
          >
            <Card.Img
              variant="top"
              src={pepole}
              className="p-3"
              width="30%"
              height="280px"
            />

            <Card.Body className="cardText overlay">
              <hr />
              <Card.Title>رشا ابو الرب</Card.Title>
              <Card.Text>
                Back-End
                <br />
                r.aborub@student.aaup.edu
              </Card.Text>
            </Card.Body>
          </Card>

          <Card
            style={{ width: "20rem" }}
            className="col-md-4 col-12 m-5 contentCardContent4 contentCard"
          >
            <Card.Img
              variant="top"
              src={deena}
              className="p-3"
              width="30%"
              height="280px"
            />
            <Card.Body className="cardText">
              <hr />
              <Card.Title>دينا نعيرات</Card.Title>
              <Card.Text>
                Front-End
                <br />
                d.neiart1@student.aaup
              </Card.Text>
            </Card.Body>
          </Card>

          <Card
            style={{ width: "20rem" }}
            className="col-md-4 col-12 m-5 contentCardContent5 contentCard"
          >
            <Card.Img
              variant="top"
              src={Donia}
              className="p-3"
              width="30%"
              height="280px"
            />
            <Card.Body className="cardText">
              <hr />
              <Card.Title>دنيا نعيرات</Card.Title>
              <Card.Text>
                Front-End
                <br />
                d.neiart2@student.aaup
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Home;
