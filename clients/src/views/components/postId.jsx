import React from 'react';
import Post from './post';
import Ad from './anuncios';
import './style.css';

const PostList = ({ posts, ads, isLoading }) => {
    const intercalatePostsAndAds = (posts, ads) => {
        const combined = [];
        let postIndex = 0;
        let adIndex = 0;

        while (postIndex < posts.length || adIndex < ads.length) {
            if (postIndex < posts.length) {
                combined.push({ type: 'post', data: posts[postIndex] });
                postIndex++;
            }
            if (adIndex < ads.length) {
                combined.push({ type: 'ad', data: ads[adIndex] });
                adIndex++;
            }
        }

        return combined;
    };

    const combinedContent = intercalatePostsAndAds(posts, ads);

    return (
        <div className="post-list">
            {isLoading ? (
                <span>Carregando...</span>
            ) : (
                combinedContent.map((item, index) => (
                    item.type === 'post' ? (
                        <Post key={item.data.id} post={item.data} />
                    ) : (
                        <Ad key={item.data.id} ad={item.data} />
                    )
                ))
            )}
        </div>
    );
};

export default PostList;
