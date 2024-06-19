import '../components/style.css'
import logo from '../../imgs/logo.png'
import "bootstrap-icons/font/bootstrap-icons.css";

import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
/*
<div className='container postar col-3 te' onSubmit={handleSubmit}>
<input className="container te mn" type="file" onChange={handleFileChange} />
<input className="form-control form-control-sm " type="text" aria-label=".form-control-sm example" />

<button className="btn btn-outline-light" type="submit">Postar</button>
*/

function Barra() {
    const [user, setUser] = useState({
        id: '',
        email: '',
        username: '',
        user_img: '',
        bg_img: ''
    });

    const handleNavigateToFeed = (event) => {
        event.preventDefault(); // Evita que o link recarregue a página
        navigate('/feed');
    };

    const [searchTerm, setSearchTerm] = useState('');
    const [file, setFile] = useState(null);

    /*const [username, setUsername] = useState('');
    const [user_img, setUser_img] = useState('');*/
    const token = localStorage.getItem("token");
    const navigate = useNavigate();





    useEffect(() => {
        if (token) {
            carregarUsuarios(token);
        }
    }, [token]);

    async function carregarUsuarios(token) {
        try {
            const resposta = await fetch('/auth/login', {
                headers: {
                    'x-access-token': token
                }
            });

            if (resposta.status === 401) {
                localStorage.removeItem('token');
                alert("Usuário não autenticado");
                navigate("/");
            } else if (!resposta.ok) {
                throw new Error("Erro requisição: " + resposta.status);
            } else {
                const dados = await resposta.json();
                setUser({
                    id: dados.id,
                    email: dados.email,
                    username: dados.username,
                    user_img: dados.user_img,
                    bg_img: dados.bg_img
                });
            }
        } catch (error) {
            console.error("Erro ao buscar os usuários", error);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append('file', file);

            const resposta = await fetch('/api/upload', {
                method: 'POST',
                headers: {
                    'x-access-token': token
                },
                body: formData
            });

            if (resposta.ok) {
                const filename = await resposta.json();
                console.log('Arquivo enviado:', filename);
                // Lógica para lidar com o arquivo enviado
            } else {
                throw new Error("Erro ao fazer upload do arquivo");
            }
        } catch (error) {
            console.error("Erro ao enviar o arquivo", error);
        }
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };
    const userImgSrc = user?.user_img || "https://img.freepik.com/free-icon/user_318-159711.jpg";


    function postare(event){

        return(
        
    <div className='card1:hover'>
    <button className="discord" type="submit">Postar</button> 
       </div>
        )
    }



    return (
        <main className='container row'>
            <nav class="navbar bg-body-tertiary ">
                <div class="container-fluid">
                    <img src={logo} width="10%" />
                    <form class="d-flex" role="search">
                        <input class="form-control me-2" type="search" placeholder="Procurar" aria-label="Search" />
                    </form>
                </div>
            </nav>

            <div className='ups'>
                <button className='share-btn share-btn:hover ' onClick={postare}>+</button>
                
                </div>
                <div className='col-2 '>
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0 ">
                        <li class="nav-item">
                            <a class="nav-link active bi bi-person" aria-current="page" href="amigos"> Amigos</a>
                        </li>
                        <li class="nav-item">
                            <a href="/feed" className="nav-link active bi bi-cursor" aria-current="page" onClick={handleNavigateToFeed}> Feed</a>
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
  
export default Barra;