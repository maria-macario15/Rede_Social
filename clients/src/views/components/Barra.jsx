import '../components/style.css'
import logo from '../../imgs/logo.png'
import "bootstrap-icons/font/bootstrap-icons.css";
import 'bootstrap/js/dist/util';
import 'bootstrap/js/dist/dropdown';
import { Offcanvas } from 'bootstrap';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';


function Barra() {
    const [user, setUser] = useState({
        id: '',
        email: '',
        username: '',
        user_img: '',
        bg_img: ''
    });

    const navigate = useNavigate();

    useEffect(() => {
        const value = localStorage.getItem("accessUser");
        if (value) {
            setUser(JSON.parse(value));
        }
    }, []);

    const handleNavigateToFeed = (event) => {
        event.preventDefault(); // Evita que o link recarregue a página
        navigate('/feed');
    };

    const [searchTerm, setSearchTerm] = useState('');
    const [file, setFile] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append('file', file);

            const token = localStorage.getItem("accessToken");

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

    const defaultUserUrl = 'https://img.freepik.com/free-icon/user_318-159711.jpg';

    const [selectedImage, setSelectedImage] = useState(null);

    const handleFile = (event) => {
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = (e) => {
                setSelectedImage(e.target.result);
            };

            reader.readAsDataURL(file);
        } else {
            setSelectedImage(null);
        }
    };

    return (
        <main className='container-fluid'>
            <div className="row justify-content-md-center text-center d-flex justify-content-around">
                <nav className="navbar navbar-light bg-body-light">
                    <button className="btn btn-outline-dark col-1" type="button" data-bs-toggle="offcanvas" data-bs-target="#staticBackdrop" aria-controls="staticBackdrop">
                        <i className="bi bi-plus"></i>
                    </button>
                    <img src={logo} width="10%" className='col-1' alt="Logo" />
                    <form className="d-flex" role="search">
                        <input className="form-control me-2 col-1" type="search" placeholder="Procurar" aria-label="Search" />
                    </form>
                </nav>
            </div>

            {/*CRIAR POST */}
            <div className="offcanvas offcanvas-start" data-bs-backdrop="static" tabIndex="-1" id="staticBackdrop" aria-labelledby="staticBackdropLabel">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="staticBackdropLabel">Crie sua publicação</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <div>
                        <input
                            type="file"
                            id="fileInput"
                            style={{ display: 'none' }}
                            onChange={handleFile}
                        />
                        <button onClick={() => document.getElementById('fileInput').click()}>
                            Escolha sua foto
                        </button>
                        <div className="image-preview">
                            {selectedImage ? (
                                <img src={selectedImage} alt="Selected" className="image-preview__img" />
                            ) : (
                                <p>Nenhuma imagem selecionada</p>
                            )}
                        </div>
                    </div>
                    <br />
                    <textarea className="form-control" id="exampleFormControlTextarea1" placeholder='Se expresse, taruíra, bote pra pocar!' rows="3"></textarea>
                    <br />
                    <button>Postar</button>
                </div>
            </div>

            {/*NAVBAR LATERAL*/}
            <div className='col-2'>
                <ul className="nav flex-column nav-pills me-3">
                    <li className="nav-item">
                        <a href="#">
                            <img className='user' src={user.user_img ? user.user_img : defaultUserUrl} alt="User" />
                           <p className='fw-semibold fs-4 '>{user.username}</p> 
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link text-light te bi bi-person" aria-current="page" href="amigos"> Amigos</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link text-light te bi bi-cursor" aria-current="page" href="/feed" onClick={handleNavigateToFeed}> Feed</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link text-light te bi bi-chat-left-dots" aria-current="page" href="conversa"> Conversas</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link text-light te bi bi-people" aria-current="page" href="grupos"> Grupos</a>
                    </li>
                    <li className="nav-item">

                        <a className="nav-link text-light te  bi bi-emoji-smile" aria-current="page" href='feedback'> Feedback</a>

                    </li>
                </ul>
            </div>

            {/*RODAPE*/}
            <footer className="bg-body-tertiary text-center border border-black rounded-4 fixarRodape">
                <strong className="text-light fw-semi">Taruíra Chapoca</strong><br />
                <strong className="text-light fw-semi">Criado e desenvolvido por Júlio Basso e Maria Macario.</strong><br />
                <strong className='text-light fw-semi'>@2024</strong>
            </footer>
        </main>
    );
}

export default Barra;