import { useEffect, useState } from "react";
import Post from "./post";
import Feed from "./Feed";
import PostList from './postId';
import { UserProvider } from '../others/UserContext';
function Perfil() {
    const [ads, setAds] = useState([]);

    const [user, setUser] = useState({
        id: '',
        username: '',
        user_img: '',
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


        <UserProvider>
            <div className=" profile-container ">
                <a className="bi bi-pen-fill editar" data-bs-toggle="offcanvas" data-bs-target="#edicao" aria-controls="edicao" href="#edicao"></a>
                <div className="profile-photo">

                    <img className='' src={user.user_img ? user.user_img : defaultUserUrl} />
                </div>
                <div className="user-info">
                    <a className="nome-usuario">{user.username}</a>
                    <div className="bio">
                        <p>{Perfil.bio}</p>




                    </div>
                </div>
                <br />

                <div className="">
                    <button type="button" class="bo_perfil " disabled> Perfil </button>
                </div>


                <br />
                <div className=" taru app-container">

                    <PostList posts={posts} ads={ads} isLoading={isLoading} />



                </div>

                <div className="offcanvas offcanvas-start" data-bs-backdrop="static" tabIndex="-1" id="edicao" aria-labelledby="edicao">
                    <div className="offcanvas-header">
                        <h5 className="offcanvas-title" id="edicao">Edite seu perfil</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div className="offcanvas-body">

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
                                {selectedImage ? (
                                    <img src={selectedImage} alt="Selected" className="img-p" />
                                ) : (
                                    <p>Nenhuma imagem selecionada</p>
                                )}
                            </div>
                            <br />
                            <button onClick={() => document.getElementById('fileInputPerfil').click()}>
                                Escolha sua Foto
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
            </div>
        </UserProvider>
    );
}
export default Perfil