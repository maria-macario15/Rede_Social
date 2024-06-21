import { useEffect, useState } from "react";
import Post from "./post";
function Perfil(){
 const [Perfil, setPerfil] = useState({
    id: '',
    username: '',
    user_img: '',
    bg_img: '',

});
 
const defaultImgUrl = 'https://andhouse.com.br/public/img/sem-imagem.jpg';
const defaultUserUrl = 'https://img.freepik.com/free-icon/user_318-159711.jpg';



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

    
 return(
<main className="container row">
    <header className="capa " >
        <img className='first-child' src={Perfil.bg_img ? Perfil.bg_img : defaultImgUrl}/>
        <img className='last-child'  src={Perfil.user_img ? Perfil.user_img : defaultUserUrl}/>
        </header>
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
       
</main>
 );   
}
export default Perfil;