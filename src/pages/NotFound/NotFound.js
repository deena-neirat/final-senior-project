import React from "react";
import "./style.css";

const NotFound = () => {
    return (
        <div className="d-flex align-items-center justify-content-center vh-100 back">
            <div className="text-center">

                <div className="spinner">
                    <div className="spinner1"></div>
                </div>

                <div className="text-center">
                    <p className="fs-1 text-white text">
                        <span className="coloerText">Opps 404!</span> Page not found
                        <p className="fs-5">The page you're looking for dosen't exist</p>
                    </p>
                </div>

            </div>
        </div>
    );
};

export default NotFound;
