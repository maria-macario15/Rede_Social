import React, { useState } from 'react';

const UploadComponent = ({ onFileSelect }) => {
    const [img, setImg] = useState('');

    const handleFileChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            setImg(file);
            onFileSelect(file); // Passa o arquivo selecionado para o componente pai
        } else {
            setImg(null);
        }
    };

    return (
        <div>
            <input
                type="file"
                id="fileInput"
                style={{ display: 'none' }}
                onChange={handleFileChange}
            />
            <button onClick={() => document.getElementById('fileInput').click()}>
                Escolha sua foto
            </button>
            {img && (
                <p>Arquivo selecionado: {img.name}</p>
            )}
        </div>
    );
};

export default UploadComponent;