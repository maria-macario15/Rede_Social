import style from '../components/style.css'
import logo from '../../imgs/logo.png'
import "bootstrap-icons/font/bootstrap-icons.css";
//import { useEffect, useState } from 'react'



 
function navbar() { 
   // const [username] = useState("");
 

    return (
        <main>
            <nav class="navbar bg-body-tertiary te">
                <div class="container-fluid">
                    <img src={logo} width="8%" />
                    <form class="d-flex" role="search">
                        <input class="form-control me-2" type="search" placeholder="Procurar" aria-label="Search" />
                        <button class="btn btn-outline-dark" type="submit">Achar</button>
                    </form>
                </div>
            </nav>
            <div className='col-2 te'>
                <ul class="navbar-nav me-auto mb-2 mb-lg-0 ">
                    <li class="nav-item">
                        <a class="nav-link active " aria-current="page" href="amigos"> </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link active bi bi-person" aria-current="page" href="amigos"> Amigos</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link active bi bi-cursor " aria-current="page" href="feed"> Feed</a>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link active bi bi-chat-left-dots" aria-current="page" href="conversa"> Conversas</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link active bi bi-people" aria-current="page" href="grupos"> Grupos</a>
                    </li>

                </ul>
            </div>




        </main>
    );
}

export default navbar;