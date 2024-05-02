import { useEffect, useState } from "react";
import { FaThumbsUp, FaRegComment,FaPaperPlane  } from "react-icons/fa";

interface IPost{
    id: number,
    post_desc:string,
    img:string,
    username:string,
    user_img:string
}

interface IUser {
    user_img: string,
    username: string
}
function Post(props:{post:IPost}){
    const{post_desc, img, username, user_img}=props.post

    const [user, setUser] = useState<IUser | undefined>(undefined);
    useEffect(() => {
        let value = localStorage.getItem("rede-social:user");
        if (value) {
            setUser(JSON.parse(value));
        }
    }, []);
    const userImgSrc = user?.user_img ?? "https://img.freepik.com/free-icon/user_318-159711.jpg";

    return(
        <div className="w-1/3 bg-white wounded-lg p-4 shadow-md">
            <header className="flex gap-2 pb-4 border-2 items-center">
                <img className="w-8 h-8 rounded-full" src={user_img?user_img:"https://img.freepik.com/free-icon/user_318-159711.jpg"} 
                alt="imagem do usuario que fez o post" />
                <div className="flex flex-col">
                    <span className="font-semibold">{username}</span>
                    <span className="text-xs">06/01/2023</span>
                </div>
                </header>
                {post_desc && (
                <div className="py-4 w-full">
                    <span >{post_desc}</span>
                </div>
            )}
            {img && <img className="rounded-lg" src={img} alt=" imagem do post"/>}
            <div className="flex justify-between py-4 border-b">
                <div className=" flex gap-1 items-center">
                    <span className="bg-blue-600 w6 h-6 text-white flex items-center justify-center rounded-full text-xs"><FaThumbsUp/>3</span>
                </div>
                <span>3 comentarios</span>
            </div>
            <div className=" flex justify-between py-4  text-gray-600 border-b">
                <button className="flex items-center gap-1"><FaThumbsUp/> Curtir</button>
                <button className="flex items-center gap-1"><FaRegComment/></button>
            </div>
            <div className="flex gap-4 pt-6">
            <img src={userImgSrc}
                    alt="imagem do perfil"
                    className="w-8 h-8 rounded-full"
                />
            </div>
            <div className="w-full bg-zinc-100 items-center text-gray-600 px-3 py-1 rounded-full">
                <input type="text" className="bg-zinc-100 w-full focus-visible:outline-none" />
                <FaPaperPlane/>
            </div>
        </div>
    );
}
export default Post;