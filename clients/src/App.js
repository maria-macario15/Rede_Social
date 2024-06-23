import { Routes, Route, Outlet, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from 'react';
import Login from "./views/auth/login";
import Profile from './views/Profile/index';
import Barra from './views/components/Barra';
import Perfil from './views/components/Perfil'
import Feedback from './views/others/Feedback';
function ProtectedLayout() {
  const navigate = useNavigate();
  
  useEffect(() => {
    document.title = "Taruira Chapoca";
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
        navigate('/login'); // Redireciona para a rota '/login' se não houver accessToken
    }
}, [navigate]);

  return <Outlet />;
}

function App() {
  return (
    <Routes>
      <Route element={<ProtectedLayout />}>
        <Route path="/" element={<Profile />} />
      </Route>
      <Route path="/login" element={<Perfil/>} />
    </Routes>
  );
}

export default App;