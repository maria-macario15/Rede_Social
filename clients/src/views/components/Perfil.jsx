import { useEffect, useState } from "react";
import Post from "./post";
function Perfil() {
    const [Perfil, setPerfil] = useState({
        id: '',
        username: '',
        user_img: '',
        bg_img: '',
        bio: ''

    });

    {/*FILE UPLOAD*/ }
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
    {/*FILE UPLOAD*/ }

    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch();
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

        fetchPosts();
    }, []);

    if (error) {
        console.error(error);
    }

    const defaultImgUrl = 'https://andhouse.com.br/public/img/sem-imagem.jpg';
    const defaultUserUrl = 'https://img.freepik.com/free-icon/user_318-159711.jpg';






    return (
        <main className="container row">
            <div class="perfil-container">
                <header className=" " >
                    <a data-bs-toggle="offcanvas" data-bs-target="#edicao" aria-controls="edicao" href="#edicao" class="bi bi-pen-fill editar "></a>
                    <div>
                        <img className='first-child capa ' src={Perfil.bg_img ? Perfil.bg_img : defaultImgUrl} />
                    </div>
                    <div>
                        <img className='last-child foto-perfil' src={Perfil.user_img ? Perfil.user_img : defaultUserUrl} />
                    </div>

                </header>



                <div class="nome-usuario">{Perfil.username}</div>
                <div class="bio">{Perfil.bio}</div>
                
                <div class="bo_perfil">
                    <strong className="text-light fw-semi">Perfil</strong>


                </div>
                <br />
                <br />
                
                <div><h1>testetetste</h1></div>
            </div>
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


            <div className="offcanvas offcanvas-start" data-bs-backdrop="edicao" tabindex="-1" id="edicao" aria-labelledby="edicao" >
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="edicao">Edite seu perfil</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    {/*Capa*/}
                    <div>
                        <input
                            type="file"
                            id="fileInput"
                            style={{ display: 'none' }}
                            onChange={handleFile}
                        />

                        <div className="img" >
                            {selectedImage ? (
                                <img src={selectedImage} alt="Selected" className="img-pre" />
                            ) : (
                                <p>Nenhuma imagem selecionada</p>
                            )}
                        </div> <br />
                        <button onClick={() => document.getElementById('fileInput').click()}>
                            Escolha sua Capa
                        </button>
                    </div>
                    {/*Capa*/}
                    <br />
                    <div className="linha"></div>
                    <br />
                    {/*Perfil*/}
                    <div>
                        <input
                            type="file"
                            id="fileInput"
                            style={{ display: 'none' }}
                            onChange={handleFile}
                        />

                        <div className="imge" >
                            {selectedImage ? (
                                <img src={selectedImage} alt="Selected" className="img-p" />
                            ) : (
                                <p>Nenhuma imagem selecionada</p>
                            )}
                        </div><br />
                        <button onClick={() => document.getElementById('fileInput').click()}>
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