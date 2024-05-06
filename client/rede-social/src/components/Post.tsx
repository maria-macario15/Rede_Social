import { useContext, useState, } from "react";
import { FaThumbsUp, FaRegComment, FaPaperPlane } from "react-icons/fa";
import moment from "moment";
import 'moment/locale/pt-br';
import { UserContext } from "@/context/UserContext";
import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import Comments from "./Comment";
interface IPost {
    id: number,
    post_desc: string,
    img: string,
    username: string,
    user_img: string,
    created_at: string
}

interface IComments {
    id: number;
    comment_desc: string;
    user_img: string;
    comment_user_id: number;
    username: string;
    post_id: number;
    created_at: string;
}
function Post(props: { post: IPost }) {
    const { post_desc, img, username, user_img, created_at, id } = props.post

    const { user } = useContext(UserContext);
    const queryClient = useQueryClient();

    const [comment_desc, setComment_desc] = useState('');
    const [showComments, setShowComments] = useState(false);

    const { data, error, isLoading } = useQuery<IComments[] | undefined>({
        queryKey: ['comments', id],
        queryFn: () => makeRequest.get('comment/?post_id=' + id).then((res) => {
            return res.data.data;
        }),
        enabled: !!id

    })
    if (error) {
        console.debug(error);
    }

    const mutation = useMutation({
        mutationFn: async (newComment: {}) => {
            await makeRequest.post('comment/', newComment).then((res) => {
                return res.data;
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["comments", id] })


        },
    });

    const shareComment = async () => {
        mutation.mutate({ comment_desc, comment_user_id: user?.id, post_id: id });
        setComment_desc("");

    }
    const userImgSrc = user?.user_img ?? "https://img.freepik.com/free-icon/user_318-159711.jpg";



    return (
        <div className="w-1/3 bg-white wounded-lg p-4 shadow-md">
            <header className="flex gap-2 pb-4 border-2 items-center">
                <img className="w-8 h-8 rounded-full" src={user_img ? user_img : "https://img.freepik.com/free-icon/user_318-159711.jpg"}
                    alt="imagem do usuario que fez o post" />
                <div className="flex flex-col">
                    <span className="font-semibold">{username}</span>
                    <span className="text-xs">{moment(created_at).fromNow()}</span>
                </div>
            </header>
            {post_desc && (
                <div className="py-4 w-full">
                    <span >{post_desc}</span>
                </div>
            )}
            {img && <img className="rounded-lg" src={`./upload/${img}`} alt=" imagem do post" />}
            <div className="flex justify-between py-4 border-b">
                <div className=" flex gap-1 items-center">
                    <span className="bg-blue-600 w6 h-6 text-white flex items-center justify-center rounded-full text-xs"><FaThumbsUp />3</span>
                </div>
                <button onClick={()=>setShowComments(!showComments)}>{data && data.length > 0 ? `${data?.length} comentarios` : ""} </button>
            </div>
            <div className=" flex justify-between py-4  text-gray-600 border-b">
                <button className="flex items-center gap-1"><FaThumbsUp /> Curtir</button>
                <button className="flex items-center gap-1" onClick={()=> document.getElementById("comment"+id)?.focus()}><FaRegComment /> Comentar</button>
            </div>
            {showComments && data?.map((comment,id)=>{
                    return <Comments comment = {comment}key={id}/>
                })}

            <div className="flex gap-4 pt-6">
                <img src={userImgSrc}
                    alt="imagem do perfil"
                    className="w-8 h-8 rounded-full"
                />

               
                <div className="w-full bg-zinc-100 items-center text-gray-600 px-3 py-1 rounded-full">
                    <input
                    id={"comment"+id}
                     type="text" className="bg-zinc-100 w-full focus-visible:outline-none"
                        value={comment_desc}
                        onChange={(e) => setComment_desc(e.target.value)}
                        placeholder="Comente..." />
                    <button onClick={() => shareComment()}><FaPaperPlane /></button>

                </div>
            </div>
        </div>
    );
}
export default Post;