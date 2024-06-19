import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import Feed from './views/components/Feed';
import Barra from './views/components/Barra'
import Login from "./views/auth/login"
import chat from './views/chat/components/App'
import { useEffect } from 'react';
import logo from '../src/imgs/logo.png'
import inicial from './views/components/inicial'
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
