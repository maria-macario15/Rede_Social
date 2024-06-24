import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from "./views/auth/login";
import Profile from './views/Profile/index';
import Barra from './views/components/Barra';
import Perfil from './views/components/Perfil';
import Post from './views/components/post';

// Componente para rotas protegidas
function PrivateRoute({ element: Component, ...rest }) {
  const isAuthenticated = localStorage.getItem('accessToken') !== null; // Verifique se o usuário está autenticado
  return isAuthenticated ? <Component {...rest} /> : <Navigate to="/login" />;
}

// Componente de layout protegido que inclui a barra de navegação
function ProtectedLayout() {
  return (
    <>
      <Barra />
      <Outlet /> {/* Renderiza o conteúdo da rota protegida */}
    </>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      
      {/* Rotas protegidas */}
      <Route element={<ProtectedLayout />}>
        <Route path="/" element={<PrivateRoute element={Post} />} />
        <Route path="/profile" element={<PrivateRoute element={Perfil} />} />
        <Route path="/post" element={<PrivateRoute element={Post} />} />
      </Route>

      {/* Redireciona para /login se a rota não for encontrada */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
