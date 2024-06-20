import '../components/style.css'
import logo from '../../imgs/logo.png'
import "bootstrap-icons/font/bootstrap-icons.css";
import 'bootstrap/js/dist/util';
import 'bootstrap/js/dist/dropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
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
    /*
    <div className='postar te' >
                            <input className="container " type="file" onChange={handleFileChange} />
                            <input className="form-control form-control-sm " type="text" aria-label=".form-control-sm example" />
    
                            <button className="btn btn-outline-light" type="submit">Postar</button>
                            </div>
    */


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
    const userImgSrc = user?.user_img || 'https://img.freepik.com/free-icon/user_318-159711.jpg';


    const [img, setImg] = useState(''); // Estado para armazenar o src da imagem
    const [imageName, setImageName] = useState(''); // Estado para armazenar o nome da imagem


    const readURL = (event) => {
        const input = event.target;
        if (input.files && input.files[0]) {
            const reader = new FileReader();
            reader.onload = function (e) {
                setImg(e.target.result); // Atualiza o estado com o src da imagem
                document.querySelector('.image-upload-wrap').classList.add('hide'); // Esconde a área de upload
                document.querySelector('.file-upload-image').setAttribute('src', e.target.result); // Define o src da imagem
                document.querySelector('.file-upload-content').classList.remove('hide'); // Mostra a área de conteúdo da imagem
                document.querySelector('.image-title').innerHTML = input.files[0].name; // Define o nome da imagem
            };
            reader.readAsDataURL(input.files[0]);
        } else {
            removeUpload();
        }
    };

    const removeUpload = () => {
        const input = document.querySelector('.file-upload-input');
        input.value = ''; // Limpa o valor do input de arquivo
        setImg(''); // Limpa o estado da imagem
        document.querySelector('.file-upload-content').classList.add('hide'); // Esconde a área de conteúdo da imagem
        document.querySelector('.image-upload-wrap').classList.remove('hide'); // Mostra a área de upload
    };

    const handleDragOver = () => {
        document.querySelector('.image-upload-wrap').classList.add('image-dropping'); // Adiciona classe ao arrastar sobre a área de upload
    };

    const handleDragLeave = () => {
        document.querySelector('.image-upload-wrap').classList.remove('image-dropping'); // Remove classe ao arrastar sair da área de upload
    };

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    return (
        <main className='container row'>
            <nav className="navbar bg-body-tertiary ">
                <div className="container-fluid">
                    <img src={logo} width="10%" />
                    <form className="d-flex" role="search">
                        <input className="form-control me-2" type="search" placeholder="Procurar" aria-label="Search" />
                    </form>
                </div>
            </nav>
            <button className='btn btn-outline-dark  ' onClick={handleShow}>
                <i className="bi bi-plus-circle"  ></i>
            </button>
            <Offcanvas className="te" show={show} onHide={handleClose} backdrop="static">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title></Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>

                    <div className="image-upload-wrap" onSubmit={handleSubmit}>
                        <input className="file-upload-input" type='file' onChange={handleFileChange} accept="image/*" />
                        <div className="drag-text">
                            <h3>Drag and drop a file or select add Image</h3>
                        </div>
                    </div>
                    <div className={`file-upload-content ${img ? '' : 'hide'}`}>
                        <img className="file-upload-image" src={img} alt="your image" />
                        <div className="image-title-wrap">
                            <button type="button" onClick={removeUpload} className="remove-image"></button>
                        </div>

                        <span className="image-title">{imageName}</span>
                        <input className="form-control form-control-sm " type="text" aria-label=".form-control-sm example" />

                        <button className="btn btn-outline-light" type="submit">Postar</button>

                    </div>

                </Offcanvas.Body>
            </Offcanvas>





            <div className='col-2 '>

                <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
                    <li className="nav-item">
                        <a className="nav-link  " aria-current="page" href="perfil"> {userImgSrc} {setUser.username}</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link active bi bi-person" aria-current="page" href="amigos"> Amigos</a>
                    </li>
                    <li className="nav-item">
                        <a href="/feed" className="nav-link active bi bi-cursor" aria-current="page" onClick={handleNavigateToFeed}> Feed</a>
                    </li>

                    <li className="nav-item">
                        <a className="nav-link active bi bi-chat-left-dots" aria-current="page" href="conversa"> Conversas</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link active bi bi-people" aria-current="page" href="grupos"> Grupos</a>
                    </li>

                </ul>
            </div>
        
    
    <footer className="bg-body-tertiary text-center border border-black"> 
           <a className="text-body te" href="#">Taruíra Chapoca</a><br />
    <a className="text-body te">Criado e desenvolvido por Júlio Basso e Maria Macario.</a><br />
    <a>@2024</a>

   </footer>
   </main>
    );
}


export default Barra;