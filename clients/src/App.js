import { BrowserRouter, Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import Login from "./views/auth/login"
import { useEffect } from 'react';
import Caminho from "./caminho"

function App() {
  useEffect(() => {
    document.title = "Taruira Chapoca"

  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>} /> 
        
      </Routes>
  
    </BrowserRouter>
  );
}

export default App;
