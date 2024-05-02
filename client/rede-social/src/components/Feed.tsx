import { useEffect, useState } from "react";
import Post from "./Post"
import { makeRequest } from "../../axios";

interface IPost {
    id: number,
    post_desc: string,
    img: string,
    username: string,
    user_img: string,
    created_at:string

}

function Feed() {
    const [posts, setPosts] = useState<IPost[] | undefined>(undefined)
    useEffect(() => {
        makeRequest.get("post/").then((res) => {
            setPosts(res.data.data);
        }).catch((err) => {
            console.debug(err);

        })

    }, [])

    return (
        <div className="flex flex-col items-center gap-5 w-full">
            {posts?.map((post, id) => {
                return <Post post={post} key={id} />
            })}

        </div>

    );
}
export default Feed;