import { useState, useEffect } from "react";
import Post from "./post";

function Feed() {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch();
                if (!response.ok) {
                    throw new Error(`Erro ao carregar os posts: ${response.status}`);
                }
                const data = await response.json();
                setPosts(data);
                setIsLoading(false);
            } catch (error) {
                console.error("Erro ao buscar os posts:", error.message);
                setError("Erro ao carregar os posts. Tente novamente mais tarde.");
                setIsLoading(false);
            }
        };

        fetchPosts();
    }, []);

    if (error) {
        console.error(error);
    }

    return ( 
        <div className="flex flex-col items-center gap-5 w-full te">
            <h1>d</h1>
            {isLoading ? (
                <span>Carregando...</span>
            ) : (
                <div className="w-full flex flex-col gap-5 items-center te">
                    <h1>2</h1>
                    {posts.map((post) => (
                        <Post key={post.id} post={post} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default Feed;