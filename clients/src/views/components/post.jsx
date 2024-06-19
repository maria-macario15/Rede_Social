/*/import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { UserContext } from "../others/UserContext";


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

function Feed(props) {
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
}

export default Feed;
/** */