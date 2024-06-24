import '../components/style.css';
import logo from '../../imgs/logo.png';
import "bootstrap-icons/font/bootstrap-icons.css";
import 'bootstrap/js/dist/util';
import 'bootstrap/js/dist/dropdown';
import { Offcanvas } from 'bootstrap';
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import UploadComponent from './UploadComponent'; // Importa o novo componente de upload

function Barra() {
    const [user, setUser] = useState({
        id: '',
        email: '',
        username: '',
        user_img: '',
        bg_img: ''
    });

    const [selectedFile, setSelectedFile] = useState(null); // Define o estado de selectedFile

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

    const [post, setPost] = useState({
        post_desc: '',
        img: '',
        username: user.username, // Assume o username do usuário logado
        user_img: user.user_img, // Assume a imagem do usuário logado
    });

    const handleSubmit = async (e) => { // Remove o segundo argumento `selectedFile`
        e.preventDefault();

        try {
            if (!selectedFile) {
                throw new Error("Nenhum arquivo selecionado");
            }

            const formData = new FormData();
            formData.append('file', selectedFile);
            formData.append('post_desc', post.post_desc);
            formData.append('username', post.username);
            formData.append('user_img', post.user_img);

            const token = localStorage.getItem("accessToken");

            const response = await fetch('/upload', {
                method: 'POST',
                headers: {
                    'x-access-token': token
                },
                body: formData
            });

            if (response.ok) {
                const filename = await response.json();
                console.log('Arquivo enviado:', filename);
                // Lógica para lidar com o arquivo enviado, se necessário
                alert("Arquivo enviado com sucesso!");
                setPost({
                    post_desc: '',
                    img: '',
                    username: user.username,
                    user_img: user.user_img,
                });
                setSelectedFile(null); // Limpa selectedFile após o envio
            } else {
                throw new Error("Erro ao fazer upload do arquivo");
            }
        } catch (error) {
            console.error("Erro ao enviar o arquivo", error);
            alert("Erro ao enviar o arquivo. Por favor, tente novamente.");
        }
    };

    const defaultUserUrl = 'https://img.freepik.com/free-icon/user_318-159711.jpg';

    const handleFileSelect = (file) => {
        setSelectedFile(file); // Define selectedFile com o arquivo selecionado
    };

    return (
        <main className='container-fluid '>
   
            <div className="row justify-content-md-center text-center d-flex justify-content-around teste ">
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

            {/* CRIAR POST */}
            <div className="offcanvas offcanvas-start" data-bs-backdrop="static" tabIndex="-1" id="staticBackdrop" aria-labelledby="staticBackdropLabel">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="staticBackdropLabel">Crie sua publicação</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <UploadComponent onFileSelect={handleFileSelect} /> {/* Passa handleFileSelect como prop para UploadComponent */}
                    <br />
                    <div className="image-preview">
                        {selectedFile ? (
                            <img src={URL.createObjectURL(selectedFile)} alt="Selected" className="image-preview__img" />
                        ) : (
                            <p>Nenhuma imagem selecionada</p>
                        )}
                    </div>
                    <br />
                    <textarea
                        className="form-control"
                        placeholder='Se expresse, taruíra, bote pra pocar!'
                        value={post.post_desc}
                        onChange={(e) => setPost({ ...post, post_desc: e.target.value })}
                        rows="3"
                    ></textarea>
                    <br />
                    <button onClick={handleSubmit}>
                        Postar
                    </button>
                </div>
            </div>

            {/* NAVBAR LATERAL */}
            <div className='col-2 '>
                <ul className="nav flex-column nav-pills me-3 ">
                    <li className="nav-item ">
                        <Link to="/profile">
                            <img className='user' src={user.user_img > 0 ? user.user_img : defaultUserUrl} alt="User" />
                            <p className='fw-semibold fs-4'>{user.username}</p>
                        </Link>
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
                        <a className="nav-link text-light te bi bi-emoji-smile" aria-current="page" href='feedback'> Feedback</a>
                    </li>
                </ul>
                <div className='p-3 '> 
                  
                    <button onClick={handleNavigateToFeed}>Sair</button>
                </div>
            </div>

            {/* RODAPE */}
            <footer className="bg-body-tertiary text-center border border-black rounded-4 fixarRodape">
                <strong className="text-light fw-semi">Taruíra Chapoca</strong><br />
                <strong className="text-light fw-semi">Criado e desenvolvido por Júlio Basso e Maria Macario.</strong><br />
                <strong className='text-light fw-semi'>@2024</strong>
            </footer>
        </main>
    );
}

export default Barra;