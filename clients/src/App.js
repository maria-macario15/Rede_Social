import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import Feed from './views/components/Feed';
import Navbar from './views/components/Navbar'
import Login from "./views/auth/login"
import chat from './views/chat/components/App'
import { useEffect } from 'react';
import logo from '../src/imgs/logo.png'
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
