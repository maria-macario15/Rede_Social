/*import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { UserContext } from "../others/UserContext";
import Comments from "../others/coments";

function useLikes(postId, user) {
  const queryClient = useQueryClient();
  const [liked, setLiked] = useState(false);

  const { data: likesData, error: likesError } = useQuery(
    ['likes', postId],
    async () => {
      const response = await fetch(`likes/?likes_post_id=${postId}`);
      const resData = await response.json();
  
      resData.forEach((like) => {
        if (like.likes_user_id === user?.id) {
          setLiked(true);
        }
      });
  
      return resData;
    },
    { enabled: !!postId }
  );
  const likesMutation = useMutation(
    async (newLikes) => {
      if (liked) {
        const deleteLike = async (postId, userId, newLikes) => {
          const response = await fetch(`likes/?likes_post_id=${postId}&likes_user_id=${userId}`, {
              method: 'DELETE',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(newLikes),
          });
      
          if (!response.ok) {
              throw new Error('Failed to delete like');
          }
      
          return response.json();
      };
      
      // Uso da função
      deleteLike(postId, user?.id, newLikes)
          .then(data => {
              console.log('Like deleted:', data);
          })
          .catch(error => {
              console.error('Error:', error);
          });
    }
  });

  const shareLikes = () => {
    likesMutation.mutate({ likes_user_id: user?.id, likes_post_id: postId });
  };

  return { liked, shareLikes, likesError };
}

function useComments(postId, user) {
  const queryClient = useQueryClient();
  const [comment_desc, setComment_desc] = useState('');

  const { data: commentsData, error: commentsError } = useQuery(['comments', postId], () =>
    fetch.get(`comment/?post_id=${postId}`).then((res) => res.data.data),
    { enabled: !!postId }
  );
  const commentsMutation = useMutation(
    async (newComment) => {
        const response = await fetch('comment/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newComment),
        });

        if (!response.ok) {
            throw new Error('Failed to post comment');
        }

        return response.json();
    },
    {
        onSuccess: () => {
            queryClient.invalidateQueries(['comments', postId]);
        },
    }
);
  const shareComment = () => {
    commentsMutation.mutate({ comment_desc, comment_user_id: user?.id, post_id: postId });
    setComment_desc("");
  };

  return { comment_desc, setComment_desc, shareComment, commentsError };
}

function post(props) {
  const { post } = props;
  const { post_desc, img, username, user_img, created_at, id, userId } = post;
  const { user } = useContext(UserContext);

  const { liked, shareLikes, likesError } = useLikes(id, user);
  const { comment_desc, setComment_desc, shareComment, commentsError } = useComments(id, user);

  const userImgSrc = user?.user_img || "https://img.freepik.com/free-icon/user_318-159711.jpg";

  return (
    <div className="post">
      <img src={img} alt={post_desc} />
      <div className="post-details">
        <img src={user_img} alt={username} />
        <div>
          <h2>{username}</h2>
          <p>{post_desc}</p>
          <span>{created_at}</span>
        </div>
        <button onClick={shareLikes}>{liked ? 'Unlike' : 'Like'}</button>
        {likesError && <div>Error loading likes</div>}
        <input
          type="text"
          value={comment_desc}
          onChange={(e) => setComment_desc(e.target.value)}
        />
        <button onClick={shareComment}>Comment</button>
        {commentsError && <div>Error loading comments</div>}
      </div>
    </div>
  );
}*/'use client'
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { FaThumbsUp, FaRegComment, FaPaperPlane } from "react-icons/fa";
import moment from "moment";
import 'moment/locale/pt-br';
import Comments from "../others/coments";
import { UserContext } from "../others/UserContext"; // Importar o contexto do usuário

