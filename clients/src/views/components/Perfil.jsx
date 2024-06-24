import { useEffect, useState } from "react";
import Post from "./post";

function Perfil() {
    const [perfil, setPerfil] = useState({
        id: '',
        username: '',
        user_img: '',
        bg_img: '',
        bio: ''
    });

    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const defaultImgUrl = 'https://andhouse.com.br/public/img/sem-imagem.jpg';
    const defaultUserUrl = 'https://img.freepik.com/free-icon/user_318-159711.jpg';

    // Função para lidar com o upload de imagens
    const handleFile = async (event) => {
        const file = event.target.files[0];

        if (file) {
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
        }
    };

    useEffect(() => {
        const fetchPerfil = async () => {
            try {
                const token = localStorage.getItem("accessToken");
                const response = await fetch('/api/users/get-user?id=' + perfil.id, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error(`Erro ao carregar o perfil: ${response.status}`);
                }

                const data = await response.json();
                if (data.length > 0) {
                    setPerfil(data[0]); // Assumindo que o backend retorna um array com um único objeto de usuário
                } else {
                    setError("Usuário não encontrado");
                }
            } catch (error) {
                console.error("Erro ao buscar o perfil:", error.message);
                setError("Erro ao carregar o perfil. Tente novamente mais tarde.");
            }
        };

        const fetchPosts = async () => {
            try {
                const response = await fetch('/api/posts'); // Substitua pelo endpoint correto
                if (!response.ok) {
                    throw new Error(`Erro ao carregar os posts: ${response.status}`);
                }
                const data = await response.json();
                setPosts(data);
                setIsLoading(false);
            } catch (error) {
                console.error("Erro ao buscar os posts:", error.message);
                setError("Erro ao carregar os posts. Tente novamente mais tarde.");
                setIsLoading(false);
            }
        };

        fetchPerfil();
        fetchPosts();
    }, [perfil.id]); // Adicione perfil.id como dependência para recarregar o perfil quando mudar

    if (error) {
        console.error(error);
    }

    // Função para atualizar a biografia
    const handleUpdateBio = async (event) => {
        event.preventDefault(); // Evita o recarregamento da página
        const newBio = event.target.value; // Obtém a nova biografia do textarea

        try {
            const token = localStorage.getItem("accessToken");
            const response = await fetch('/api/users/update-bio', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ id: perfil.id, bio: newBio }) // Envie o ID do perfil e a nova biografia
            });

            if (response.ok) {
                console.log('Biografia atualizada com sucesso!');
                // Lógica para atualizar localmente o estado de perfil.bio
            } else {
                throw new Error('Erro ao atualizar a biografia');
            }
        } catch (error) {
            console.error('Erro ao atualizar a biografia:', error);
        }
    };

    return (
        <main className="container row">
            <header className=" ">
                <a href="#" className="bi bi-pen-fill"></a>
                <div>
                    <img className='first-child capa' src={perfil.bg_img ? perfil.bg_img : defaultImgUrl} alt="Capa do perfil" />
                </div>
                <div>
                    <img className='last-child' src={perfil.user_img ? perfil.user_img : defaultUserUrl} alt="Imagem do usuário" />
                </div>
            </header>

            <div className="nome-usuario">{perfil.username}</div>
            <div className="bio">
                <h3>Biografia</h3>
                <textarea
                    className="form-control"
                    id="exampleFormControlTextarea1"
                    placeholder='Eai Taruíra, fale de você!!'
                    rows="3"
                    defaultValue={perfil.bio}
                    onBlur={handleUpdateBio} // Atualiza a biografia quando o usuário sair do textarea
                ></textarea>
                <br />
                <button>Atualizar Biografia</button>
            </div>

            <div className="bo_perfil">
                <strong className="text-light fw-semi">Perfil</strong>
            </div>
            <br />
            <br />

            <div><h1>testetetste</h1></div>

            <div>
                <div className="flex flex-col items-center gap-5 w-full">
                    {isLoading ? (
                        <span>Carregando...</span>
                    ) : (
                        <div className="w-full flex flex-col gap-5 items-center">
                            {posts.map((post) => (
                                <Post key={post.id} post={post} />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Offcanvas para edição do perfil */}
            <div className="offcanvas offcanvas-start" data-bs-backdrop="static" tabIndex="-1" id="edicao" aria-labelledby="edicao">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="edicao">Edite seu perfil</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    {/* Capa */}
                    <div>
                        <input
                            type="file"
                            id="fileInputCapa"
                            style={{ display: 'none' }}
                            onChange={handleFile}
                        />
                        <div className="img">
                            {/* Lógica para exibir a imagem de capa atual ou a imagem selecionada */}
                        </div>
                        <br />
                        <button onClick={() => document.getElementById('fileInputCapa').click()}>
                            Escolha sua Capa
                        </button>
                    </div>
                    {/* Capa */}
                    <br />
                    <div className="linha"></div>
                    <br />
                    {/* Perfil */}
                    <div>
                        <input
                            type="file"
                            id="fileInputPerfil"
                            style={{ display: 'none' }}
                            onChange={handleFile}
                        />
                        <div className="imge">
                            {/* Lógica para exibir a imagem de perfil atual ou a imagem selecionada */}
                        </div>
                        <br />
                        <button onClick={() => document.getElementById('fileInputPerfil').click()}>
                            Escolha seu Perfil
                        </button>
                    </div>
                    <br />
                    <div className="linha"></div>
                    <br />
                    <br />
                    <h3 className="bio">Biografia</h3>
                    <textarea className="form-control" id="exampleFormControlTextarea1" placeholder='Eai Taruíra, fale de você!!' rows="3"></textarea>
                    <br />
                    <button>Postar</button>
                </div>
            </div>
        </main>
    );
}

export default Perfil;
