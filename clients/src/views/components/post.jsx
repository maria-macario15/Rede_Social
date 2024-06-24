import React, { useState } from 'react';
import { useUser } from '../others/UserContext';
import './style.css';

const Post = ({ post }) => {
    const { post_desc, img, username, user_img, created_at } = post;


    const [comment_desc, setComment_desc] = useState('');
    const [showComments, setShowComments] = useState(false);
    const [liked, setLiked] = useState(false);

    const handleLike = () => {
        setLiked(!liked);
    };

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        // Lógica para enviar o comentário
    };
    const defaultUserUrl = 'https://img.freepik.com/free-icon/user_318-159711.jpg';

    return (
        <div className=" post-container">
            <div className="post-header">
            <img className='profile-img' src={user_img > 0 ? user_img : defaultUserUrl} alt="User" />
            <p className='fw-semibold fs-4'>{username}</p>
                <div>
                    <p className="post-date">{created_at}</p>
                </div>
            </div>
            <div className="post-body">
                <p>{post_desc}</p>
                {img && <img src={img} alt="Post" className="post-img" />}
            </div>
            <div className="post-actions">
                <button  onClick={handleLike} className="like-button">
                <i class="bi bi-heart"/>
                    {liked ? ' Descurtir' : ' Curtir'}
                </button>
                <button onClick={() => setShowComments(!showComments)} className="comment-button">
                <i class="bi bi-chat-heart"/>
                    {showComments ? ' Ocultar Comentários ' : ' Comentários'}
                </button>
            </div>
            {showComments && (
                <div className="post-comments">
                    <form onSubmit={handleCommentSubmit} className="comment-form">
                        <input
                            type="text"
                            value={comment_desc}
                            onChange={(e) => setComment_desc(e.target.value)}
                            placeholder="Adicione um comentário..."
                            className="comment-input"
                        />
                        <button type="submit" className="comment-submit">
                        Comentar
                        </button>
                    </form>
                    {/* Renderizar comentários aqui */}
                </div>
            )}
        </div>
    );
};

export default Post;
