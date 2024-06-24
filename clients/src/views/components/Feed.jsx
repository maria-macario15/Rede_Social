import React, { useState } from 'react';

const PostComponent = ({ post }) => {
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
        setComment_desc('');
    };

    return (
        <div className="post-container">
            <div className="post-header">
                <img src={user_img} alt={username} className="profile-img" />
                <div>
                    <h2>{username}</h2>
                    <p className="post-date">{created_at}</p>
                </div>
            </div>
            <div className="post-body">
                <p>{post_desc}</p>
                {img && <img src={img} alt="Post" className="post-img" />}
            </div>
            <div className="post-actions">
                <button onClick={handleLike} className="bi bi-heart like-button ">
                    {liked ? 'Descurtir' : ''}
                </button>
                <button onClick={() => setShowComments(!showComments)} className="comment-button">
                    {showComments ? 'Ocultar Comentários' : 'Comentários'}
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

export default PostComponent;
