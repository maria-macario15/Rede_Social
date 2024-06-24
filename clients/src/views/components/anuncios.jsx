import React, { useState } from 'react';
import './style.css';
import meca from '../../imgs/Meca.jpg'
import jp from '../../imgs/J-P.jpg'
import NoPre from '../../imgs/NoPre.jpeg'


const AdComponent = ({ ad }) => {
    const { ad_desc, img, company_name } = ad;

    return (
        <div className="ad-container">
            <div className="ad-header">
                <img src={img} alt={company_name} className="ad-img" />
                <div>
                    <br />
                    <h2>{company_name}</h2>
                </div>
            </div>
            <div className="ad-body">
                <p>{ad_desc}</p>
            </div>
        </div>
    );
};

export default AdComponent


