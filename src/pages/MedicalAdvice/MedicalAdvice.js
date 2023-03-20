import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import "./style.css";

const MedicalAdvice = () => {
  const [advice, setAdvice] = useState([]);

  const showMedical = async () => {
    const data = await axios.get(
      "http://127.0.0.1:8000/api/admin/get_medical_advice"
    );
    // console.log(data);
    setAdvice(data.data.advice);
  };

  console.log(advice);

  useEffect(() => {
    showMedical();
  }, []);

  return (
    <div className="allback p-3 pt-5">
      <div className="container">
        {/* <div className="row  align-items-center justify-content-around">
          <div className="col-lg-4 col-12 my-5 child child1">
            نصائح عامه الكثير منا يتجاهلها, مع أنه يجب عدم اهمال هذه الأمور,
            وهذا الفيديو يعرض أهم الأمور التى يجب الإلتزام بها للحصول على أسنان
            صحيه وسليمه
          </div>
          <ReactPlayer
            className="child col-lg-8 col-12 my-5"
            controls
            url="https://www.youtube.com/watch?v=iIt7nTfiQ7M"
          />
        </div>

        <div className="row  align-items-center justify-content-around">
          <ReactPlayer
            className="col-lg-8 col-12 my-5 child order-lg-0 order-1"
            controls
            url="https://www.youtube.com/watch?v=b7Uxv-QCOSg&t=17s"
          />
          <div className="child child2 my-5 col-lg-4 col-12 order-lg-1 order-0">
            الكثير يجهل الطرق الصحيحة لتنظيف الأسنان, وهذا الفيديو سيوضح لكم
            الأدوات المستخدمة لتنظيف الأسنان والطرق الصحيحة لإستخدام هذه الأدوات
          </div>
        </div>

        <div className="row  align-items-center justify-content-around">
          <div className="child child3 my-5 col-lg-4 col-12">
            من أكثر أمراض الأسنان انتسارا هو تسوس الأسنان, وهذا الفيديو يعرض لكم
            أسباب الاصابه بتسوس الأسنان وكيفيه الوقايه منها
          </div>
          <ReactPlayer
            className="child col-lg-8 my-5 col-12"
            controls
            url="https://www.youtube.com/watch?v=6GakXex0_tQ"
          />
        </div> */}

        {advice.map((adv, index) => (
          <div className="row align-items-center justify-content-around">
            {index % 2 === 0 ? (
              <>
                <div className="col-lg-4 col-12 my-5 child child1">
                  {adv.title}
                </div>
                <ReactPlayer
                  className="child col-lg-8 col-12 my-5"
                  controls
                  url={adv.link}
                />
              </>
            ) : (
              <>
                <ReactPlayer
                  className="col-lg-8 col-12 my-5 child order-lg-0 order-1"
                  controls
                  url={adv.link}
                />
                <div className="child child2 my-5 col-lg-4 col-12 order-lg-1 order-0">
                {adv.title}
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MedicalAdvice;
