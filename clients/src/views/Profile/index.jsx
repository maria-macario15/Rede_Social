import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Barra from '../components/Barra';

const Profile = () => {
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      navigate('/login'); // Redireciona para /login se não houver accessToken
    } else {
      // Aqui você poderia realizar alguma validação adicional do token se necessário
      setAuthenticated(true);
    }
  }, [navigate]);

  if (!authenticated) {
    return null; 
  }

  return (
    <>
      <Barra />
      
      
      
    </>
  );
};

export default Profile;