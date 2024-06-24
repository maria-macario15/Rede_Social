import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from "./views/auth/login";
import Profile from './views/Profile/index';
<<<<<<< HEAD
import Barra from './views/components/Barra';
import Perfil from './views/components/Perfil'
import Feedback from './views/others/Feedback';
import Feed from './views/components/Feed';
import Post from './views/components/post';
function ProtectedLayout() {
  const navigate = useNavigate();
  
  useEffect(() => {
    document.title = "Taruira Chapoca";
    const accessToken = localStorage.getItem("accessToken");
=======
import Perfil from './views/components/Perfil';
>>>>>>> a56e7813dfe92c810879281d54f2f6fb1a50c38c

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
<<<<<<< HEAD
      <Route path="/login" element={<Post/>} />
=======
      {/* Redireciona para /login se a rota não for encontrada */}
      <Route path="*" element={<Navigate to="/login" />} />
>>>>>>> a56e7813dfe92c810879281d54f2f6fb1a50c38c
    </Routes>
  );
}

export default App;