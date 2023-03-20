import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { Card, Table } from "react-bootstrap";

const Show_Medical_Record = () => {
  const [treatments, setTreatments] = useState([]);
  const [disease, setDisease] = useState({
    Anemia: "",
    Angina: "",
    Asthma: "",
    Blood_Transfusion: "",
    Cancer: "",
    Chief_Complaint: "",
    Chronic_Obstructive_Pulmonary_Disease: "",
    Congential_Heart_Disease: "",
    Dental_Pain: "",
    Dentures: "",
    Dialysis: "",
    Drug_Allergy: "",
    Epilepsy: "",
    Floor_of_mouth: "",
    Food_Allergy: "",
    Gastro_ocsophagcal_reflux: "",
    Gums_and_Tissues: "",
    Hard_Palate: "",
    Heart_Attack: "",
    Heart_Failur: "",
    Hemophilia: "",
    Hepatitits: "",
    Incisol_classification: "",
    Kidney_Failur: "",
    Lcukaemia: "",
    Lip_Competency: "",
    Lips: "",
    Liver_disease: "",
    Lymph_node: "",
    Medicines_currently_used: "",
    Nail_biting: "",
    Natural_Teeth: "",
    Oral_Cleanliness: "",
    Other_Blood_Disease: "",
    Other_Habits: "",
    Other_Heart_Disease: "",
    Overbite: "",
    Overjet: "",
    Pacemaker: "",
    Parkinsons_disease: "",
    Patient_profile: "",
    Saliva: "",
    TMJ: "",
    Thumb_succing: "",
    Tongue: "",
    Toungue_thrust: "",
    cigarette_frequently: "",
    cigarette_kind: "",
    clench_on_teeth: "",
    dental_treatment_problem: "",
    created_at: "",
    dry_mouth: "",
    face_jaw_teeth_injury: "",
    hard_to_breathe: "",
    health_changes: "",
    id: "",
    image: "",
    local_anesthetic_reaction: "",
    mucosa: "",
    nightmares: "",
    patient_id: "",
    people_nervous: "",
    physician_care: "",
    pregnant: "",
    reservation_id: "",
    serious_illnesses_or_operations: "",
    sleep_scared: "",
    smoke: "",
    updated_at: "",
  });
  const [numpage, setNumPage] = useState(1);
  let x = 0;

  const showSelectedFile = async () => {
    let access_token = localStorage.getItem("token");
    let disease_id = localStorage.getItem("disease_id");
    const type = localStorage.getItem("type");

    if (type === "patients") {
      const data = await axios.post(
        "http://127.0.0.1:8000/api/patient/get_selected_file",
        {
          access_token,
          disease_id,
        }
      );
      setTreatments(data.data.treatments);
      setDisease(data.data.disease);
      console.log(data.data.disease);
    }

    if (type === "assistants") {
      const data = await axios.post(
        "http://127.0.0.1:8000/api/assistant/get_selected_file",
        {
          access_token,
          disease_id,
        }
      );
      setTreatments(data.data.treatments);
      setDisease(data.data.disease);
      console.log(data.data.disease);
    }

    if (type === "students") {
      const data = await axios.post(
        "http://127.0.0.1:8000/api/student/get_selected_file",
        {
          access_token,
          disease_id,
        }
      );
      setTreatments(data.data.treatments);
      setDisease(data.data.disease);
      console.log(data.data.disease);
      console.log(data.data.treatments)
    }

    if (type === "doctors") {
      const data = await axios.post(
        "http://127.0.0.1:8000/api/doctor/get_selected_file",
        {
          access_token,
          disease_id,
        }
      );
      setTreatments(data.data.treatments);
      setDisease(data.data.disease);
      console.log(data.data.disease);
    }

  };

  console.log(disease);

  useEffect(() => {
    showSelectedFile();
  }, []);

  const goNext = (numpage) => {
    if (numpage === 10) {
      setNumPage(1);
    } else {
      setNumPage(numpage + 1);
    }
    console.log(numpage);
  };

  const goBack = (numpage) => {
    numpage -= 1;
    if (numpage === 0) {
      setNumPage(10);
    } else {
      setNumPage(numpage);
    }
    console.log(numpage);
  };

  const goImg = () => {
    setNumPage(10);
  };
  const StudentsInformation = () => {
    setNumPage(1);
  };
  const ChiefComplaint = () => {
    setNumPage(2);
  };
  const Disease = () => {
    setNumPage(3);
  };
  const SCARED = () => {
    setNumPage(6);
  };
  const DentalHistory = () => {
    setNumPage(5);
  };

  const MyofacialHabits = () => {
    setNumPage(7);
  };
  const OralHealth = () => {
    setNumPage(9);
  };
  const IntraoralExamination = () => {
    setNumPage(8);
  };
  return (
    <div className="p-5">
      {numpage === 1 ? (
        <div>
          <button className="btn btn-outline-info" onClick={() => StudentsInformation()}>
          Students Information
          </button>
          <button className="btn btn-outline-info" onClick={() => ChiefComplaint()}>
          Chief Complaint & Medical History
          </button>
          <button className="btn btn-outline-info" onClick={() => Disease()}>
          Disease
          </button>
          <button className="btn btn-outline-info" onClick={() => DentalHistory()}>
          Dental History
          </button>
          <button className="btn btn-outline-info" onClick={() => SCARED()}>
          SCARED
          </button>
          <button className="btn btn-outline-info" onClick={() => MyofacialHabits()}>
          Myofacial Habits
          </button>
          <button className="btn btn-outline-info" onClick={() =>  IntraoralExamination()}>
          Intraoral Examination & Soft tissue
          </button>
          <button className="btn btn-outline-info" onClick={() =>  OralHealth()}>
          Oral Health
          </button>
          <button className="btn btn-outline-info" onClick={() => goImg()}>
          X_Ray img
          </button>
          <div className="my-reservation-container w-100 my-res">
            <div className="d-flex flex-row overflow-auto">
              <div className="my-reservation-container w-100">
                <Card className="w-100">
                  <p>
                    <h2 className="text-main">Students Information</h2>
                  </p>
                  <Table hover size="sl" className="text-center my-3">
                    <thead key={1}>
                      <tr>
                        <th>Name Dental</th>
                        <th>Day</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Phone Dental</th>
                        <th>Hall</th>
                        <th>Tooth</th>
                        <th>Tooth Number</th>
                        <th>Description</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {treatments.map((treatment, index) => (
                        <Fragment key={index}>
                          {console.log(treatments)}
                          <tr>
                            <td>{treatment.name}</td>
                            <td>{treatment.day}</td>
                            <td>
                              {treatment.start_date}-{treatment.end_date}
                            </td>
                            <td>
                              {treatment.start_time}-{treatment.end_time}
                            </td>
                            <td>{treatment.phone}</td>
                            <td>{treatment.hall}</td>
                            <td>{treatment.tooth}</td>
                            <td>{treatment.tooth_id}
                            </td>
                            <td>{treatment.description}</td>
                            <td>{treatment.status}</td>
                          </tr>
                        </Fragment>
                      ))}
                    </tbody>
                  </Table>
                </Card>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      {numpage === 2 ? (
        <div>
              <button className="btn btn-outline-info" onClick={() => StudentsInformation()}>
          Students Information
          </button>
          <button className="btn btn-outline-info" onClick={() => ChiefComplaint()}>
          Chief Complaint & Medical History
          </button>
          <button className="btn btn-outline-info" onClick={() => Disease()}>
          Disease
          </button>
          <button className="btn btn-outline-info" onClick={() => DentalHistory()}>
          Dental History
          </button>
          <button className="btn btn-outline-info" onClick={() => SCARED()}>
          SCARED
          </button>
          <button className="btn btn-outline-info" onClick={() => MyofacialHabits()}>
          Myofacial Habits
          </button>
          <button className="btn btn-outline-info" onClick={() =>  IntraoralExamination()}>
          Intraoral Examination & Soft tissue
          </button>
          <button className="btn btn-outline-info" onClick={() =>  OralHealth()}>
          Oral Health
          </button>
          <button className="btn btn-outline-info" onClick={() => goImg()}>
          X_Ray img
          </button>
          <div className="my-reservation-container w-100 my-res">
            <div className="d-flex flex-row">
              <div className="my-reservation-container w-100">
                <Card className="w-100">
                  <Card.Body>
                    <p>
                      <h2 className="text-main">Chief Complaint</h2>
                    </p>
                    <p>{disease.Chief_Complaint}</p>
                  </Card.Body>
                  <hr />
                  <Card.Body>
                    <p>
                    <p>
                      <h2 className="text-main">Medical History</h2>
                    </p>
                      <b>
                        Have there been any changes in your health in the past
                        year ?
                      </b>
                      <span>{disease.health_changes}</span>
                    </p>
                  </Card.Body>
                  <Card.Body>
                    <p>
                      <b>Are you under the care of a physician ?</b>
                      <span>{disease.physician_care}</span>
                    </p>
                  </Card.Body>

                  <Card.Body>
                    <p>
                      <b>Have you had any serious illnesses or operations ?</b>
                      <span>{disease.serious_illnesses_or_operations}</span>
                    </p>
                  </Card.Body>

                  <Card.Body>
                    <p>
                      <b>Females: Are you pregnant ?</b>
                      <span>{disease.pregnant}</span>
                    </p>
                  </Card.Body>
                </Card>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}

      {numpage === 3 ? (
        <div>
              <button className="btn btn-outline-info" onClick={() => StudentsInformation()}>
          Students Information
          </button>
          <button className="btn btn-outline-info" onClick={() => ChiefComplaint()}>
          Chief Complaint & Medical History
          </button>
          <button className="btn btn-outline-info" onClick={() => Disease()}>
          Disease
          </button>
          <button className="btn btn-outline-info" onClick={() => DentalHistory()}>
          Dental History
          </button>
          <button className="btn btn-outline-info" onClick={() => SCARED()}>
          SCARED
          </button>
          <button className="btn btn-outline-info" onClick={() => MyofacialHabits()}>
          Myofacial Habits
          </button>
          <button className="btn btn-outline-info" onClick={() =>  IntraoralExamination()}>
          Intraoral Examination & Soft tissue
          </button>
          <button className="btn btn-outline-info" onClick={() =>  OralHealth()}>
          Oral Health
          </button>
          <button className="btn btn-outline-info" onClick={() => goImg()}>
          X_Ray img
          </button>

          <div className="my-reservation-container w-100 my-res">
            <div className="d-flex flex-row">
              <div className="my-reservation-container w-100">
                <Card className="w-100">
                  <Card.Body>
                  <p>
                      <h2 className="text-main">Disease</h2>
                    </p>
                    <hr/>
                    <p>
                      <b>Heart Disease : </b>
                      <span>Heart_Failur : {disease.Heart_Failur}</span> /
                      <span>Heart Attack : {disease.Heart_Attack}</span> /
                      <span>Angina : {disease.Angina}</span>
                    </p>
                    /<span>Pacemaker : {disease.Pacemaker}</span> /
                    <span>
                      Congenital Heart Disease :{" "}
                      {disease.Congential_Heart_Disease}
                    </span>
                    / <span>Other: {disease.Other_Heart_Disease}</span>
                  </Card.Body>

                  <Card.Body>
                    <p>
                      <b>Blood Disease : </b>
                      <span>Anemia : {disease.Anemia}</span> /
                      <span>Hemophilia : {disease.Hemophilia}</span>/
                      <span>Leukaemia : {disease.Leukaemia}</span>/
                      <span>
                        Blood_Transfusion : {disease.Blood_Transfusion}
                      </span>
                      / <span>Other : {disease.Other_Blood_Disease}</span>
                    </p>
                  </Card.Body>

                  <Card.Body>
                    <p>
                      <b>Respiratory Disease : </b>
                      <span>Asthma : {disease.Asthma}</span> /
                      <span>
                        Chronic Obstructive Pulmonary Disease :
                        {disease.Chronic_Obstructive_Pulmonary_Disease}
                      </span>
                    </p>
                  </Card.Body>

                  <Card.Body>
                    <p>
                      <b>Gastrointestinal Disease : </b>
                      <span>
                        Gastro-oesophageal reflux :
                        {disease.Gastro_ocsophagcal_reflux}
                      </span>
                      / <span>Hepatitits : {disease.Hepatitits}</span> /
                      <span>Liver_disease : {disease.Liver_disease}</span>
                    </p>
                  </Card.Body>

                  <Card.Body>
                    <p>
                      <b>Neurological System : </b>
                      <span>Epilepsy : {disease.Epilepsy}</span> /
                      <span>
                        Parkinson's Disease : {disease.Parkinsons_disease}
                      </span>
                    </p>
                  </Card.Body>

                  <Card.Body>
                    <p>
                      <b>Renal System : </b>
                      <span>Kidney_Failur : {disease.Kidney_Failur}</span> /
                      <span>Dialysis : {disease.Dialysis}</span>
                    </p>
                  </Card.Body>

                  <Card.Body>
                    <p>
                      <b>Allergy :</b>
                      <span>Drug_Allergy : {disease.Drug_Allergy}</span> /
                      <span>Food_Allergy : {disease.Food_Allergy}</span> /
                      <span>Cancer : {disease.Cancer}</span>
                    </p>
                  </Card.Body>
                </Card>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}

      {numpage === 4 ? (
        <div>
       <button className="btn btn-outline-info" onClick={() => StudentsInformation()}>
          Students Information
          </button>
          <button className="btn btn-outline-info" onClick={() => ChiefComplaint()}>
          Chief Complaint & Medical History
          </button>
          <button className="btn btn-outline-info" onClick={() => Disease()}>
          Disease
          </button>
          <button className="btn btn-outline-info" onClick={() => DentalHistory()}>
          Dental History
          </button>
          <button className="btn btn-outline-info" onClick={() => SCARED()}>
          SCARED
          </button>
          <button className="btn btn-outline-info" onClick={() => MyofacialHabits()}>
          Myofacial Habits
          </button>
          <button className="btn btn-outline-info" onClick={() =>  IntraoralExamination()}>
          Intraoral Examination & Soft tissue
          </button>
          <button className="btn btn-outline-info" onClick={() =>  OralHealth()}>
          Oral Health
          </button>
          <button className="btn btn-outline-info" onClick={() => goImg()}>
          X_Ray img
          </button>

          <div className="my-reservation-container w-100 my-res">
            <div className="d-flex flex-row ">
              <div className="my-reservation-container w-100">
                <Card className="w-100">
                  <Card.Body>
                    <p>
                      <b>Medications currently taking: </b>
                      <span>
                        Drug_Allergy : {disease.Medicines_currently_used}
                      </span>
                    </p>
                  </Card.Body>

                  <Card.Body>
                    <p>
                      <b>
                        Are taking any medication required before dental
                        treatment ?
                      </b>
                      no
                    </p>
                  </Card.Body>

                  <Card.Body>
                    <p>
                      <b>Do you smoke or use tobacco in any form ? </b>
                      <span> {disease.smoke}</span>
                    </p>
                  </Card.Body>

                  <Card.Body>
                    <p>
                      <b>what kind? </b> <span> {disease.cigarette_kind}</span>
                    </p>
                  </Card.Body>

                  <Card.Body>
                    <p>
                      <b>How frequently </b>
                      <span> {disease.cigarette_frequently}</span>
                    </p>
                  </Card.Body>

                  <Card.Body>
                    <p>
                      <b>Blood Disease : </b>
                      <span>Anemia : {disease.Anemia}</span> /
                      <span>Hemophilia : {disease.Hemophilia}</span>/
                      <span>Leukaemia : {disease.Leukaemia}</span>/
                      <span>
                        Blood_Transfusion : {disease.Blood_Transfusion}
                      </span>
                      / <span>Other : {disease.Other_Blood_Disease}</span>
                    </p>
                  </Card.Body>

                  <Card.Body>
                    <p>
                      <b>Respiratory Disease : </b>
                      <span>Asthma : {disease.Asthma}</span> /
                      <span>
                        Chronic Obstructive Pulmonary Disease :
                        {disease.Chronic_Obstructive_Pulmonary_Disease}
                      </span>
                    </p>
                  </Card.Body>

                  <Card.Body>
                    <p>
                      <b>Gastrointestinal Disease : </b>
                      <span>
                        Gastro-oesophageal reflux :
                        {disease.Gastro_ocsophagcal_reflux}
                      </span>
                      / <span>Hepatitits : {disease.Hepatitits}</span> /
                      <span>Liver_disease : {disease.Liver_disease}</span>
                    </p>
                  </Card.Body>

                  <Card.Body>
                    <p>
                      <b>Neurological System : </b>
                      <span>Epilepsy : {disease.Epilepsy}</span> /
                      <span>
                        Parkinson's Disease : {disease.Parkinsons_disease}
                      </span>
                    </p>
                  </Card.Body>

                  <Card.Body>
                    <p>
                      <b>Renal System : </b>
                      <span>Kidney_Failur : {disease.Kidney_Failur}</span> /
                      <span>Dialysis : {disease.Dialysis}</span>
                    </p>
                  </Card.Body>

                  <Card.Body>
                    <p>
                      <b>Allergy :</b>
                      <span>Drug_Allergy : {disease.Drug_Allergy}</span> /
                      <span>Food_Allergy : {disease.Food_Allergy}</span> /
                      <span>Cancer : {disease.Cancer}</span>
                    </p>
                  </Card.Body>
                </Card>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}

      {numpage === 5 ? (
        <div>
           <button className="btn btn-outline-info" onClick={() => StudentsInformation()}>
          Students Information
          </button>
          <button className="btn btn-outline-info" onClick={() => ChiefComplaint()}>
          Chief Complaint & Medical History
          </button>
          <button className="btn btn-outline-info" onClick={() => Disease()}>
          Disease
          </button>
          <button className="btn btn-outline-info" onClick={() => DentalHistory()}>
          Dental History
          </button>
          <button className="btn btn-outline-info" onClick={() => SCARED()}>
          SCARED
          </button>
          <button className="btn btn-outline-info" onClick={() => MyofacialHabits()}>
          Myofacial Habits
          </button>
          <button className="btn btn-outline-info" onClick={() =>  IntraoralExamination()}>
          Intraoral Examination & Soft tissue
          </button>
          <button className="btn btn-outline-info" onClick={() =>  OralHealth()}>
          Oral Health
          </button>
          <button className="btn btn-outline-info" onClick={() => goImg()}>
          X_Ray img
          </button>

          <div className="my-reservation-container w-100 my-res">
            <div className="d-flex flex-row ">
              <div className="my-reservation-container w-100">
                <Card className="w-100">
                  <h2 className="p-3 text-main">Dental History</h2>
                  <Card.Body>
                    <p>
                      <b>
                        Have you had any serious problem(s) with any previous
                        dental treatment ?
                      </b>
                      <span> {disease.dental_treatment_problem}</span>
                    </p>
                  </Card.Body>

                  <Card.Body>
                    <p>
                      <b>
                        Have you ever had an injury to your face, jaw, or teeth
                        ?
                      </b>
                      <span> {disease.face_jaw_teeth_injury}</span>
                    </p>
                  </Card.Body>

                  <Card.Body>
                    <p>
                      <b>Do you ever feel like you have a dry mouth ? </b>
                      <span> {disease.dry_mouth}</span>
                    </p>
                  </Card.Body>

                  <Card.Body>
                    <p>
                      <b>
                        Have you ever had an unusual reaction to local
                        anesthetic?
                      </b>
                      <span> {disease.local_anesthetic_reaction}</span>
                    </p>
                  </Card.Body>

                  <Card.Body>
                    <p>
                      <b>Do you clench your teeth ? </b>
                      <span> {disease.clench_on_teeth}</span>
                    </p>
                  </Card.Body>
                </Card>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}

      {numpage === 6 ? (
        <div>
           <button className="btn btn-outline-info" onClick={() => StudentsInformation()}>
          Students Information
          </button>
          <button className="btn btn-outline-info" onClick={() => ChiefComplaint()}>
          Chief Complaint & Medical History
          </button>
          <button className="btn btn-outline-info" onClick={() => Disease()}>
          Disease
          </button>
          <button className="btn btn-outline-info" onClick={() => DentalHistory()}>
          Dental History
          </button>
          <button className="btn btn-outline-info" onClick={() => SCARED()}>
          SCARED
          </button>
          <button className="btn btn-outline-info" onClick={() => MyofacialHabits()}>
          Myofacial Habits
          </button>
          <button className="btn btn-outline-info" onClick={() =>  IntraoralExamination()}>
          Intraoral Examination & Soft tissue
          </button>
          <button className="btn btn-outline-info" onClick={() =>  OralHealth()}>
          Oral Health
          </button>
          <button className="btn btn-outline-info" onClick={() => goImg()}>
          X_Ray img
          </button>

          <div className="my-reservation-container w-100 my-res">
            <div className="d-flex flex-row">
              <div className="my-reservation-container w-100">
                <Card className="w-100">
                  <h2 className="p-3 text-main">
                    Screen for Child Anxiety Related Disorders (SCARED)
                  </h2>

                  <Card.Body>
                    <p>
                      <b>When I feel frightened, it is hard to breathe </b>
                      <span> {disease.hard_to_breathe}</span>
                    </p>
                  </Card.Body>

                  <Card.Body>
                    <p>
                      <b>I get scared if i sleep away from home</b>
                      <span> {disease.sleep_scared}</span>
                    </p>
                  </Card.Body>

                  <Card.Body>
                    <p>
                      <b>I feel nervous with people I don't know well</b>
                      <span> {disease.people_nervous}</span>
                    </p>
                  </Card.Body>

                  <Card.Body>
                    <p>
                      <b>
                        I have nightmares about something bad happening to my
                        parents or to me
                      </b>
                      <span> {disease.nightmares}</span>
                    </p>
                  </Card.Body>
                </Card>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}

      {numpage === 7 ? (
        <div>
             <button className="btn btn-outline-info" onClick={() => StudentsInformation()}>
          Students Information
          </button>
          <button className="btn btn-outline-info" onClick={() => ChiefComplaint()}>
          Chief Complaint & Medical History
          </button>
          <button className="btn btn-outline-info" onClick={() => Disease()}>
          Disease
          </button>
          <button className="btn btn-outline-info" onClick={() => DentalHistory()}>
          Dental History
          </button>
          <button className="btn btn-outline-info" onClick={() => SCARED()}>
          SCARED
          </button>
          <button className="btn btn-outline-info" onClick={() => MyofacialHabits()}>
          Myofacial Habits
          </button>
          <button className="btn btn-outline-info" onClick={() =>  IntraoralExamination()}>
          Intraoral Examination & Soft tissue
          </button>
          <button className="btn btn-outline-info" onClick={() =>  OralHealth()}>
          Oral Health
          </button>
          <button className="btn btn-outline-info" onClick={() => goImg()}>
          X_Ray img
          </button>

          <div className="my-reservation-container w-100 my-res">
            <div className="d-flex flex-row">
              <div className="my-reservation-container w-100">
                <Card className="w-100">
                  <h3 className="p-3 text-main">Myofacial Habits</h3>

                  <Card.Body>
                    <p>
                      <b>Thumb succing :</b>{" "}
                      <span> {disease.Thumb_succing}</span>
                    </p>
                  </Card.Body>
                  <Card.Body>
                    <p>
                      <b>Toungue thrust :</b>
                      <span> {disease.Toungue_thrust}</span>
                    </p>
                  </Card.Body>
                  <Card.Body>
                    <p>
                      <b>Nail biting :</b> <span> {disease.Nail_biting}</span>
                    </p>
                  </Card.Body>
                  <Card.Body>
                    <p>
                      <b>Other :</b> <span> {disease.Other_Habits}</span>
                    </p>
                  </Card.Body>
                  <hr />

                  <h2 className="text-main">Clinical Examination</h2>
                  <Card.Body>
                    <p>
                      <b>TMJ :</b> <span> {disease.TMJ}</span>
                    </p>
                  </Card.Body>

                  <Card.Body>
                    <p>
                      <b>Lymph node of head and neck :</b>
                      <span> {disease.Lymph_node}</span>
                    </p>
                  </Card.Body>

                  <Card.Body>
                    <p>
                      <b>Patient profile :</b>
                      <span> {disease.Patient_profile}</span>
                    </p>
                  </Card.Body>

                  <Card.Body>
                    <p>
                      <b>Lip Competency :</b>
                      <span> {disease.Lip_Competency}</span>
                    </p>
                  </Card.Body>
                </Card>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}

      {numpage === 8 ? (
        <div>
             <button className="btn btn-outline-info" onClick={() => StudentsInformation()}>
          Students Information
          </button>
          <button className="btn btn-outline-info" onClick={() => ChiefComplaint()}>
          Chief Complaint &  Medical History
          </button>
          <button className="btn btn-outline-info" onClick={() => Disease()}>
          Disease
          </button>
          <button className="btn btn-outline-info" onClick={() => DentalHistory()}>
          Dental History
          </button>
          <button className="btn btn-outline-info" onClick={() => SCARED()}>
          SCARED
          </button>
          <button className="btn btn-outline-info" onClick={() => MyofacialHabits()}>
          Myofacial Habits
          </button>
          <button className="btn btn-outline-info" onClick={() =>  IntraoralExamination()}>
          Intraoral Examination & Soft tissue
          </button>
          <button className="btn btn-outline-info" onClick={() =>  OralHealth()}>
          Oral Health
          </button>
          <button className="btn btn-outline-info" onClick={() => goImg()}>
          X_Ray img
          </button>

          <div className="my-reservation-container w-100 my-res">
            <div className="d-flex flex-row ">
              <div className="my-reservation-container w-100">
                <Card className="w-100">
                  <h3 className="p-3 text-main">Intraoral Examination</h3>
                  <Card.Body>
                    <p>
                      <b>Incisol classification :</b>
                      <span> {disease.Incisol_classification}</span>
                    </p>
                  </Card.Body>

                  <Card.Body>
                    <p>
                      <b>Overjet :</b> <span> {disease.Overjet}</span>
                    </p>
                  </Card.Body>

                  <Card.Body>
                    <p>
                      <b>Overbite :</b> <span> {disease.Overbite}</span>
                    </p>
                  </Card.Body>

                  <hr />
                  <h3 className="p-3 text-main">Soft tissue</h3>
                  <Card.Body>
                    <p>
                      <b>Hard Palate</b> <span> {disease.Hard_Palate}</span>
                    </p>
                  </Card.Body>

                  <Card.Body>
                    <p>
                      <b>Buccal mucosa</b> <span> {disease.mucosa}</span>
                    </p>
                  </Card.Body>

                  <Card.Body>
                    <p>
                      <b>Floor of mouth</b>{" "}
                      <span> {disease.Floor_of_mouth}</span>
                    </p>
                  </Card.Body>
                </Card>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}

      {numpage === 9 ? (
        <div>
              <button className="btn btn-outline-info" onClick={() => StudentsInformation()}>
          Students Information
          </button>
          <button className="btn btn-outline-info" onClick={() => ChiefComplaint()}>
          Chief Complaint & Medical History
          </button>
          <button className="btn btn-outline-info" onClick={() => Disease()}>
          Disease
          </button>
          <button className="btn btn-outline-info" onClick={() => DentalHistory()}>
          Dental History
          </button>
          <button className="btn btn-outline-info" onClick={() => SCARED()}>
          SCARED
          </button>
          <button className="btn btn-outline-info" onClick={() => MyofacialHabits()}>
          Myofacial Habits
          </button>
          <button className="btn btn-outline-info" onClick={() =>  IntraoralExamination()}>
          Intraoral Examination & Soft tissue
          </button>
          <button className="btn btn-outline-info" onClick={() =>  OralHealth()}>
          Oral Health
          </button>
          <button className="btn btn-outline-info" onClick={() => goImg()}>
          X_Ray img
          </button>

          <div className="my-reservation-container w-100 my-res">
            <div className="d-flex flex-row overflow-auto">
              <div className="my-reservation-container w-100">
                <Card className="w-100">
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
                          <span> {disease.Lips}</span>
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
                          <span> {disease.Tongue}</span>
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
                          <span> {disease.Gums_and_Tissues}</span>
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
                          <span> {disease.Saliva}</span>
                        </td>
                      </tr>
                      <tr>
                        <th>
                          Natural Teeth <br />
                          <input
                            type="checkbox"
                            value="Yes"
                            id="flexCheckDefault"
                            name="NaturalTeeth"
                            defaultChecked
                          />
                          <label
                            className="form-check-label"
                            for="flexCheckDefault"
                          >
                            Yes
                          </label>
                          <input
                            type="checkbox"
                            value="No"
                            id="flexCheckDefault"
                            name="NaturalTeeth"
                          />
                          <label
                            className="form-check-label"
                            for="flexCheckDefault"
                          >
                            No
                          </label>
                        </th>
                        <td>No decayed or broken teeth / roots</td>
                        <td>1 to 3 decayed or broken teeth/roots</td>
                        <td>
                          4 or more decayed or broken teeth/ roots, or very worn
                          down teeth, or less than 4 teeth with no denture
                        </td>
                        <td>
                          <span> {disease.Natural_Teeth}</span>
                        </td>
                      </tr>
                      <tr>
                        <th>
                          Denture(S)
                          <br />
                          <input
                            type="checkbox"
                            value="Yes"
                            id="flexCheckDefault1"
                            name="Denture"
                            checked={true}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="flexCheckDefault1"
                          >
                            Yes
                          </label>
                          <input
                            type="checkbox"
                            value="No"
                            id="flexCheckDefault2"
                            name="Denture"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="flexCheckDefault2"
                          >
                            No
                          </label>
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
                          <span> {disease.Dentures}</span>
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
                          <span> {disease.Oral_Cleanliness}</span>
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
                          <span> {disease.Dental_Pain}</span>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                  <div class="input-group mb-3">
                    <span
                      class="input-group-text"
                      id="inputGroup-sizing-default"
                    >
                      Total Score :
                    </span>
                    <div className="form-control">
                      {
                        (x =
                          x +
                          Number(disease.Dental_Pain) +
                          Number(disease.Oral_Cleanliness) +
                          Number(disease.Dentures) +
                          Number(disease.Natural_Teeth) +
                          Number(disease.Saliva) +
                          Number(disease.Gums_and_Tissues) +
                          Number(disease.Tongue) +
                          Number(disease.Lips))
                      }
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}

      {numpage === 10 ? (
        <div>
              <button className="btn btn-outline-info" onClick={() => StudentsInformation()}>
          Students Information
          </button>
          <button className="btn btn-outline-info" onClick={() => ChiefComplaint()}>
          Chief Complaint & Medical History
          </button>
          <button className="btn btn-outline-info" onClick={() => Disease()}>
          Disease
          </button>
          <button className="btn btn-outline-info" onClick={() => DentalHistory()}>
          Dental History
          </button>
          <button className="btn btn-outline-info" onClick={() => SCARED()}>
          SCARED
          </button>
          <button className="btn btn-outline-info" onClick={() => MyofacialHabits()}>
          Myofacial Habits
          </button>
          <button className="btn btn-outline-info" onClick={() =>  IntraoralExamination()}>
          Intraoral Examination & Soft tissue
          </button>
          <button className="btn btn-outline-info" onClick={() =>  OralHealth()}>
          Oral Health
          </button>
          <button className="btn btn-outline-info" onClick={() => goImg()}>
            X-Ray img
          </button>

          <div className="my-reservation-container w-100 my-res">
            <div className="d-flex flex-row">
              <div className="my-reservation-container w-100">
                <Card className="w-100">
                  <Card.Body>
                    <p>
                      <h2 className="text-main mb-3">Image : </h2>
                      <br />
                      <img
                        src={disease.image}
                        alt="img"
                        className="w-100 rounded-1"
                      />
                    </p>
                  </Card.Body>
                </Card>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      <div className="text-end">
        <button
          className="btn btn-outline-info"
          onClick={() => goBack(numpage)}
        >
          back
        </button>
        <button
          className="btn btn-outline-info ms-2"
          onClick={() => goNext(numpage)}
        >
          next
        </button>
      </div>
    </div>
  );
};

export default Show_Medical_Record;

// -------------------------------slider------------------------

// import axios from "axios";
// import React, { useEffect, useState } from "react";

// const Show_Medical_Record = () => {
//   const [treatments, setTreatments] = useState([]);
//   const [disease, setDisease] = useState();
//   const [index, setIndex] = useState(0);

//   const showSelectedFile = async () => {
//     let access_token = localStorage.getItem("token");
//     let disease_id = localStorage.getItem("disease_id");

//     const data = await axios.post("http://127.0.0.1:8000/api/patient/get_selected_file", {
//       access_token,
//       disease_id,
//     });
//     setTreatments(data.data.treatments);
//     setDisease(data.data.disease);
//   };

//   useEffect(() => {
//     showSelectedFile();
//   }, []);

//   const handleNext = () => {
//     setIndex((prevIndex) =>
//       prevIndex === treatments.length - 1 ? 0 : prevIndex + 1
//     );
//   };

//   const handlePrev = () => {
//     setIndex((prevIndex) =>
//       prevIndex === 0 ? treatments.length - 1 : prevIndex - 1
//     );
//   };

//   return (
//     <div>
//       <h2>Treatments for </h2>
//       <p>treatments</p>
//       <button className="btn btn-outline-info w-50 mt-4" onClick={handlePrev}>Back</button>
//       <button className="btn btn-outline-info w-50 mt-4" onClick={handleNext}>Next</button>
//     </div>
//   );
// };

// export default Show_Medical_Record;
