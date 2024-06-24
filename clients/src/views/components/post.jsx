import React, { useEffect, useState } from 'react';
import { UserProvider } from '../others/UserContext';
import './style.css';
import meca from '../../imgs/Meca.jpg';
import jp from '../../imgs/J-P.jpg';
import NoPre from '../../imgs/NoPre.jpeg';
import PostComponent from './Feed';
import AdComponent from './anuncios';
import logo from '../../imgs/logo.png'


const Post = () => {
    const [combinedItems, setCombinedItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simular chamada à API para posts e anúncios
        setTimeout(() => {
           
            const ads = [
                {
                    id: 1,
                    type: 'ad',
                    ad_desc: 'Descubra o melhor para seu pet! Com o nosso mapa online, encontrar pet shops, groomers e veterinários nunca foi tão fácil. Explore agora e ofereça o melhor cuidado para seu companheiro peludo',
                    img: jp,
                    company_name: 'J-Pets',
                    created_at: '2024-06-24',
                },
                {
                    id: 2,
                    type: 'ad',
                    ad_desc: 'Gerencie suas notas com facilidade na sua oficina mecânica! Conheça MECANICONTROL e simplifique seu dia a dia.',
                    img: meca,
                    company_name: 'MECANICONTROL',
                    created_at: '2024-06-24',
                },
                {
                    id: 3,
                    type: 'ad',
                    ad_desc: 'NoPrecinho, os melhores preços são aqui',
                    img: NoPre,
                    company_name: 'NoPrecinho',
                    created_at: '2024-06-24',
                },
            ];
             const posts = [
                {
                    id: '3',
                    type: 'post',
                    post_desc:'Boa noite, pessoal!!',
                     img: '',
                    username: 'Taruíra',
                    user_img:logo,
                    created_at: '2024-06-24',
                },
                {
                    id: 2,
                    type: 'post',
                    post_desc: 'Aqui está outro post.',
                    img: meca,
                    username: 'usuario2',
                    user_img: meca,
                    created_at: '2024-06-23',
                },
            ];

            // Intercalando posts e anúncios
            const combined = [];
            const maxLength = Math.max(posts.length, ads.length);
            for (let i = 0; i < maxLength; i++) {
                if (i < posts.length) combined.push(posts[i]);
                if (i < ads.length) combined.push(ads[i]);
            }

            setCombinedItems(combined);
            setIsLoading(false);
        }, 1000);
    }, []);

    return (
        <UserProvider>
            <div className="app-container">
                {isLoading ? (
                    <span className="loading">Carregando...</span>
                ) : (
                    <div className="content-container">
                        {combinedItems.map(item => (
                            item.type === 'post' ? (
                                <PostComponent key={item.id} post={item} />
                            ) : (
                                <AdComponent key={item.id} ad={item} />
                            )
                        ))}
                    </div>
                )}
            </div>
        </UserProvider>
    );
};

export default Post;
