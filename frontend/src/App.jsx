import React, { useState } from 'react';
import Upload from './components/Upload';
import PoseNet from './components/PoseNet';

function App() {
    const [uploadedFile, setUploadedFile] = useState(null);

    const handleUpload = (url) => {
        setUploadedFile(url);
    }

    return (
        <div className='grid-container'>
            <div className='logo'>
                <div className='img'></div>
                <h1>Photo-Cataloger</h1>
            </div>
            <div className='searchbar'></div>
            <div className='account'></div>
            <div className='uploader'>
                {uploadedFile && <PoseNet imageUrl={uploadedFile} />}
                <Upload onUpload={handleUpload} />
            </div>
            <div className='folders-container'></div>
            <div className='footer'></div>
        </div>
    );
}

export default App;
