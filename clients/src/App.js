import React, { useEffect } from 'react';
import { Routes, Route, Navigate, Outlet, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from "./views/auth/login";
import Profile from './views/Profile/index';
import Barra from './views/components/Barra';
import Perfil from './views/components/Perfil'
import Feedback from './views/others/Feedback';
import Feed from './views/components/Feed';
import Post from './views/components/post';



// Componente para rotas protegidas
function PrivateRoute({ element: Component, ...rest }) {
  const isAuthenticated = localStorage.getItem('accessToken') !== null; // Verifique se o usuário está autenticado
  return isAuthenticated ? <Component {...rest} /> : <Navigate to="/login" />;
}

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      {/* Rota protegida */}
      <Route path="/" element={<PrivateRoute element={Profile} />} />
      <Route path="/profile" element={<PrivateRoute element={Perfil} />} />
      <Route path="/post" element={<PrivateRoute element={Feed} />} />
      
      {/* Redireciona para /login se a rota não for encontrada */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}


export default App