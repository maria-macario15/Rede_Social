import React, { useContext, useState, useEffect } from "react";
import { FaThumbsUp, FaRegComment, FaPaperPlane } from "react-icons/fa";
import moment from "moment";
import 'moment/locale/pt-br';
import { useUserContext } from "../context/UserContext";
import Comments from "./comments";

function Post(props) {
    const { post_desc, img, username, user_img, created_at, id } = props.post;
    const { user } = useContext(useUserContext);
    const [comment_desc, setComment_desc] = useState('');
    const [showComments, setShowComments] = useState(false);
    const [liked, setLiked] = useState(false);
    const [showLikes, setShowLikes] = useState(false);
    const [likes, setLikes] = useState([]);

    useEffect(() => {
        fetchLikes();
    }, []);

    const fetchLikes = async () => {
        try {
            const response = await fetch(`https://your-api-base-url/likes/?likes_post_id=${id}`);
            if (!response.ok) {
                throw new Error('Failed to fetch likes');
            }
            const data = await response.json();
            setLikes(data.data);
            const hasLiked = data.data.some(like => like.likes_user_id === user?.id);
            setLiked(hasLiked);
        } catch (error) {
            console.error('Error fetching likes:', error);
        }
    };

    const handleLike = async () => {
        try {
            if (liked) {
                const response = await fetch(`https://your-api-base-url/likes/?likes_post_id=${id}&likes_user_id=${user?.id}`, {
                    method: 'DELETE'
                });
                if (!response.ok) {
                    throw new Error('Failed to unlike post');
                }
                setLiked(false);
            } else {
                const response = await fetch(`https://your-api-base-url/likes/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ likes_user_id: user?.id, likes_post_id: id })
                });
                if (!response.ok) {
                    throw new Error('Failed to like post');
                }
                setLiked(true);
            }
            // Atualizar os likes após a mutação
            fetchLikes();
        } catch (error) {
            console.error('Error mutating likes:', error);
        }
    };

    const handleComment = async () => {
        try {
            const response = await fetch(`https://your-api-base-url/comment/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ comment_desc, comment_user_id: user?.id, post_id: id })
            });
            if (!response.ok) {
                throw new Error('Failed to post comment');
            }
            setComment_desc('');
            // Atualizar os comentários após a mutação
            fetchComments();
        } catch (error) {
            console.error('Error posting comment:', error);
        }
    };

    const [comments, setComments] = useState([]);

    useEffect(() => {
        fetchComments();
    }, []);

    const fetchComments = async () => {
        try {
            const response = await fetch(`https://your-api-base-url/comment/?post_id=${id}`);
            if (!response.ok) {
                throw new Error('Failed to fetch comments');
            }
            const data = await response.json();
            setComments(data.data);
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };

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
                <div
                    className="relative"
                    onMouseEnter={() => setShowLikes(true)}
                    onMouseLeave={() => setShowLikes(false)}>
                    {likes.length > 0 && (
                        <>
                            <div className=" flex gap-1 items-center">
                                <span className="bg-blue-600 w-6 h-6 text-white flex items-center justify-center rounded-full text-xs">
                                    <FaThumbsUp /></span>
                                <span>{likes.length}</span>
                            </div>
                            {showLikes && (
                                <div className="absolute bg-white border flex flex-col p-2 rounded-md top-6">
                                    {likes.map((like) => (
                                        <span key={like.id}>{like.username}</span>
                                    ))}
                                </div>
                            )}
                        </>
                    )}
                </div>
                <button onClick={() => setShowComments(!showComments)}>
                    {comments.length > 0 ? `${comments.length} comentários` : 'Ver comentários'}
                </button>
            </div>
            <div className=" flex justify-between py-4  text-gray-600 border-b">
                <button className={`flex items-center gap-1 ${liked ? "text-blue-600" : ""}`} onClick={handleLike}>
                    <FaThumbsUp /> Curtir
                </button>
                <button className="flex items-center gap-1" onClick={() => document.getElementById("comment" + id)?.focus()}>
                    <FaRegComment /> Comentar
                </button>
            </div>
            {showComments && comments.map((comment, index) => (
                <Comments key={index} comment={comment} />
            ))}
            <div className="flex gap-4 pt-6">
                <img src={userImgSrc} alt="imagem do perfil" className="w-8 h-8 rounded-full" />
                <div className="w-full bg-zinc-100 items-center text-gray-600 px-3 py-1 rounded-full">
                    <input
                        id={"comment" + id}
                        type="text"
                        className="bg-zinc-100 w-full focus-visible:outline-none"
                        value={comment_desc}
                        onChange={(e) => setComment_desc(e.target.value)}
                        placeholder="Comente..."
                    />
                    <button onClick={handleComment}><FaPaperPlane /></button>
                </div>
            </div>
        </div>
    );
}

export default Post;
