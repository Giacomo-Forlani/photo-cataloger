import React, { useState } from 'react';
import axios from 'axios';
import imgPlaceholder from '../img/imgPlaceholder.svg'

const serverUrl = 'http://127.0.0.1:5000'; // l'URL del server Flask

const Upload = ({ onUpload }) => {
    const [file, setFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
        setPreviewUrl(URL.createObjectURL(event.target.files[0]));
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('image', file);

        const response = await axios.post(`${serverUrl}/upload`, formData);
        // aggiunge l'URL del server Flask alla URL ritornata
        const uploadedUrl = serverUrl + response.data.url;
        onUpload(uploadedUrl);
    }

    return (
        <form className='uploader' onSubmit={handleSubmit}>
            <div className='img-container'>
                <img className='img-placeholder' src={imgPlaceholder} alt="image Placeholder" />
                {previewUrl && <img className='img-preview' src={previewUrl} alt="Preview"/>}
            </div>
            <div className='buttons'>
                <input type="file" onChange={handleFileChange} />
                <button type="submit">Upload</button>
            </div>
        </form>
    );
}

export default Upload;
