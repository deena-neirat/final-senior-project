import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, types }) => {
    var userData = localStorage.getItem("userData");

    return (
        <>
            {userData ? (
                types.includes(JSON.parse(userData).type) ? (
                    children
                ) : (
                    <Navigate to="/NotFound" />
                )
            ) : (
                <Navigate to="/login" />
            )}
        </>
    );
};

export default ProtectedRoute;
