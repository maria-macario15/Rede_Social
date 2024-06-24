import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from "./views/auth/login";
import Profile from './views/Profile/index';
import Perfil from './views/components/Perfil';

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
      <Route path="/" element={<PrivateRoute element={Profile} />}>
        <Route path="/profile" element={<Perfil />} />
      </Route>
      {/* Redireciona para /login se a rota não for encontrada */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;