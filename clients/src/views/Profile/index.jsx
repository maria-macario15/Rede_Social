import React from 'react';
import Barra from '../components/Barra';




const Profile = ({ children }) => (
    <>
        <Barra />
        <div className="main-content">
            {children}
        </div>
    </>
);

export default Profile;