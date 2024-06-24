import React, { useState } from 'react';

const UploadComponent = ({ onFileSelect }) => {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            setSelectedFile(file);
            onFileSelect(file); // Passa o arquivo selecionado para o componente pai
        } else {
            setSelectedFile(null);
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
            {selectedFile && (
                <p>Arquivo selecionado: {selectedFile.name}</p>
            )}
        </div>
    );
};

export default UploadComponent;