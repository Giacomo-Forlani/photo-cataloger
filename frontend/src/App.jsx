import React, { useState } from 'react';
import Upload from './components/Upload';
import PoseNet from './components/PoseNet';
import logo from './logo.svg';
import ImgAccount from './img/ImgAccount.svg'
import ImgSearch from './img/ImgSearch.svg'
import PhotoViewer from './components/PhotoViewer'

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
            <div className='searchbar'>
                <img src={ImgSearch} alt="searchbar" />
                <input type="text" placeholder='EX: left ear'/>
            </div>
            <div className='account'>
                <img src={ImgAccount} alt="account" />
                <h2>Account</h2>
            </div>
            <Upload onUpload={handleUpload} />
            {uploadedFile && <PoseNet imageUrl={uploadedFile} />}
            <div className='folders-container'>
                <div>
                    <PhotoViewer scoreType="nose_score" minScore={0.5} maxScore={1.0} />
                </div>
                <div>
                    <PhotoViewer scoreType="leftEye_score" minScore={0.5} maxScore={1.0} />
                </div>
            </div>
            <div className='footer'></div>
        </div>
    );
}

export default App;
