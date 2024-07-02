import React, { useState, useEffect } from "react";
import Post from "./Post";
import Share from "./share";

function Feed() {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch("https://example.com/api/posts");
                if (!response.ok) {
                    throw new Error("Erro ao carregar os posts");
                }
                const data = await response.json();
                setPosts(data);
                setIsLoading(false);
            } catch (error) {
                setError(error.message);
                setIsLoading(false);
            }
        };

        fetchPosts();
    }, []);

    if (isLoading) {
        return <span>Carregando...</span>;
    }

    if (error) {
        console.debug(error);
        return <span>Ocorreu um erro ao carregar os posts.</span>;
    }

    return (
        <div className="flex flex-col items-center gap-5 w-full">
            <Share />
            <div className="w-full flex flex-col gap-5 items-center">
                {posts.map((post, index) => (
                    <Post key={index} post={post} />
                ))}
            </div>
        </div>
    );
}

export default Feed;
