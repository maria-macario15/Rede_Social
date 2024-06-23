import './feedback.css'
import React, { useState } from 'react';

function Feedback() {
    const [selectedRating, setSelectedRating] = useState('Ameii');

    const handleRatingClick = (rating) => {
        setSelectedRating(rating);
    };

    const handleSendFeedback = () => {
        // Aqui você pode implementar a lógica para enviar o feedback
        console.log(`Feedback enviado: ${selectedRating}`);
    };

    return (
        <div className="feedback-container">
            <h1>Agora que você conhece nosso trabalho<br/> Poderia nos avaliar? </h1> 
            <div className="ratings-container" onClick={(e) => handleRatingClick(e.target.textContent)}>
                <div className={`rating ${selectedRating === 'Insatisfeita' ? 'active' : ''}`}>
                    <i className="bi bi-emoji-frown"></i>
                    <p>Insatisfeita</p>
                </div>
                <div className={`rating ${selectedRating === 'Neutra' ? 'active' : ''}`}>
                    <i className="bi bi-emoji-neutral"></i>
                    <p>Neutra</p>
                </div>
                <div className={`rating ${selectedRating === 'Ameii' ? 'active' : ''}`}>
                    <i className="bi bi-emoji-heart-eyes"></i>
                    <p>Ameii</p>
                </div>
            </div>

            <button className="btn" id="send" onClick={handleSendFeedback}>Enviar</button>
            
            <div id="feedback">
                <i className="fas fa-heart"></i>
                <h2>Muito Obrigada!</h2>
                <br/>
                <strong>Feedback: {selectedRating}</strong>
            </div>
        </div>
    );
}




 export default Feedback