function Post({ post }) {
    const { post_desc, img, username, user_img, created_at, id, userId } = post;
    const { user } = useContext(UserContext); // Obter o usuário do contexto

    const queryClient = useQueryClient();
    const [comment_desc, setComment_desc] = useState('');
    const [showComments, setShowComments] = useState(false);
    const [liked, setLiked] = useState(false);
    const [showLikes, setShowLikes] = useState(false);

    // Função para realizar requisições GET
    const fetchData = async (url) => {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Erro ao buscar dados');
        }
        return response.json();
    };

    // Função para realizar requisições POST
    const postData = async (url, data) => {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            throw new Error('Erro ao enviar dados');
        }
        return response.json();
    };

    // Função para realizar requisições DELETE
    const deleteData = async (url) => {
        const response = await fetch(url, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Erro ao deletar dados');
        }
        return response.json();
    };

    // likes
    const likesQuery = useQuery({
        queryKey: ['likes', id],
        queryFn: async () => {
            const data = await fetchData(`/api/likes/?likes_post_id=${id}`);
            data.forEach((like) => {
                if (like.likes_user_id === user?.id) {
                    setLiked(true);
                } else {
                    setLiked(false);
                }
            });
            return data;
        },
        enabled: !!id
    });

    if (likesQuery.error) {
        console.debug(likesQuery.error);
    }

    const likesMutation = useMutation({
        mutationFn: async () => {
            if (liked) {
                await deleteData(`/api/likes/?likes_post_id=${id}&likes_user_id=${user?.id}`);
                setLiked(false);
            } else {
                await postData('/api/likes/', { likes_user_id: user?.id, likes_post_id: id });
                setLiked(true);
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["likes", id] });
        },
    });

    const shareLikes = () => {
        likesMutation.mutate();
    };
    const defaultUserUrl = 'https://img.freepik.com/free-icon/user_318-159711.jpg';

    // comentários
    const commentsQuery = useQuery({
        queryKey: ['comments', id],
        queryFn: async () => {
            const data = await fetchData(`/api/comment/?post_id=${id}`);
            return data;
        },
        enabled: !!id
    });

    if (commentsQuery.error) {
        console.debug(commentsQuery.error);
    }

    const commentsMutation = useMutation({
        mutationFn: async (newComment) => {
            await postData('/api/comment/', newComment);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["comments", id] });
        },
    });

    const shareComment = () => {
        commentsMutation.mutate({ comment_desc, comment_user_id: user?.id, post_id: id });
        setComment_desc("");
    };


    return (
        <div className="w-full bg-white rounded-lg p-4 shadow-md">
            <header className="flex gap-2 pb-4 border-2 items-center">
                <a href={'/profile?id=' + userId}>
                    <img className="w-8 h-8 rounded-full user"  src={user.user_img ? user.user_img : defaultUserUrl}
                        alt="imagem do usuario que fez o post" />
                    <div className="flex flex-col">
                        <span className="font-semibold">{username}</span>
                        <span className="text-xs">{moment(created_at).fromNow()}</span>
                    </div>
                </a>
            </header>
            {post_desc && (
                <div className="py-4 w-full">
                    <span>{post_desc}</span>
                </div>
            )}
            {img && <img className="rounded-lg" src={`./upload/${img}`} alt="imagem do post" />}
            <div className="flex justify-between py-4 border-b">
                <div
                    className="relative"
                    onMouseEnter={() => setShowLikes(true)}
                    onMouseLeave={() => setShowLikes(false)}>
                    {likesQuery.data && likesQuery.data.length > 0 && (
                        <>
                            <div className="flex gap-1 items-center">
                                <span className="bg-blue-600 w-6 h-6 text-white flex items-center justify-center rounded-full text-xs">
                                    <FaThumbsUp />
                                </span>
                                <span>{likesQuery.data.length}</span>
                            </div>
                            {showLikes && (
                                <div className="absolute bg-white border flex flex-col p-2 rounded-md top-6">
                                    {likesQuery.data.map((like) => {
                                        return <span key={like.id}>{like.username}</span>;
                                    })}
                                </div>
                            )}
                        </>
                    )}
                </div>
                <button onClick={() => setShowComments(!showComments)}>
                    {commentsQuery.data && commentsQuery.data.length > 0 && `${commentsQuery.data?.length} comentarios`}
                </button>
            </div>
            <div className="flex justify-between py-4 text-gray-600 border-b">
                <button className={`flex items-center gap-1 ${liked ? "text-blue-600" : ""}`} onClick={shareLikes}><FaThumbsUp /> Curtir</button>
                <button className="flex items-center gap-1" onClick={() => document.getElementById("comment" + id)?.focus()}><FaRegComment /> Comentar</button>
            </div>
            {showComments && commentsQuery.data?.map((comment, id) => {
                return <Comments comment={comment} key={id} />;
            })}
            <div className="flex gap-4 pt-6">
            <img  src={user.user_img ? user.user_img : defaultUserUrl} 
                    alt="imagem do perfil"
                    className="w-8 h-8 rounded-full user"
                />
                <div className="w-full bg-zinc-100 items-center text-gray-600 px-3 py-1 rounded-full flex">
                    <input
                        id={"comment" + id}
                        type="text" className="bg-zinc-100 w-full focus-visible:outline-none"
                        value={comment_desc}
                        onChange={(e) => setComment_desc(e.target.value)}
                        placeholder="Comente..." />
                    <button onClick={shareComment}><FaPaperPlane /></button>
                </div>
            </div>
        </div>
    );
}

export default Post;
