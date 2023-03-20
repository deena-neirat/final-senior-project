import React from "react";
import pepole from "../images/pepole.png";
import { Card } from "react-bootstrap-v5";
import deena from "../images/Deena.png";
import Donia from "../images/Donia.png";
import "./style.css";

const AboutUs = () => {
  return (
    <>
      <div className="side">
        <div className="container">
          <div>
            <div className="textilol1">
              <span className="titleA1">حول التطبيق</span>
              <br />
              تم انشاء هذا التطبيق لتسهيل على كل المستخدمين التعامل معه في جميع
              الأمور المختلفه, حيث يساعد الزائر على التسجيل في عيادات الجامعه
              للقيام بالفحص الأولى في التاريخ الذي يناسبه والوقت الذي يناسبه
              .ويساعد طلاب طب الأسنان على رؤيه مواعيد العيادات المسجل فيها, كما
              يستطيع أن يرى المريض المسجل عنده وسجله الطبي ويسهم في مساعده مساعد
              طبيب الأسنان في وضع المريض في العياده التي تناسب الحاله المرضيه
              لزائر و انشاء سجل طبي له . يستطيع دكتور الأسنان رؤيه عياداته و
              مواعيدها و اسماء الطلاب المسجلين بهذه العياده مع اسماء المرضى
              اللذين تمت معالجتهم ورؤية سجلهم . العلاجي يساعد مصور الأشعه ان
              يرفع صوره الأسنان للمريض حيث يتم اضافته في السجل الخاص بالمريض
              يساعد السكرتيره أن ترى اسماء الزوار اللذين سوف يأتون حسب التاريخ
              اللذي تريده مع ارساله ملف للأمن باسماء الزوار القادمين
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="titleAbout mt-5 ar-f">فريقنا</div>

        <div className="row contentCard">
          <Card
            style={{ width: "20rem" }}
            className="col-md-4 col-12 m-5 contentCardContent  contentCard service-item"
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
              <Card.Title className="ar-f">رشا ابو الرب</Card.Title>
              <Card.Text>
                Back-End
                <br />
                r.aborub@student.aaup.edu
              </Card.Text>
            </Card.Body>
          </Card>

          <Card
            style={{ width: "20rem" }}
            className="col-md-4 col-12 m-5 contentCardContent1 contentCard"
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
              <Card.Title className="ar-f">دينا نعيرات</Card.Title>
              <Card.Text>
                Front-End
                <br />
                d.neiart1@student.aaup
              </Card.Text>
            </Card.Body>
          </Card>

          <Card
            style={{ width: "20rem" }}
            className="col-md-4 col-12 m-5 contentCardContent2 contentCard"
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
              <Card.Title className="ar-f">دنيا نعيرات</Card.Title>
              <Card.Text>
                Front-End
                <br />
                d.neiart2@student.aaup
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
