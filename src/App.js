import { BrowserRouter, Routes, Route } from "react-router-dom";
import AboutUs from "./pages/AboutUs/AboutUs";
import Admin from "./pages/Admin/Admin";
import Assistant from "./pages/Assistant/Assistant";
import DentalServices from "./pages/DentalServices/DentalServices";
import Doctor from "./pages/Doctor/Doctor";
import FirstReservation from "./pages/FirstReservation/FirstReservation";
import Home from "./pages/Home/Home";
import Layout from "./pages/Layout/Layout";
import Login from "./pages/Login/Login";
import MedicalAdvice from "./pages/MedicalAdvice/MedicalAdvice";
import NotFound from "./pages/NotFound/NotFound";
import Profile from "./pages/Profile/Profile";
import ShowAppointment from "./pages/Secretary/Secretary";
import SignUp from "./pages/SignUp/SignUp";
import Student from "./pages/Student/Student";
import UserGuide from "./pages/UserGuide/UserGuide";
import XRayPhotographer from "./pages/XRayPhotographer/XRayPhotographer";
import MyReservation from "./pages/MyReservation/MyReservation";
import MedicalRecord from "./pages/MedicalRecord/MedicalRecord";
import Evaluation from "./pages/Evaluation/Evaluation";
import Change_Forgotten_Password from "./pages/Change_Forgtten_Password/Change_Forgtten_Password";
import ChangeAllPassword from "./pages/ChangeAllPassword/ChangeAllPassword";
import ProtectedRoute from "./components/ProtectedRoutes/ProtectedRoutes";
import "./App.css";
import Calendar from "./pages/Calendar/Calendar";
import SearchAppointment from "./pages/Search-appointment/Search-appointment";
import Show_Medical_Record from "./pages/Show_Medical_Record/Show_Medical_Record";
import Add_Treatment from "./pages/Add_Treatment/Add_Treatment";
import Show_Record from "./pages/Show_Record/Show_Record";
import Courses_Plan from "./pages/Courses_Plan/Courses_Plan";
import Patient_Info from "./pages/Patient_Info/Patient_Info";
import Doctor_Section_info from "./pages/Doctor_Section_info/Doctor_Section_info";
import Show_Student_Doctor from "./pages/Show_Student_Doctor/Show_Student_Doctor";
import Student_Info from "./pages/Student_Info/Student_Info";
import Clinic_Scheduling from "./pages/Clinic_Scheduling/Clinic_Scheduling";
import Add_Evaluating_Aspects from "./pages/Add_Evaluating_Aspects/Add_Evaluating_Aspects";
import Add_Medical_Advice from "./components/Add_Medical_Advice/Add_Medical_Advice";
import UpdateAdvice from "./components/UpdateAdvice/UpdateAdvice";
import Week_appointment from "./pages/Week_appointment/Week_appointment";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout position="fixed" footer />}>
          <Route index element={<Home />}></Route>
          <Route path="/dental-services" element={<DentalServices />}></Route>
          <Route path="/medical-advice" element={<MedicalAdvice />}></Route>
          <Route path="/user-guide" element={<UserGuide />}></Route>
          <Route path="/about-us" element={<AboutUs />}></Route>
          <Route path="/*" element={<NotFound />}></Route>
        </Route>

        <Route path="/" element={<Layout submenu footer />}>
          <Route
            path="/Profile"
            element={
              <ProtectedRoute
                types={[
                  "students",
                  "doctors",
                  "radiographers",
                  "secretaries",
                  "assistants",
                  "patients",
                  "admins",
                ]}
              >
                <Profile />
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/first-reservation"
            element={
              <ProtectedRoute
                types={[
                  // "students",
                  // "doctors",
                  // "radiographers",
                  // "secretaries",
                  // "assistants",
                  "patients",
                  // "admins",
                ]}
              >
                <Calendar />
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/my-reservation"
            element={
              <ProtectedRoute
                types={[
                  // "students",
                  // "doctors",
                  // "radiographers",
                  // "secretaries",
                  // "assistants",
                  "patients",
                  // "admins",
                ]}
              >
                <MyReservation />
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/medical-record"
            element={
              <ProtectedRoute
                types={[
                  // "students",
                  // "doctors",
                  // "radiographers",
                  // "secretaries",
                  // "assistants",
                  "patients",
                  // "admins",
                ]}
              >
                <MedicalRecord />
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/Show_Medical_Record"
            element={
              <ProtectedRoute
                types={[
                  "students",
                  "doctors",
                  // "radiographers",
                  // "secretaries",
                  "assistants",
                  "patients",
                  // "admins",
                ]}
              >
                <Show_Medical_Record />
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/evaluation"
            element={
              <ProtectedRoute
                types={[
                  // "students",
                  // "doctors",
                  // "radiographers",
                  // "secretaries",
                  // "assistants",
                  "patients",
                  // "admins",
                ]}
              >
                <Evaluation />
              </ProtectedRoute>
            }
          ></Route>

          {/* ---------------------------- */}
          <Route
            path="/x-ray-photographer"
            element={
              <ProtectedRoute
                types={[
                  // "students",
                  // "doctors",
                  "radiographers",
                  // "secretaries",
                  // "assistants",
                  // "patients",
                  // "admins",
                ]}
              >
                <XRayPhotographer />
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/doctor"
            element={
              <ProtectedRoute
                types={[
                  // "students",
                  "doctors",
                  // "radiographers",
                  // "secretaries",
                  // "assistants",
                  // "patients",
                  // "admins",
                ]}
              >
                <Doctor />
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/Student_Info"
            element={
              <ProtectedRoute
                types={[
                  // "students",
                  "doctors",
                  // "radiographers",
                  // "secretaries",
                  // "assistants",
                  // "patients",
                  // "admins",
                ]}
              >
                <Student_Info />
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/Doctor_Section_info"
            element={
              <ProtectedRoute
                types={[
                  // "students",
                  "doctors",
                  // "radiographers",
                  // "secretaries",
                  // "assistants",
                  // "patients",
                  // "admins",
                ]}
              >
                <Doctor_Section_info />
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/Show_Student_Doctor"
            element={
              <ProtectedRoute
                types={[
                  // "students",
                  "doctors",
                  // "radiographers",
                  // "secretaries",
                  // "assistants",
                  // "patients",
                  // "admins",
                ]}
              >
                <Show_Student_Doctor />
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/student"
            element={
              <ProtectedRoute
                types={[
                  "students",
                  // "doctors",
                  // "radiographers",
                  // "secretaries",
                  // "assistants",
                  // "patients",
                  // "admins",
                ]}
              >
                <Student />
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/Patient_Info"
            element={
              <ProtectedRoute
                types={[
                  "students",
                  // "doctors",
                  // "radiographers",
                  // "secretaries",
                  // "assistants",
                  // "patients",
                  // "admins",
                ]}
              >
                <Patient_Info />
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/Courses_Plan"
            element={
              <ProtectedRoute
                types={[
                  "students",
                  // "doctors",
                  // "radiographers",
                  // "secretaries",
                  // "assistants",
                  // "patients",
                  // "admins",
                ]}
              >
                <Courses_Plan />
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/ShowAppointment"
            element={
              <ProtectedRoute
                types={[
                  // "students",
                  // "doctors",
                  // "radiographers",
                  "secretaries",
                  // "assistants",
                  // "patients",
                  // "admins",
                ]}
              >
                <ShowAppointment />
              </ProtectedRoute>
            }
          ></Route>
          {/* -------------------------------- */}
          <Route
            path="/SearchAppointment"
            element={
              <ProtectedRoute
                types={[
                  // "students",
                  // "doctors",
                  // "radiographers",
                  "secretaries",
                  // "assistants",
                  // "patients",
                  // "admins",
                ]}
              >
                <SearchAppointment />
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/Week_appointment"
            element={
              <ProtectedRoute
                types={[
                  // "students",
                  // "doctors",
                  // "radiographers",
                  "secretaries",
                  // "assistants",
                  // "patients",
                  // "admins",
                ]}
              >
                <Week_appointment />
              </ProtectedRoute>
            }
          ></Route>
          {/* ------------------------------------ */}
          <Route
            path="/Assistant"
            element={
              <ProtectedRoute
                types={[
                  // "students",
                  // "doctors",
                  // "radiographers",
                  // "secretaries",
                  "assistants",
                  // "patients",
                  // "admins",
                ]}
              >
                <Assistant />
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/Add_Treatment"
            element={
              <ProtectedRoute
                types={[
                  // "students",
                  // "doctors",
                  // "radiographers",
                  // "secretaries",
                  "assistants",
                  // "patients",
                  // "admins",
                ]}
              >
                <Add_Treatment />
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/Show_Record"
            element={
              <ProtectedRoute
                types={[
                  // "students",
                  // "doctors",
                  // "radiographers",
                  // "secretaries",
                  "assistants",
                  // "patients",
                  // "admins",
                ]}
              >
                <Show_Record />
              </ProtectedRoute>
            }
          ></Route>
          {/* ----------------------------- */}

          <Route
            path="/Add_Medical_Advice"
            element={
              <ProtectedRoute
                types={[
                  // "students",
                  // "doctors",
                  // "radiographers",
                  //"secretaries",
                  // "assistants",
                  // "patients",
                  "admins",
                ]}
              >
                <Add_Medical_Advice />
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/admin"
            element={
              <ProtectedRoute
                types={[
                  // "students",
                  // "doctors",
                  // "radiographers",
                  // "secretaries",
                  // "assistants",
                  // "patients",
                  "admins",
                ]}
              >
                <Admin />
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/UpdateAdvice"
            element={
              <ProtectedRoute
                types={[
                  // "students",
                  // "doctors",
                  // "radiographers",
                  // "secretaries",
                  // "assistants",
                  // "patients",
                  "admins",
                ]}
              >
                <UpdateAdvice />
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/Clinic_Scheduling"
            element={
              <ProtectedRoute
                types={[
                  // "students",
                  // "doctors",
                  // "radiographers",
                  // "secretaries",
                  // "assistants",
                  // "patients",
                  "admins",
                ]}
              >
                <Clinic_Scheduling />
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/Add_Evaluating_Aspects"
            element={
              <ProtectedRoute
                types={[
                  // "students",
                  // "doctors",
                  // "radiographers",
                  // "secretaries",
                  // "assistants",
                  // "patients",
                  "admins",
                ]}
              >
                <Add_Evaluating_Aspects />
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/change-password"
            element={
              <ProtectedRoute
                types={[
                  "students",
                  "doctors",
                  "radiographers",
                  "secretaries",
                  "assistants",
                  "patients",
                  "admins",
                ]}
              >
                <ChangeAllPassword />
              </ProtectedRoute>
            }
          ></Route>


        </Route>

        <Route element={<Layout position="fixed" />}>
          <Route path="/login" element={<Login />}></Route>

          <Route path="/signUp" element={<SignUp />}></Route>

          <Route
            path="Change_Forgotten_Password/:user_name"
            element={<Change_Forgotten_Password />}
          ></Route>
        </Route>
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
