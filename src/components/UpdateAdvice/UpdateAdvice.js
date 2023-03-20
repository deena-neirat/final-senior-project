import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { Card, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const UpdateAdvice = () => {
  const [link, setLink] = useState("");
  const [body, setBody] = useState("");
  const [title, setTitle] = useState("");
  const [id, setId] = useState("");
  const [access_token, setAccess_Token] = useState("");

  const navigate = useNavigate();

  const updatData = () => {
    setAccess_Token(localStorage.getItem("token"));
    setLink(localStorage.getItem("link"));
    setBody(localStorage.getItem("body"));
    setTitle(localStorage.getItem("title"));
    setId(localStorage.getItem("id"));

    console.log(link, body, title, id);
  };

  const saveData = async (link,body,title,id,access_token) =>{
    const data = await axios.post(
        "http://127.0.0.1:8000/api/admin/update_medical_advice",
        {
          access_token,
          link,
          body,
          title,
          id
        }
      );
      if(data){
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Your work has been saved',
        showConfirmButton: false,
        timer: 1500
      })
    }else{
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
          })
    }
      console.log(data)
      navigate("/Add_Medical_Advice");
    
  }

  useEffect(() => {
    updatData();
  },[]);


  return (
    <div>
      <div className="first-reservation-section w-100 react_calender">
        <div className="d-flex flex-row overflow-auto">
          <div className="first-reservation-container w-100">
            <Card className="w-100">
              <Table
                key={1}
                hover
                size="sl"
                className="text-center my-3 table-borderless"
              >
                <thead key={1}>
                  <tr>
                    <th>Video Link</th>
                    <th>Title</th>
                    <th>Body</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                  <td><input
                           type="text" 
                           value={link} 
                           onChange={(e) => {setLink(e.target.value);
                           console.log(e.target.value)}} >
                          
                        </input>
                        </td>

                    <td><input
                             type="text" 
                             value={body} 
                             onChange={(e) => setBody(e.target.value)} 
                        ></input></td>

                    <td><input
                           type="text" 
                           value={title} 
                           onChange={(e) => setTitle(e.target.value)} 
                        ></input></td>

                    <td className="row flex-nowrap mx-3">
                      <button
                        type="button"
                        className="btn btn-outline-info"
                        onClick={() => {
                             saveData(link,body,title,id,access_token)
                        }}
                      >
                        Update
                      </button>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateAdvice;
