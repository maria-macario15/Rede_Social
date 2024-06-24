import React from "react";
import moment from "moment";
import "moment/locale/pt-br";
/*id, post_desc,
img,
username,
user_img,
created_at,
userId
*/
function Comments(props) {
    const { comment_desc, user_img, username, created_at } = props.comment;
    return (
        <div className="mt-6 flex gap-2">
            <img
                className="w-8 h-8 rounded-full"
                src={user_img ? user_img : "https://img.freepik.com/free-icon/user_318-159711.jpg"}
                alt="imagem do usuario que fez o comentario"
            />
            <div className="text-zinc-600 w-full">
                <div className="flex flex-col bg-zinc-100 px-4 py-1 rounded-md">
                    <span className="font font-semibold">{username}</span>
                    <span>{comment_desc}</span>
                </div>
                <span className="text-xs">{moment(created_at).fromNow()}</span>
            </div>
        </div>
    );
}

export default Comments;
