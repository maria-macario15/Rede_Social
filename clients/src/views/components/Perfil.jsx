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
const defaultUserUrl = 'https://img.freepik.com/free-icon/user_318-159711.jpg';

    
 return(
<main className="container row">
    <header className="capa " >
        <img className='first-child' src={Perfil.bg_img ? Perfil.bg_img : defaultImgUrl}/>
        <img className='last-child'  src={Perfil.user_img ? Perfil.user_img : defaultUserUrl}/>
        </header>
        <div>
            
        </div>
       
</main>
 );   
}
export default Perfil;