import React from "react";
import img1 from "../../pages/images/img1.png";
import "./style.css";

const Footer = () => {
    return (
        <footer>
            <div className="container ">
                <div className="row bgfooter py-5 align-items-center">
                    <div className="col-md-6 col-12 py-3 order-md-0 order-1">
                        <i className="fa-solid fa-location-dot p-2"></i>
                        <span> Jenin - Palestine</span>
                        <br />
                        <i class="fa-solid fa-phone p-2"></i>
                        <span>+(970) 4 2418888</span>
                        <br />
                        <i className="fa-solid fa-envelope p-2"></i>
                        <a href="mailto:info@example.com">info@aaup.edu</a>
                    </div>
                    <div className="col-md-6 col-12 py-3 text-center order-md-1 order-0">
                        <a href="/#home">
                            <img src={img1} width="40%" alt="logo" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
