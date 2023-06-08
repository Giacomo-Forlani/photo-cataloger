import React, { useState } from 'react';
import axios from 'axios';

const serverUrl = 'http://127.0.0.1:5000'; // l'URL del server Flask

const ImageUpload = () => {
    const [file, setFile] = useState(null);
    const [uploadedFile, setUploadedFile] = useState(null);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('image', file);

        const response = await axios.post(`${serverUrl}/upload`, formData);
        // aggiunge l'URL del server Flask alla URL ritornata
        setUploadedFile(serverUrl + response.data.url);
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="file" onChange={handleFileChange} />
            <button type="submit">Upload</button>
            {uploadedFile && <img src={uploadedFile} alt="Uploaded" style={{height: "400px"}}/>}
        </form>
    );
}

export default ImageUpload;
