import React, { useContext, useState } from "react";
import { FaPaperPlane, FaUserFriends } from "react-icons/fa";
import { TbPhoto } from "react-icons/tb";
import { useUserContext } from "../context/UserContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function Share() {
    const { user } = useContext(useUserContext);
    const [post_desc, setDesc] = useState("");
    const [postImg, setPostImg] = useState('');
    const [img, setImg] = useState(null); // Removi a notação de tipo para 'img'

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (newPost) => {
            const formData = new FormData();
            formData.append('post_desc', newPost.post_desc);
            formData.append('img', newPost.img);
            formData.append('userId', String(newPost.userId));

            const response = await fetch("api/post", {
                method: "POST",
                body: formData
            });

            if (!response.ok) {
                throw new Error("Failed to create post");
            }

            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries("posts");
        },
    });

    const userImgSrc = user?.user_img ?? "https://img.freepik.com/free-icon/user_318-159711.jpg";

    const upload = async () => {
        if (!img) return "";

        try {
            const formData = new FormData();
            formData.append('file', img);

            const response = await fetch("api/upload", {
                method: "POST",
                body: formData
            });

            if (!response.ok) {
                throw new Error("Failed to upload image");
            }

            const data = await response.json();
            return data.url;
        } catch (error) {
            console.error("Error uploading image:", error);
            return "";
        }
    };

    const SharePost = async () => {
        try {
            let imgurl = "";
            if (img) {
                imgurl = await upload();
            }

            await mutation.mutateAsync({ post_desc, img: imgurl, userId: user?.id });
            setDesc('');
            setImg(null);
        } catch (error) {
            console.error("Error sharing post:", error);
        }
    };

    const handleDescChange = (e) => { // Removi a notação de tipo para 'e'
        setDesc(e.target.value);
    };

    const handleFileChange = (e) => { // Removi a notação de tipo para 'e'
        if (e.target.files) {
            setImg(e.target.files[0]);
            setPostImg(URL.createObjectURL(e.target.files[0]));
        }
    };

    return (
        <div className="w-1/3 bg-white rounded-lg p-4 shadow-md flex flex-col gap-3">
            {img && <img className="rounded-lg" src={postImg} alt="imagem do post" />}
            <div className="flex gap-4 pt-6">
                <img src={userImgSrc} alt="imagem do perfil" className="w-8 h-8 rounded-full" />
                <div className="w-full bg-zinc-100 items-center text-gray-600 px-3 py-1 rounded-full">
                    <input
                        type="text"
                        placeholder={`No que você está pensando, ${user?.username}?`}
                        value={post_desc}
                        className="bg-zinc-100 w-full focus-visible:outline-none"
                        onChange={handleDescChange}
                    />
                    <button onClick={SharePost}>
                        <FaPaperPlane />
                    </button>
                </div>
            </div>
            <div className="flex justify-between py-4  text-gray-600 border-y">
                <input className="hidden" type="file" id="img" onChange={handleFileChange} />
                <label htmlFor="img" className="flex items-center gap-1">
                    <TbPhoto className="text-2xl" /> Adicionar Imagem
                </label>
                <button className="flex items-center gap-1">
                    <FaUserFriends className="text-2xl" /> Marcar Amigo
                </button>
            </div>
        </div>
    );
}

export default Share;
