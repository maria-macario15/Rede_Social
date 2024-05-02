import Post from "./Post"

const posts =[{
    id:1,
    post_desc:"teste",
    img:"",
    username:"user",
    user_img:"",

},{
    id:2,
    post_desc:"teste2",
    img:"",
    username:"user",
    user_img:"",
}]
function Feed(){
    return (
        <div className="flex flex-col items-center gap-5">
            {posts.map((post,id)=>{
                return <Post post={post} key={id} />
            })}

        </div>

    );
}
export default Feed;