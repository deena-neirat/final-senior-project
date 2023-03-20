import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Table } from "react-bootstrap";
import Swal from "sweetalert2";
import "./style.css";

const Assistant = () => {
  const [access_token, setAccessToken] = useState();

  let [patientid, setPatientid] = useState();
  let [objPatientName, setObjPatientName] = useState();

  const [Congential_Heart_Disease, setCongential_Heart_Disease] =
    useState("no");
  const [Heart_Failur, setHeart_Failur] = useState("no");
  const [Heart_Attack, setHeart_Attack] = useState("no");
  const [Angina, setAngina] = useState("no");
  const [Pacemaker, setPacemaker] = useState("no");
  const [Other_Heart_Disease, setOther_Heart_Disease] = useState("no");

  const [Anemia, setAnemia] = useState("no");
  const [Hemophilia, setHemophilia] = useState("no");
  const [Lcukaemia, setLcukaemia] = useState("no");
  const [Blood_Transfusion, setBlood_Transfusion] = useState("no");
  const [Other_Blood_Disease, setOther_Blood_Disease] = useState("no");

  const [Asthma, setAsthma] = useState("no");
  const [
    Chronic_Obstructive_Pulmonary_Disease,
    setChronic_Obstructive_Pulmonary_Disease,
  ] = useState("no");

  const [Gastro_ocsophagcal_reflux, setGastro_ocsophagcal_reflux] =
    useState("no");
  const [Hepatitits, setHepatitits] = useState("no");
  const [Liver_disease, setLiver_disease] = useState("no");

  const [Epilepsy, setEpilepsy] = useState("no");
  const [Parkinsons_disease, setParkinsons_disease] = useState("no");

  const [Kidney_Failur, setKidney_Failur] = useState("no");
  const [Dialysis, setDialysis] = useState("no");

  const [Drug_Allergy, setDrug_Allergy] = useState("no");
  const [Food_Allergy, setFood_Allergy] = useState("no");
  const [Cancer, setCancer] = useState("no");

  const [hard_to_breathe, sethard_to_breathe] = useState("no");
  const [sleep_scared, setsleep_scared] = useState("no");
  const [people_nervous, setpeople_nervous] = useState("no");
  const [nightmares, setnightmares] = useState("no");
  const [Thumb_succing, setThumb_succing] = useState("no");
  const [Toungue_thrust, setToungue_thrust] = useState("no");
  const [Nail_biting, setNail_biting] = useState("no");
  const [Other_Habits, setOther_Habits] = useState("no");

  const [diseases, setDiseases] = useState({
    // patient_name: "",
    patient_id: '',
    Chief_Complaint: '',
    health_changes: '',
    physician_care: "",
    serious_illnesses_or_operations: "",
    pregnant: "",
    Medicines_currently_used: "",
    smoke: "",
    cigarette_kind: "",
    cigarette_frequently: "",
    dental_treatment_problem: "",
    face_jaw_teeth_injury: "",
    dry_mouth: "",
    local_anesthetic_reaction: "",
    clench_on_teeth: "",
    TMJ: "",
    Lymph_node: "",
    Patient_profile: "",
    Lip_Competency: "",
    Incisol_classification: "",
    Overjet: "",
    Overbite: "",
    Hard_Palate: "",
    mucosa: "",
    Floor_of_mouth: "",
    Lips: "",
    Tongue: "",
    Gums_and_Tissues: "",
    Saliva: "",
    Natural_Teeth: "",
    Oral_Cleanliness: "",
    Dental_Pain: "",
    Dentures: "",
  });

  console.log(diseases);
  console.log(
    `Congential_Heart_Disease : ${Congential_Heart_Disease}`,
    `Heart_Failur : ${Heart_Failur}`,
    `Heart_Attack : ${Heart_Attack}`,
    ` Angina:${Angina}`,
    `Pacemaker : ${Pacemaker}`,
    `Other_Heart_Disease: ${Other_Heart_Disease}`,
    `Anemia : ${Anemia}`,
    `Hemophilia : ${Hemophilia}`,
    `Lcukaemia : ${Lcukaemia}`,
    `Blood_Transfusion :${Blood_Transfusion}`,
    `Other_Blood_Disease : ${Other_Blood_Disease}`,
    `Asthma : ${Asthma}`,
    `Chronic_Obstructive_Pulmonary_Disease : ${Chronic_Obstructive_Pulmonary_Disease}`,
    `Gastro_ocsophagcal_reflux : ${Gastro_ocsophagcal_reflux}`,
    `Hepatitits : ${Hepatitits}`,
    `Liver_disease : ${Liver_disease}`,
    `Epilepsy : ${Epilepsy}`,
    `Parkinsons_disease : ${Parkinsons_disease}`,
    `Kidney_Failur : ${Kidney_Failur}`,
    `Dialysis : ${Dialysis}`,
    `Drug_Allergy : ${Drug_Allergy}`,
    `Food_Allergy : ${Food_Allergy}`,
    `Cancer :${Cancer}`,
    `hard_to_breathe : ${hard_to_breathe}`,
    `sleep_scared : ${sleep_scared}`,
    `people_nervous : ${people_nervous}`,
    `nightmares : ${nightmares}`,
    `Thumb_succing : ${Thumb_succing}`,
    `Toungue_thrust : ${Toungue_thrust}`,
    `Nail_biting : ${Nail_biting}`,
    `Other_Habits : ${Other_Habits}`
  );

  function getFormValue(e) {
    console.log(diseases.patient_id)
    let myDiseases = { ...diseases };
    myDiseases[e.target.name] = e.target.value;
    setDiseases(myDiseases);
  } //done

  function getFormValue1(e) {
    setPatientid(e.target.value);
  }
  // ##################################
  // console.log(patientid);

  async function submitFormData() {
    //e.preventDefault();
    //بدنا نعمل شرط تنو لازم يدخل كل داتا والا ما ينفذ مناداه ونشوف كيف نخزن القيم في اراي وليش ما يشتغل رابط
     await axios
      .post("http://127.0.0.1:8000/api/assistant/create_patient_file", {
        ...diseases,
        Congential_Heart_Disease,
        Heart_Failur,
        Heart_Attack,
        Angina,
        Pacemaker,
        Other_Heart_Disease,
        Anemia,
        Hemophilia,
        Lcukaemia,
        Blood_Transfusion,
        Other_Blood_Disease,
        Asthma,
        Chronic_Obstructive_Pulmonary_Disease,
        Gastro_ocsophagcal_reflux,
        Hepatitits,
        Liver_disease,
        Epilepsy,
        Parkinsons_disease,
        Kidney_Failur,
        Dialysis,
        Drug_Allergy,
        Food_Allergy,
        Cancer,
        hard_to_breathe,
        sleep_scared,
        people_nervous,
        nightmares,
        Thumb_succing,
        Toungue_thrust,
        Nail_biting,
        Other_Habits,
        access_token,
      })
      .then((res) => {
        console.log(res);
        if (res.data.message === "file created") {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "You've selected a first reservation",
            showConfirmButton: false,
            timer: 1500,
          });
          setNumPage(1);
          setDiseases("");
          setObjPatientName("")
          
        } else {
          Swal.fire({
            position: "center",
            icon: "error",
            title: `${res.data.message}`,
          });
          setObjPatientName('')
        }
      })
      .catch(
        (err) =>
          Swal.fire({
            position: "center",
            icon: "error",
            title: `You Must Enter All Data`,
          }),
        setNumPage(1),
        setObjPatientName('')
      );
    //console.log(data);

    // goToLogin();
  }
  const [numpage, setNumPage] = useState(1);

  const getData = () => {
    let access_token = localStorage.getItem("token");
    setAccessToken(access_token);
  };

  useEffect(() => {
    getData();
  }, []);

  const goBack = (numpage) => {
    numpage -= 1;
    if (numpage === 0) {
      setNumPage(10);
    } else {
      setNumPage(numpage);
    }
    console.log(numpage);
  };

  const goNext = (numpage) => {
    if (numpage === 10) {
      setNumPage(1);
    } else {
      setNumPage(numpage + 1);
    }
    console.log(numpage);
  };

  async function searchID(patient_id) {
    // console.log(patient_id);
    let d = patient_id;
    console.log(d);
    const showId = await axios.get(
      `http://127.0.0.1:8000/api/assistant/get_patient_name/${patient_id}`
    );
    console.log(showId);
    setObjPatientName(showId.data.patient.name);
  }

  return (
    <div className="p-5">
      <div className="my-reservation-container w-100 my-res">
        <div className="d-flex flex-row overflow-auto">
          <div className="my-reservation-container w-100">
            <Card className="w-100">
              {numpage === 1 ? (
                <div>
                  <Card className="w-100">
                    <div className="row m-4">
                      <div className="col">
                        <input
                          type="number"
                          className="form-control"
                          name="patientid"
                          id="patientid"
                          placeholder="patient_id"
                          onChange={getFormValue1}
                        ></input>
                      </div>
                      <div className="col">
                        <button
                          type="button"
                          className="btn btn-outline-info w-100"
                          onClick={() => searchID(patientid)}
                        >
                          Sure Patient
                        </button>
                      </div>
                    </div>
                  </Card>
                  <hr />
                  <div className="row m-4">
                    <span className="col">
                      <label htmlFor="patient_name">
                        <b>Patient Name : </b>
                      </label>
                      <input
                        type="text"
                        className="form-control my-2"
                        id="patient_name"
                        name="patient_name"
                        value={objPatientName}
                      />
                    </span>
                    <span className="col">
                      <label htmlFor="patient_id">
                        <b>Id Number : </b>
                      </label>
                      <input
                        type="text"
                        className="form-control my-2"
                        id="patient_id"
                        name="patient_id"
                        // value={patientid}
                        onChange={getFormValue}
                      />
                    </span>
                    {/* <span className="col">
                      <label htmlFor="assname">
                        <b>Assistant Name : </b>
                      </label>
                      <input
                        type="text"
                        className="form-control my-2"
                        id="assname"
                        name="assname"
                      />
                    </span> */}
                  </div>
                  <hr />
                  <label htmlFor="Chief_Complaint" className="py-3">
                    <h2 className="text-main">Chief Complaint</h2>
                  </label>
                  <textarea
                    className="form-control p-3"
                    placeholder="Leave a comment here"
                    id="Chief_Complaint"
                    name="Chief_Complaint"
                    onChange={getFormValue}
                  ></textarea>

                  <span>
                    <b>
                      Have there been any changes in your health in the past
                      year ?
                    </b>
                  </span>
                  <label htmlFor="health_changes1" className="form-label p-2">
                    Yes
                  </label>
                  <span></span>
                  <input
                    type="radio"
                    id="health_changes1"
                    name="health_changes"
                    value="yes"
                    onChange={getFormValue}
                  />

                  <label htmlFor="health_changes" className="form-label p-2">
                    No
                  </label>
                  <input
                    type="radio"
                    id="health_changes"
                    name="health_changes"
                    value="no"
                    onChange={getFormValue}
                  />

                  <div>
                    <span>
                      <b>Are you under the care of a physician ?</b>
                    </span>
                    <input
                      type="radio"
                      id="yes"
                      name="physician_care"
                      value="yes"
                      onChange={getFormValue}
                    />
                    <label htmlFor="Yes" className="form-label p-2">
                      Yes
                    </label>
                    <span></span>
                    <input
                      type="radio"
                      id="physician_care"
                      name="physician_care"
                      value="no"
                      onChange={getFormValue}
                    />
                    <label htmlFor="physician_care" className="form-label p-2">
                      No
                    </label>
                    <br />
                  </div>

                  <div>
                    <span>
                      <b>Have you had any serious illnesses or operations ?</b>
                    </span>
                    <input
                      type="radio"
                      id="Yes"
                      name="serious_illnesses_or_operations"
                      value="yes"
                      onChange={getFormValue}
                    />
                    <label htmlFor="Yes" className="form-label p-2">
                      Yes
                    </label>
                    <span></span>
                    <input
                      type="radio"
                      id="serious_illnesses_or_operations"
                      name="serious_illnesses_or_operations"
                      value="no"
                      onChange={getFormValue}
                    />
                    <label
                      htmlFor="serious_illnesses_or_operations"
                      className="form-label p-2"
                    >
                      No
                    </label>
                    <br />
                  </div>

                  <div>
                    <span>
                      <b>Females: Are you pregnant ? </b>
                    </span>
                    <input
                      type="radio"
                      id="pregnantyes"
                      name="pregnant"
                      value="yes"
                      onChange={getFormValue}
                    />
                    <label htmlFor="pregnantyes" className="form-label p-2">
                      Yes
                    </label>
                    <span></span>
                    <input
                      type="radio"
                      id="pregnant"
                      name="pregnant"
                      value="no"
                      onChange={getFormValue}
                    />
                    <label htmlFor="pregnant" className="form-label p-2">
                      No
                    </label>
                    <br />
                  </div>
                </div>
              ) : (
                ""
              )}
              {numpage === 2 ? (
                <div>
                  <p>
                    <h2 className="text-main">Disease</h2>
                  </p>
                  <hr />
                  <div>
                    <b>
                      Please check if you have (or have had) any of the
                      following problems :
                    </b>
                  </div>
                  <div className="p-3">
                    <span>
                      <b>Heart Disease : </b>
                    </span>
                    <input
                      type="checkbox"
                      id="Heart_Failur"
                      name="Heart_Failur"
                      //value="yes"
                      //onChange={getFormValue}
                      value={Heart_Failur}
                      onChange={(e) => {
                        setHeart_Failur(e.target.checked ? "yes" : "no");
                      }}
                    />
                    <label htmlFor="Heart_Failur" className="form-label p-2">
                      Heart Failur
                    </label>

                    <input
                      type="checkbox"
                      id="Heart_Attack"
                      name="Heart_Attack"
                      //value="yes"
                      //onChange={getFormValue}
                      value={Heart_Attack}
                      onChange={(e) => {
                        setHeart_Attack(e.target.checked ? "yes" : "no");
                      }}
                    />
                    <label htmlFor="Heart_Attack" className="form-label p-2">
                      Heart Attack
                    </label>

                    <input
                      type="checkbox"
                      id="Angina"
                      name="Angina"
                      //value="yes"
                      //onChange={getFormValue}
                      value={Angina}
                      onChange={(e) => {
                        setAngina(e.target.checked ? "yes" : "no");
                      }}
                    />
                    <label htmlFor="Angina" className="form-label p-2">
                      Angina
                    </label>

                    <input
                      type="checkbox"
                      id="Pacemaker"
                      name="Pacemaker"
                      //value="yes"
                      //onChange={getFormValue}
                      value={Pacemaker}
                      onChange={(e) => {
                        setPacemaker(e.target.checked ? "yes" : "no");
                      }}
                    />
                    <label htmlFor="Pacemaker" className="form-label p-2">
                      Pacemaker
                    </label>

                    <input
                      type="checkbox"
                      id="Congential_Heart_Disease"
                      name="Congential_Heart_Disease"
                      // value="yes"
                      // onChange={getFormValue}
                      value={Congential_Heart_Disease}
                      onChange={(e) => {
                        setCongential_Heart_Disease(
                          e.target.checked ? "yes" : "no"
                        );
                      }}
                    />
                    <label
                      htmlFor="Congential_Heart_Disease"
                      className="form-label p-2"
                    >
                      Congenital Heart Disease
                    </label>

                    <input
                      type="checkbox"
                      id="Other_Heart_Disease"
                      name="Other_Heart_Disease"
                      //value="Other_Heart_Disease"
                      //onChange={getFormValue}
                      value={Other_Heart_Disease}
                      onChange={(e) => {
                        setOther_Heart_Disease(e.target.checked ? "yes" : "no");
                      }}
                    />
                    <label
                      htmlFor="Other_Heart_Disease"
                      className="form-label p-2"
                    >
                      Other
                    </label>
                  </div>
                  <div className="p-3">
                    <span>
                      <b>Blood Disease :</b>
                    </span>
                    <input
                      type="checkbox"
                      id="Anemia"
                      name="Anemia"
                      //value="Anemia"
                      //onChange={getFormValue}
                      value={Anemia}
                      onChange={(e) => {
                        setAnemia(e.target.checked ? "yes" : "no");
                      }}
                    />
                    <label htmlFor="Anemia" className="form-label p-2">
                      Anemia
                    </label>

                    <input
                      type="checkbox"
                      id="Hemophilia"
                      name="Hemophilia"
                      //value="Hemophilia"
                      //onChange={getFormValue}
                      value={Hemophilia}
                      onChange={(e) => {
                        setHemophilia(e.target.checked ? "yes" : "no");
                      }}
                    />
                    <label htmlFor="Hemophilia" className="form-label p-2">
                      Hemophilia
                    </label>

                    <input
                      type="checkbox"
                      id="Lcukaemia"
                      name="Lcukaemia"
                      //value="Lcukaemia"
                      //onChange={getFormValue}
                      value={Lcukaemia}
                      onChange={(e) => {
                        setLcukaemia(e.target.checked ? "yes" : "no");
                      }}
                    />
                    <label htmlFor="Lcukaemia" className="form-label p-2">
                      Leukaemia
                    </label>

                    <input
                      type="checkbox"
                      id="Blood_Transfusion"
                      name="Blood_Transfusion"
                      //value="Blood_Transfusion"
                      //onChange={getFormValue}
                      value={Blood_Transfusion}
                      onChange={(e) => {
                        setBlood_Transfusion(e.target.checked ? "yes" : "no");
                      }}
                    />
                    <label
                      htmlFor="Blood_Transfusion"
                      className="form-label p-2"
                    >
                      Blood Transfusion
                    </label>

                    <input
                      type="checkbox"
                      id="Other_Blood_Disease"
                      name="Other_Blood_Disease"
                      //value="Other_Blood_Disease"
                      //onChange={getFormValue}
                      value={Other_Blood_Disease}
                      onChange={(e) => {
                        setOther_Blood_Disease(e.target.checked ? "yes" : "no");
                      }}
                    />
                    <label
                      htmlFor="Other_Blood_Disease"
                      className="form-label p-2"
                    >
                      Other
                    </label>
                  </div>

                  <div className="p-3">
                    <span>
                      <b>Respiratory Disease :</b>{" "}
                    </span>
                    <input
                      type="checkbox"
                      id="Asthma"
                      name="Asthma"
                      //value="Asthma"
                      //onChange={getFormValue}
                      value={Asthma}
                      onChange={(e) => {
                        setAsthma(e.target.checked ? "yes" : "no");
                      }}
                    />
                    <label htmlFor="Asthma" className="form-label p-2">
                      Asthma
                    </label>

                    <input
                      type="checkbox"
                      id="Chronic_Obstructive_Pulmonary_Disease"
                      name="Chronic_Obstructive_Pulmonary_Disease"
                      //value="Chronic_Obstructive_Pulmonary_Disease"
                      //onChange={getFormValue}
                      value={Chronic_Obstructive_Pulmonary_Disease}
                      onChange={(e) => {
                        setChronic_Obstructive_Pulmonary_Disease(
                          e.target.checked ? "yes" : "no"
                        );
                      }}
                    />
                    <label
                      htmlFor="Chronic_Obstructive_Pulmonary_Disease"
                      className="form-label p-2"
                    >
                      Chronic Obstructive Pulmonary Disease
                    </label>
                  </div>

                  <div className="p-3">
                    <span>
                      <b>Gastrointestinal Disease :</b>{" "}
                    </span>
                    <input
                      type="checkbox"
                      id="Gastro_ocsophagcal_reflux"
                      name="Gastro_ocsophagcal_reflux"
                      //value="Gastro_ocsophagcal_reflux"
                      //onChange={getFormValue}
                      value={Gastro_ocsophagcal_reflux}
                      onChange={(e) => {
                        setGastro_ocsophagcal_reflux(
                          e.target.checked ? "yes" : "no"
                        );
                      }}
                    />
                    <label
                      htmlFor="Gastro_ocsophagcal_reflux"
                      className="form-label p-2"
                    >
                      Gastro-oesophageal reflux
                    </label>

                    <input
                      type="checkbox"
                      id="Hepatitits"
                      name="Hepatitits"
                      //value="Hepatitits"
                      //onChange={getFormValue}
                      value={Hepatitits}
                      onChange={(e) => {
                        setHepatitits(e.target.checked ? "yes" : "no");
                      }}
                    />
                    <label htmlFor="Hepatitits" className="form-label p-2">
                      Hepatitis
                    </label>

                    <input
                      type="checkbox"
                      id="Liver_disease"
                      name="Liver_disease"
                      //value="Liver_disease"
                      //onChange={getFormValue}
                      value={Liver_disease}
                      onChange={(e) => {
                        setLiver_disease(e.target.checked ? "yes" : "no");
                      }}
                    />
                    <label htmlFor="Liver_disease" className="form-label p-2">
                      Liver disease
                    </label>
                  </div>

                  <div className="p-3">
                    <span>
                      <b>Neurological System :</b>{" "}
                    </span>
                    <input
                      type="checkbox"
                      id="Epilepsy"
                      name="Epilepsy"
                      //value="Epilepsy"
                      //onChange={getFormValue}
                      value={Epilepsy}
                      onChange={(e) => {
                        setEpilepsy(e.target.checked ? "yes" : "no");
                      }}
                    />
                    <label htmlFor="Epilepsy" className="form-label p-2">
                      Epilepsy
                    </label>

                    <input
                      type="checkbox"
                      id="Parkinsons_disease"
                      name="Parkinsons_disease"
                      //value="Parkinsons_disease"
                      //onChange={getFormValue}
                      value={Parkinsons_disease}
                      onChange={(e) => {
                        setParkinsons_disease(e.target.checked ? "yes" : "no");
                      }}
                    />
                    <label
                      htmlFor="Parkinsons_disease"
                      className="form-label p-2"
                    >
                      Parkinson's Disease
                    </label>
                  </div>

                  <div className="p-3">
                    <span>
                      <b>Renal System :</b>
                    </span>
                    <input
                      type="checkbox"
                      id="Kidney_Failur"
                      name="Kidney_Failur"
                      //value="Kidney_Failur"
                      //onChange={getFormValue}
                      value={Kidney_Failur}
                      onChange={(e) => {
                        setKidney_Failur(e.target.checked ? "yes" : "no");
                      }}
                    />
                    <label htmlFor="Kidney_Failur" className="form-label p-2">
                      Kidney Failur
                    </label>

                    <input
                      type="checkbox"
                      id="Dialysis"
                      name="Dialysis"
                      //value="Dialysis"
                      //onChange={getFormValue}
                      value={Dialysis}
                      onChange={(e) => {
                        setDialysis(e.target.checked ? "yes" : "no");
                      }}
                    />
                    <label htmlFor="Dialysis" className="form-label p-2">
                      Dialysis
                    </label>
                  </div>

                  <div className="p-3">
                    <span>
                      <b>Allergy :</b>
                    </span>
                    <input
                      type="checkbox"
                      id="Drug_Allergy"
                      name="Drug_Allergy"
                      //value="Drug_Allergy"
                      //onChange={getFormValue}
                      value={Drug_Allergy}
                      onChange={(e) => {
                        setDrug_Allergy(e.target.checked ? "yes" : "no");
                      }}
                    />
                    <label htmlFor="Drug_Allergy" className="form-label p-2">
                      Drug Allergy
                    </label>

                    <input
                      type="checkbox"
                      id="Food_Allergy"
                      name="Food_Allergy"
                      //value="Food_Allergy"
                      //onChange={getFormValue}
                      value={Food_Allergy}
                      onChange={(e) => {
                        setFood_Allergy(e.target.checked ? "yes" : "no");
                      }}
                    />
                    <label htmlFor="Food_Allergy" className="form-label p-2">
                      Food Allergy
                    </label>

                    <input
                      type="checkbox"
                      id="Cancer"
                      name="Cancer"
                      //value="Cancer"
                      //onChange={getFormValue}
                      value={Cancer}
                      onChange={(e) => {
                        setCancer(e.target.checked ? "yes" : "no");
                      }}
                    />
                    <label htmlFor="Cancer" className="form-label p-2">
                      Cancer
                    </label>
                  </div>
                </div>
              ) : (
                ""
              )}

              {numpage === 3 ? (
                <div>
                  <p>
                    <h2 className="text-main">Medications currently taking</h2>
                  </p>
                  <hr />
                  <div className="pb-4">
                    <span>
                      <b>
                        Are taking any medication required before dental
                        treatment ?
                      </b>
                    </span>
                    <input
                      type="text"
                      className="form-control mt-2"
                      name="Medicines_currently_used"
                      onChange={getFormValue}
                    />
                  </div>

                  <div className="pb-4">
                    <span>
                      <b>Do you smoke or use tobacco in any form ?</b>{" "}
                    </span>
                    <input
                      type="radio"
                      id="smoke1"
                      name="smoke"
                      value="yes"
                      onChange={getFormValue}
                    />
                    <label htmlFor="smoke1" className="form-label p-2">
                      Yes
                    </label>
                    <span></span>
                    <input
                      type="radio"
                      id="smoke"
                      name="smoke"
                      value="no"
                      onChange={getFormValue}
                    />
                    <label htmlFor="smoke" className="form-label p-2">
                      No
                    </label>
                    <br />
                  </div>

                  <div className="pb-4">
                    <span>
                      <b>what kind?</b>
                    </span>
                    <input
                      type="text"
                      className="form-control my-2"
                      name="cigarette_kind"
                      onChange={getFormValue}
                    />
                    <span>
                      <b>How frequently</b>
                    </span>
                    <input
                      type="text"
                      className="form-control my-2"
                      name="cigarette_frequently"
                      onChange={getFormValue}
                    />
                  </div>
                </div>
              ) : (
                ""
              )}

              {numpage === 4 ? (
                <div>
                  <h2 className="text-main">Dental History</h2>
                  <hr />
                  <div className="py-3">
                    <span>
                      <b>
                        Have you had any serious problem(s) with any previous
                        dental treatment ?
                      </b>
                    </span>
                    <input
                      type="radio"
                      id="dental_treatment_problem1"
                      name="dental_treatment_problem"
                      value="yes"
                      onChange={getFormValue}
                    />
                    <label
                      htmlFor="dental_treatment_problem1"
                      className="form-label p-2"
                    >
                      Yes
                    </label>

                    <input
                      type="radio"
                      id="dental_treatment_problem"
                      name="dental_treatment_problem"
                      value="no"
                      onChange={getFormValue}
                    />
                    <label
                      htmlFor="dental_treatment_problem"
                      className="form-label p-2"
                    >
                      No
                    </label>
                    <br />
                  </div>

                  <div className="py-3">
                    <span>
                      <b>
                        Have you ever had an injury to your face, jaw, or teeth{" "}
                      </b>
                    </span>
                    <input
                      type="radio"
                      id="face_jaw_teeth_injury1"
                      name="face_jaw_teeth_injury"
                      value="yes"
                      onChange={getFormValue}
                    />
                    <label
                      htmlFor="face_jaw_teeth_injury1"
                      className="form-label p-2"
                    >
                      Yes
                    </label>
                    <span></span>
                    <input
                      type="radio"
                      id="face_jaw_teeth_injury"
                      name="face_jaw_teeth_injury"
                      value="no"
                      onChange={getFormValue}
                    />
                    <label
                      htmlFor="face_jaw_teeth_injury"
                      className="form-label p-2"
                    >
                      No
                    </label>
                    <br />
                  </div>

                  <div className="py-3">
                    <span>
                      <b>Do you ever feel like you have a dry mouth ? </b>
                    </span>
                    <input
                      type="radio"
                      id="dry_mouth1"
                      name="dry_mouth"
                      value="yes"
                      onChange={getFormValue}
                    />
                    <label htmlFor="dry_mouth1" className="form-label p-2">
                      Yes
                    </label>
                    <span></span>
                    <input
                      type="radio"
                      id="dry_mouth"
                      name="dry_mouth"
                      value="no"
                      onChange={getFormValue}
                    />
                    <label htmlFor="dry_mouth" className="form-label p-2">
                      No
                    </label>
                    <br />
                  </div>

                  <div className="py-3">
                    <span>
                      <b>
                        Have you ever had an unusual reaction to local
                        anesthetic?
                      </b>
                    </span>
                    <input
                      type="radio"
                      id="local_anesthetic_reaction1"
                      name="local_anesthetic_reaction"
                      value="yes"
                      onChange={getFormValue}
                    />
                    <label
                      htmlFor="local_anesthetic_reaction1"
                      className="form-label p-2"
                    >
                      Yes
                    </label>
                    <span></span>
                    <input
                      type="radio"
                      id="local_anesthetic_reaction"
                      name="local_anesthetic_reaction"
                      value="no"
                      onChange={getFormValue}
                    />
                    <label
                      htmlFor="local_anesthetic_reaction"
                      className="form-label p-2"
                    >
                      No
                    </label>
                    <br />
                  </div>

                  <div className="py-3">
                    <span>
                      <b>Do you clench your teeth ? </b>
                    </span>
                    <input
                      type="radio"
                      id="clench_on_teeth1"
                      name="clench_on_teeth"
                      value="yes"
                      className="mx-2"
                      onChange={getFormValue}
                    />
                    <label htmlFor="clench_on_teeth1" className="form-label">
                      Yes
                    </label>
                    <span> </span>
                    <input
                      type="radio"
                      id="clench_on_teeth"
                      name="clench_on_teeth"
                      value="no"
                      onChange={getFormValue}
                    />
                    <label htmlFor="clench_on_teeth" className="form-label p-2">
                      No
                    </label>
                    <br />
                  </div>
                </div>
              ) : (
                ""
              )}

              {numpage === 5 ? (
                <div>
                  <div>
                    <h2 className="text-main">
                      Screen for Child Anxiety Related Disorders (SCARED)
                    </h2>
                    <hr />
                    <div>
                      <input
                        type="checkbox"
                        id="hard_to_breathe"
                        name="hard_to_breathe"
                        //value="hard_to_breathe"
                        //onChange={getFormValue}
                        value={hard_to_breathe}
                        onChange={(e) => {
                          sethard_to_breathe(e.target.checked ? "yes" : "no");
                        }}
                      />
                      <label
                        htmlFor="hard_to_breathe"
                        className="form-label p-2"
                      >
                        When I feel frightened, it is hard to breathe
                      </label>
                      <br></br>
                      <input
                        type="checkbox"
                        id="sleep_scared"
                        name="sleep_scared"
                        //value="sleep_scared"
                        //onChange={getFormValue}
                        value={sleep_scared}
                        onChange={(e) => {
                          setsleep_scared(e.target.checked ? "yes" : "no");
                        }}
                      />
                      <label htmlFor="sleep_scared" className="form-label p-2">
                        I get scared if i sleep away from home
                      </label>
                      <br></br>
                      <input
                        type="checkbox"
                        id="people_nervous"
                        name="people_nervous"
                        //value="people_nervous"
                        //onChange={getFormValue}
                        value={people_nervous}
                        onChange={(e) => {
                          setpeople_nervous(e.target.checked ? "yes" : "no");
                        }}
                      />
                      <label
                        htmlFor="people_nervous"
                        className="form-label p-2"
                      >
                        I feel nervous with people I don't know well
                      </label>
                      <br></br>
                      <input
                        type="checkbox"
                        id="nightmares"
                        name="nightmares"
                        //value="nightmares"
                        //onChange={getFormValue}
                        value={nightmares}
                        onChange={(e) => {
                          setnightmares(e.target.checked ? "yes" : "no");
                        }}
                      />
                      <label htmlFor="nightmares" className="form-label p-2">
                        I have nightmares about something bad happening to my
                        parents or to me
                      </label>
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}
              {numpage === 6 ? (
                <div>
                  <h2 className="text-main">Myofacial Habits</h2>
                  <hr />
                  <div>
                    <input
                      type="checkbox"
                      id="Thumb_succing"
                      name="Thumb_succing"
                      // value="Thumb_succing"
                      //onChange={getFormValue}
                      value={Thumb_succing}
                      onChange={(e) => {
                        setThumb_succing(e.target.checked ? "yes" : "no");
                      }}
                    />
                    <label htmlFor="Thumb_succing" className="form-label p-2">
                      Thumb succing
                    </label>
                    <br></br>
                    <input
                      type="checkbox"
                      id="Toungue_thrust"
                      name="Toungue_thrust"
                      //value="Toungue_thrust"
                      //onChange={getFormValue}
                      value={Toungue_thrust}
                      onChange={(e) => {
                        setToungue_thrust(e.target.checked ? "yes" : "no");
                      }}
                    />
                    <label htmlFor="Toungue_thrust" className="form-label p-2">
                      Toungue thrust
                    </label>
                    <br></br>
                    <input
                      type="checkbox"
                      id="Nail_biting"
                      name="Nail_biting"
                      //value="Nail_biting"
                      //onChange={getFormValue}
                      value={Nail_biting}
                      onChange={(e) => {
                        setNail_biting(e.target.checked ? "yes" : "no");
                      }}
                    />
                    <label htmlFor="Nail_biting" className="form-label p-2">
                      Nail biting
                    </label>
                    <br></br>
                    <input
                      type="checkbox"
                      id="Other_Habits"
                      name="Other_Habits"
                      //value="Other_Habits"
                      //onChange={getFormValue}
                      value={Other_Habits}
                      onChange={(e) => {
                        setOther_Habits(e.target.checked ? "yes" : "no");
                      }}
                    />
                    <label htmlFor="Other_Habits" className="form-label p-2">
                      Other
                    </label>
                  </div>
                </div>
              ) : (
                ""
              )}
              {numpage === 7 ? (
                <div>
                  <div>
                    <h2 className="py-2 text-main">Clinical Examination</h2>
                    <div>
                      <hr />
                      <span>
                        <b>TMJ : </b>
                      </span>
                      <input
                        type="checkbox"
                        id="TMJ1"
                        name="TMJ"
                        value="Normal"
                        onChange={getFormValue}
                      />
                      <label htmlFor="TMJ1" className="form-label p-2">
                        Normal
                      </label>
                      {/*  */}
                      <input
                        type="checkbox"
                        id="Deviation of mandible"
                        name="TMJ"
                        value="Deviation of mandible"
                        onChange={getFormValue}
                      />
                      <label
                        htmlFor="Deviation of mandible"
                        className="form-label p-2"
                      >
                        Deviation of mandible
                      </label>
                      {/*  */}
                      <input
                        type="checkbox"
                        id="Tenderness on palpation"
                        name="TMJ"
                        value="Tenderness on palpation"
                        onChange={getFormValue}
                      />
                      <label
                        htmlFor="Tenderness on palpation"
                        className="form-label p-2"
                      >
                        Tenderness on palpation
                      </label>

                      <input
                        type="checkbox"
                        id="Clicking sounds"
                        name="TMJ"
                        value="Clicking sounds"
                        onChange={getFormValue}
                      />
                      <label
                        htmlFor="Clicking sounds"
                        className="form-label p-2"
                      >
                        Clicking sounds
                      </label>
                    </div>

                    {/* ------------------------------- */}

                    <div>
                      <span>
                        <b>Lymph node of head and neck :</b>
                      </span>
                      <input
                        type="checkbox"
                        id="Lymph_node1"
                        name="Lymph_node"
                        value="Normal"
                        onChange={getFormValue}
                      />
                      <label htmlFor="Lymph_node1" className="form-label p-2">
                        Normal
                      </label>

                      {/* <input
                        type="checkbox"
                        id="Lymph_node"
                        name="Lymph_node"
                        value="Tender"
                        onChange={getFormValue}
                      />
                      <label htmlFor="Lymph_node" className="form-label p-2">
                        Tender
                      </label> */}

                      <input
                        type="checkbox"
                        id="Lymph_node2"
                        name="Lymph_node"
                        value="DEnlarged"
                        onChange={getFormValue}
                      />
                      <label htmlFor="Lymph_node2" className="form-label p-2">
                      DEnlarged
                      </label>
                    </div>

                    <div>
                      <span>
                        <b>Patient profile : </b>{" "}
                      </span>
                      <input
                        type="checkbox"
                        id="Patient_profile"
                        name="Patient_profile"
                        value="Straight"
                        onChange={getFormValue}
                      />
                      <label
                        htmlFor="Patient_profile"
                        className="form-label p-2"
                      >
                        Straight
                      </label>

                      <input
                        type="checkbox"
                        id="Patient_profile1"
                        name="Patient_profile"
                        value="Convex"
                        onChange={getFormValue}
                      />
                      <label
                        htmlFor="Patient_profile1"
                        className="form-label p-2"
                      >
                        Convex
                      </label>

                      <input
                        type="checkbox"
                        id="Patient_profile2"
                        name="Patient_profile"
                        value="Concave"
                        onChange={getFormValue}
                      />
                      <label
                        htmlFor="Patient_profile2"
                        className="form-label p-2"
                      >
                        Concave
                      </label>
                    </div>
                    {/* ------------------------------------------ */}
                    <div>
                      <span>
                        <b>Lip Competency : </b>{" "}
                      </span>
                      <input
                        type="checkbox"
                        id="Lip_Competency"
                        name="Lip_Competency"
                        value="Competent"
                        onChange={getFormValue}
                      />
                      <label
                        htmlFor="Lip_Competency"
                        className="form-label p-2"
                      >
                        Competent
                      </label>

                      <input
                        type="checkbox"
                        id="Lip_Competency1"
                        name="Lip_Competency"
                        value="incompetent"
                        onChange={getFormValue}
                      />
                      <label
                        htmlFor="Lip_Competency1"
                        className="form-label p-2"
                      >
                        incompetent
                      </label>

                      <input
                        type="checkbox"
                        id="Lip_Competency2"
                        name="Lip_Competency"
                        value="potentially competent"
                        onChange={getFormValue}
                      />
                      <label
                        htmlFor="Lip_Competency2"
                        className="form-label p-2"
                      >
                        potentially competent
                      </label>
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}
              {numpage === 8 ? (
                <div>
                  <div>
                    <h2 className="py-2 text-main">Intraoral Examination</h2>
                    <div>
                      <hr />
                      <span>
                        <b>Incisol classification :</b>{" "}
                      </span>
                      <input
                        type="checkbox"
                        id="Incisol_classification"
                        name="Incisol_classification"
                        value="Class I"
                        onChange={getFormValue}
                      />
                      <label
                        htmlFor="Incisol_classification"
                        className="form-label p-2"
                      >
                        Class I
                      </label>

                      <input
                        type="checkbox"
                        id="Incisol_classification1"
                        name="Incisol_classification"
                        value="Class II Div 1"
                        onChange={getFormValue}
                      />
                      <label
                        htmlFor="Incisol_classification1"
                        className="form-label p-2"
                      >
                        Class II Div 1
                      </label>

                      <input
                        type="checkbox"
                        id="Incisol_classification2"
                        name="Incisol_classification"
                        value="Class II Div 2"
                        onChange={getFormValue}
                      />
                      <label
                        htmlFor="Incisol_classification2"
                        className="form-label p-2"
                      >
                        Class II Div 2
                      </label>

                      <input
                        type="checkbox"
                        id="Incisol_classification3"
                        name="Incisol_classification"
                        value="Class III"
                        onChange={getFormValue}
                      />
                      <label
                        htmlFor="Incisol_classification3"
                        className="form-label p-2"
                      >
                        Class III
                      </label>
                    </div>
                    {/* -------------------------------- */}
                    <div>
                      <span>
                        <b>Overjet : </b>
                      </span>
                      <input
                        type="checkbox"
                        id="Overjet"
                        name="Overjet"
                        value="Normal"
                        onChange={getFormValue}
                      />
                      <label htmlFor="Overjet" className="form-label p-2">
                        Normal
                      </label>

                      <input
                        type="checkbox"
                        id="Overjet1"
                        name="Overjet"
                        value="Increased"
                        onChange={getFormValue}
                      />
                      <label htmlFor="Overjet1" className="form-label p-2">
                        Increased
                      </label>

                      <input
                        type="checkbox"
                        id="Overjet2"
                        name="Overjet"
                        value="Decreased"
                        onChange={getFormValue}
                      />
                      <label htmlFor="Overjet2" className="form-label p-2">
                        Decreased
                      </label>
                    </div>
                    {/* ---------------------------------------- */}
                    <div>
                      <span>
                        <b>Overbite : </b>
                      </span>
                      <input
                        type="checkbox"
                        id="Overbite"
                        name="Overbite"
                        value="Normal"
                        onChange={getFormValue}
                      />
                      <label htmlFor="Overbite" className="form-label p-2">
                        Normal
                      </label>

                      <input
                        type="checkbox"
                        id="Overbite1"
                        name="Overbite"
                        value="Increased"
                        onChange={getFormValue}
                      />
                      <label htmlFor="Overbite1" className="form-label p-2">
                        Increased
                      </label>

                      <input
                        type="checkbox"
                        id="Overbite2"
                        name="Overbite"
                        value="Decreased"
                        onChange={getFormValue}
                      />
                      <label htmlFor="Overbite2" className="form-label p-2">
                        Decreased
                      </label>
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}
              {numpage === 9 ? (
                <div>
                  <div>
                    <h2 className="py-2 text-main">Soft tissue</h2>
                    <div>
                      <hr />
                      <span>
                        <b>Hard Palate</b>
                      </span>
                      <input
                        type="checkbox"
                        id="Hard_Palate"
                        name="Hard_Palate"
                        value="Normal"
                        onChange={getFormValue}
                      />
                      <label htmlFor="Hard_Palate" className="form-label p-2">
                        Normal
                      </label>

                      <input
                        type="checkbox"
                        id="Hard_Palate1"
                        name="Hard_Palate"
                        value="tori"
                        onChange={getFormValue}
                      />
                      <label htmlFor="Hard_Palate1" className="form-label p-2">
                        tori
                      </label>

                      <input
                        type="checkbox"
                        id="Hard_Palate2"
                        name="Hard_Palate"
                        value="stomatitis"
                        onChange={getFormValue}
                      />
                      <label htmlFor="Hard_Palate2" className="form-label p-2">
                        stomatitis
                      </label>

                      <input
                        type="checkbox"
                        id="Hard_Palate4"
                        name="Hard_Palate"
                        value="UIcers"
                        onChange={getFormValue}
                      />
                      <label htmlFor="Hard_Palate4" className="form-label p-2">
                        UIcers
                      </label>

                      <input
                        type="checkbox"
                        id="Hard_Palate3"
                        name="Hard_Palate"
                        value="red lesions"
                        onChange={getFormValue}
                      />
                      <label htmlFor="Hard_Palate3" className="form-label p-2">
                        red lesions
                      </label>
                    </div>
                    {/* ------------------------------------ */}
                    <div>
                      <span>
                        <b>Buccal mucosa</b>
                      </span>
                      <input
                        type="checkbox"
                        id="mucosa"
                        name="mucosa"
                        value="Normal"
                        onChange={getFormValue}
                      />
                      <label htmlFor="mucosa" className="form-label p-2">
                        Normal
                      </label>

                      <input
                        type="checkbox"
                        id="mucosa1"
                        name="mucosa"
                        value="pigmentation"
                        onChange={getFormValue}
                      />
                      <label htmlFor="mucosa1" className="form-label p-2">
                        pigmentation
                      </label>

                      <input
                        type="checkbox"
                        id="mucosa2"
                        name="mucosa"
                        value="ulceration"
                        onChange={getFormValue}
                      />
                      <label htmlFor="mucosa2" className="form-label p-2">
                        ulceration
                      </label>

                      <input
                        type="checkbox"
                        id="mucosa3"
                        name="mucosa"
                        value="linea alba"
                        onChange={getFormValue}
                      />
                      <label htmlFor="mucosa3" className="form-label p-2">
                        linea alba
                      </label>
                    </div>

                    <div>
                      <span>
                        <b>Floor of mouth</b>
                      </span>
                      <input
                        type="checkbox"
                        id="Floor_of_mouth"
                        name="Floor_of_mouth"
                        value="Normal"
                        onChange={getFormValue}
                      />
                      <label
                        htmlFor="Floor_of_mouth"
                        className="form-label p-2"
                      >
                        Normal
                      </label>

                      <input
                        type="checkbox"
                        id="Floor_of_mouth1"
                        name="Floor_of_mouth"
                        value="High frenum"
                        onChange={getFormValue}
                      />
                      <label
                        htmlFor="Floor_of_mouth1"
                        className="form-label p-2"
                      >
                        High frenum
                      </label>

                      <input
                        type="checkbox"
                        id="Floor_of_mouth2"
                        name="Floor_of_mouth"
                        value="Wharton_duct_stenosis"
                        onChange={getFormValue}
                      />
                      <label
                        htmlFor="Floor_of_mouth2"
                        className="form-label p-2"
                      >
                        Wharton's duct stenosis
                      </label>
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}
              {numpage === 10 ? (
                <div>
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Category</th>
                        <th>0 = healthy</th>
                        <th>1 = changes</th>
                        <th>2 = unhealthy</th>
                        <th>Score</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th>Lips</th>
                        <td>Smooth,pink,moist</td>
                        <td>Dry, chapped, or red at corners</td>
                        <td>
                          Swelling, or iump, white/red/uicerated patch:
                          bieeding/ uicerated at corners
                        </td>
                        <td>
                          <input
                            type="number"
                            className="form-control"
                            name="Lips"
                            onChange={getFormValue}
                          />
                        </td>
                      </tr>
                      <tr>
                        <th>Tongue</th>
                        <td>Normal, moist, pink</td>
                        <td>Patchy, fissured, red,coated</td>
                        <td>
                          Patch that is red and/or white, ulcerated, swollen
                        </td>
                        <td>
                          <input
                            type="number"
                            className="form-control"
                            name="Tongue"
                            onChange={getFormValue}
                          />
                        </td>
                      </tr>
                      <tr>
                        <th>Gums and Tissues</th>
                        <td>Pink, moist, Smooth, no bleeding</td>
                        <td>
                          Dry, shiny, rough, red, swollen around 1 to 6 teeth,
                          one ulcer or sore spot under denture
                        </td>
                        <td>
                          Swollen, bleeding around 7 teeth or more, loose teeh,
                          ulcers and/or white patches, generalized redness
                          and/or white patches,generalized redness and/or
                          tenderness
                        </td>
                        <td>
                          <input
                            type="number"
                            className="form-control"
                            name="Gums_and_Tissues"
                            onChange={getFormValue}
                          />
                        </td>
                      </tr>
                      <tr>
                        <th>Saliva</th>
                        <td>Moist tissues, watery and free flowing saliva</td>
                        <td>
                          Dry, sticky tissues, little saliva present, resident
                          thinks they have dry mouth
                        </td>
                        <td>
                          Tissues parched and red, very little or no saliva
                          present: saliva is thick, ropey, resident complains of
                          dry mouth
                        </td>
                        <td>
                          <input
                            type="number"
                            className="form-control"
                            name="Saliva"
                            onChange={getFormValue}
                          />
                        </td>
                      </tr>
                      <tr>
                        <th>
                          Natural Teeth <br />
                        </th>
                        <td>No decayed or broken teeth/ roots</td>
                        <td>1 to 3 decayed or broken teeth/roots</td>
                        <td>
                          4 or more decayed or broken teeth/ roots, or very worn
                          down teeth, or less than 4 teeth with no denture
                        </td>
                        <td>
                          <input
                            type="number"
                            className="form-control"
                            name="Natural_Teeth"
                            onChange={getFormValue}
                          />
                        </td>
                      </tr>
                      <tr>
                        <th>
                          Denture(S)
                          <br />
                        </th>
                        <td>
                          No broken areas/teeth, dentures worn regularly, name
                          is on
                        </td>
                        <td>
                          1 broken area/tooth, or dentures only worn for 1-2h
                          daily, or no name on denture(s)
                        </td>
                        <td>
                          More than 1 broken area/tooth, denture missing or not
                          worn due to poor fit, or worn only with denture
                          adhesive
                        </td>
                        <td>
                          <input
                            type="number"
                            className="form-control"
                            name="Dentures"
                            onChange={getFormValue}
                          />
                        </td>
                      </tr>
                      <tr>
                        <th>Oral Cleanliness</th>
                        <td>
                          Clean and no food particies or tratar on teeth or
                          dentures
                        </td>
                        <td>
                          Food particies/ tartar/ debris in 1 or 2 areas of the
                          mouth or on small area of dentures: occasional bad
                          breath
                        </td>
                        <td>
                          Food particies, tratar, debris in most area of the
                          mouth or on most areas of denture(s), or severe
                          halitosis(bad breath)
                        </td>
                        <td>
                          <input
                            type="number"
                            className="form-control"
                            name="Oral_Cleanliness"
                            onChange={getFormValue}
                          />
                        </td>
                      </tr>
                      <tr>
                        <th>Dental Pain</th>
                        <td>
                          No behavioural, verbal or physical sians of pain
                        </td>
                        <td>
                          Verbal and/or behavioural signs of pain such as
                          pulling of face, chewian lips, not
                        </td>
                        <td>
                          Physical signs such as swelling of cheek or gum,
                          broken teeth, ulcers,'aum boil', as well as verbal and
                          or
                        </td>
                        <td>
                          <input
                            type="number"
                            className="form-control"
                            name="Dental_Pain"
                            onChange={getFormValue}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              ) : (
                ""
              )}
            </Card>
          </div>
        </div>
      </div>
      <div className="text-end">
        <button
          className="btn btn-outline-info"
          onClick={() => goBack(numpage)}
        >
          back
        </button>
        {numpage != 10 ? (
          <button
            className="btn btn-outline-info ms-2"
            onClick={() => goNext(numpage)}
          >
            next
          </button>
        ) : (
          <button
            className="btn btn-outline-info"
            onClick={() => submitFormData()}
          >
            save
          </button>
        )}
      </div>
    </div>
  );
};

export default Assistant;
