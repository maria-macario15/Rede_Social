import { useEffect, useState } from "react";
import { FaPaperPlane, FaUserFriends } from "react-icons/fa";
import { TbPhoto } from "react-icons/tb";

function Share() {
    const [post_desc, setDesc] = useState("");
    const [postImg, setPostImg] = useState('');
    const [img, setImg] = useState<File | null>(null);
    const [user, setUser] = useState({
        id: '',
        email: '',
        username: '',
        user_img: '',
        bg_img: ''
    });

    useEffect(() => {
        if (img) {
            setPostImg(URL.createObjectURL(img));
        }
    }, [img]);

    const upload = async () => {
        try {
            const formData = new FormData();
            img && formData.append('file', img);

            const response = await fetch('/upload/', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Falha ao realizar o upload da imagem');
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.debug(error);
        }
    };

    const SharePost = async () => {
        try {
            let imgurl = "";
            if (img) {
                imgurl = await upload();
            }

            const newPost = {
                post_desc,
                img: imgurl,
            };

            const response = await fetch('/post/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newPost),
            });

            if (!response.ok) {
                throw new Error('Falha ao enviar o post');
            }

            setDesc('');
            setImg(null);
        } catch (error) {
            console.error('Erro ao compartilhar o post:', error);
        }
    };
    const userImgSrc = user?.user_img || "https://img.freepik.com/free-icon/user_318-159711.jpg";

    return (
        <div className="w-1/3 bg-white rounded-lg p-4 shadow-md flex flex-col gap-3">
            {img && <img className="rounded-lg" src={postImg} alt="imagem do post" />}
            <div className="flex gap-4 pt-6">
                <div className="w-full bg-zinc-100 items-center text-gray-600 px-3 py-1 rounded-full">
                    <input type="text" placeholder={`no que você está pensando?`}
                        value={post_desc}
                        className="bg-zinc-100 w-full focus-visible:outline-none"
                        onChange={(e) => setDesc(e.target.value)} />
                    <button onClick={SharePost}>
                        <FaPaperPlane />
                    </button>
                </div>
            </div>
            <div className=" flex justify-between py-4  text-gray-600 border-y">
                <input className="hidden" type="file" id="img" onChange={(e) => e.target.files && setImg(e.target.files[0])} />
                <label htmlFor="img" className="flex items-center gap-1"><TbPhoto className="text-2xl" /> Adicionar Imagem </label>
                <button className="flex items-center gap-1"><FaUserFriends className="text-2xl" /> Marcar Amigo</button>
            </div>
        </div>
    );
}

export default Share;