import React, { useState } from 'react';
import Upload from './components/Upload';
import PoseNet from './components/PoseNet';
import logo from './logo.svg';
import imgPlaceholder from './img/imgPlaceholder.svg'

function App() {
    const [uploadedFile, setUploadedFile] = useState(null);

    const handleUpload = (url) => {
        setUploadedFile(url);
    }

    return (
        <div className='grid-container'>
            <div className='logo-container'>
                <img src={logo} alt="logo" />
                <h1>Photo-Cataloger</h1>
            </div>
            <div className='searchbar'></div>
            <div className='account'></div>
            <div className='uploader'>
                <div className='img-container'>
                    <div className='img-placeholder'>
                        <img className='imgPlaceholder' src={imgPlaceholder} alt="" />
                        {uploadedFile && <PoseNet imageUrl={uploadedFile} />}
                    </div>
                </div>
                <div className='uploader-button'>
                    <Upload onUpload={handleUpload} />
                </div>
            </div>
            <div className='folders-container'></div>
            <div className='footer'></div>
        </div>
    );
}

export default App;
