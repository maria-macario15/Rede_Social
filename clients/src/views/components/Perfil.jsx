import { useContext, useState } from "react";

function Perfil(){
 const [Perfil, setPerfil] = useState({
    id: '',
    username: '',
    user_img: '',
    bg_img: '',
    post_desc:'',
    img:'',
    comment_desc:'',
    likes_user_id:'',
    likes_post_id:'',

});
 
        const defaultImgUrl = 'https://andhouse.com.br/public/img/sem-imagem.jpg';
 

    
 return(
<main className="container row">
    <header className="capa " >
        <img
        src={Perfil.bg_img ? Perfil.bg_img : defaultImgUrl}/>
        </header>
</main>
 );   
}
export default Perfil;