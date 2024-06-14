
const Post = ({ id, post_desc, img, username, user_img, created_at, userId }) => {
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
        </div>
      </div>
    );
  };




/*import { useContext, useState, } from "react";
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
    created_at: string,
    userId: number
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
interface ILikes {
    id: number;
    likes_user_id: number;
    username: string;
    likes_post_id: number;
}

function Feed(props) {
    const { post } = props;
    const { post_desc, img, username, user_img, created_at, id, userId } = props.post
    const { user } = useContext(UserContext);
    const queryClient = useQueryClient();
    const [comment_desc, setComment_desc] = useState('');
    const [showComments, setShowComments] = useState(false);
    const [liked, setLiked] = useState(false);
    const [showlikes, setShowLikes] = useState(false);
    //likes
    const likesQuery = useQuery<ILikes[] | undefined>({
        queryKey: ['likes', id],
        queryFn: () => makeRequest.get('likes/?likes_post_id=' + id).then((res) => {
            res.data.data.map((like: ILikes) => {
                if (like.likes_user_id === user?.id) {
                    return setLiked(true);
                } else {
                    setLiked
                }
            })
            return res.data.data;
        }),
        enabled: !!id
    })
    if (likesQuery.error) {
        console.debug(likesQuery.error);
    }
    const likesMutation = useMutation({
        mutationFn: async (newLikes: {}) => {
            if (liked) {
                await makeRequest.delete(`likes/?likes_post_id=${id}&likes_user_id=${user?.id}`, newLikes).then((res) => {
                    setLiked(false)
                    return res.data;
                });
            } else {
                await makeRequest.post('likes/', newLikes).then((res) => {
                    return res.data;
                });
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["likes", id] })
        },
    });
    const shareLikes = async () => {
        likesMutation.mutate({ likes_user_id: user?.id, likes_post_id: id });
    };
    //comentarios
    const commentsQuery = useQuery<IComments[] | undefined>({
        queryKey: ['comments', id],
        queryFn: () => makeRequest.get('comment/?post_id=' + id).then((res) => {
            return res.data.data;
        }),
        enabled: !!id
    })
    if (commentsQuery.error) {
        console.debug(commentsQuery.error);
    }
    const commentsMutation = useMutation({
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
        commentsMutation.mutate({ comment_desc, comment_user_id: user?.id, post_id: id });
        setComment_desc("");
    }
    const userImgSrc = user?.user_img ?? "https://img.freepik.com/free-icon/user_318-159711.jpg";*/