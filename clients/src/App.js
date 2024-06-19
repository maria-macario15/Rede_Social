import { BrowserRouter, Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import Login from "./views/auth/login"
import { useEffect } from 'react';
import Caminho from "./caminho"
import inicial from './views/components/inicial'
import Barra from './views/components/Barra';
import fim from './views/components/Final';
function App() {
  useEffect(() => {
    document.title = "Taruira Chapoca"

  }, [])

  return (
    <BrowserRouter>
    <Barra/>
      <Routes>
        <Route path='/' element={<inicial/>} /> 
      
      </Routes>
  
    </BrowserRouter>
  );
}

export default App;
