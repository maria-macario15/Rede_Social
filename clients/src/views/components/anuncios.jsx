import React, { useState } from 'react';
import './style.css';

import meca from '../../imgs/Meca.jpg'
import jp from '../../imgs/J-P.jpg'
import NoPre from '../../imgs/NoPre.jpeg'
function An () {
 const [ id, ad_desc, img, company_name, created_at] = useState('')
    const Ad = [
        {
            id: 1,
            ad_desc: 'Descubra o melhor para seu pet! Com o nosso mapa online, encontrar pet shops, groomers e veterinários nunca foi tão fácil. Explore agora e ofereça o melhor cuidado para seu companheiro peludo',
            img: {jp},
            company_name: 'J-Pets',
            created_at: '2024-06-24',
        },
        {
            id: 2,
            ad_desc: 'Gerencie suas notas com facilidade na sua oficina mecânica! Conheça MECANICONTROL e simplifique seu dia a dia..',
            img: {meca},
            company_name: 'MECANICONTROL',
            created_at: '2024-06-24',
        }, 
        {
            id: 3,
            ad_desc: 'NoPrecinho, os melhores preços são aqui',
            img: {NoPre},
            company_name: 'NoPrecinho',
            created_at: '2024-06-24',
        },
    ];
    return (
        <div className="ad-container">
            <div className="ad-header">
                <div>
                    <h2>{company_name}</h2>
                    <p className="ad-date">{created_at}</p>
                </div>
            </div>
            <div className="ad-body">
                <p>{ad_desc}</p>
                {img && <img src={img} alt="Ad" className="ad-img" />}
            </div>
        </div>
    );
}

export default An;
