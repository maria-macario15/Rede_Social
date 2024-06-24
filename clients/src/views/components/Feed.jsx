import { useState, useEffect } from "react";
import Post from "./post";
import PostList from './postId';
import { UserProvider } from '../others/UserContext';
import An from "./anuncios";
const Feed = () => {
    const [posts, setPosts] = useState([]);
    const [An, setAn] = useState([]);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        // Simular chamada à API para posts e anúncios
        setTimeout(() => {
            setPosts([
                {
                    id: '',
                    post_desc: '',
                    img: '',
                    username: '',
                    user_img: '',
                    created_at: '',
                },
                {
                    id: '',
                    post_desc: '',
                    img: '',
                    username: '',
                    user_img: '',
                    created_at: '',
                },
            ]);
            setAn([
                {
                    id: '',
                    ad_desc: '',
                    img: '',
                    company_name: '',
                    created_at: '',
                },
            ]);
            setIsLoading(false);
        }, 1000);
    }, []);

    return (
        <UserProvider>
            <div className=" app-container">
   
                <PostList posts={posts} ads={An} isLoading={isLoading} />
            </div>
        </UserProvider>
    );
};



export default Feed;