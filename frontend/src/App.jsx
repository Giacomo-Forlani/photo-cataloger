import React, { useState } from 'react';
import Upload from './components/Upload';
import PoseNet from './components/PoseNet';
import logo from './logo.svg';
import ImgAccount from './img/ImgAccount.svg'
import ImgSearch from './img/ImgSearch.svg'
import PhotoViewer from './components/PhotoViewer'
import JuraBoldWoff from './font/Jura-Bold.woff'

function App() {
    const [uploadedFile, setUploadedFile] = useState(null);
    const [uploadCount, setUploadCount] = useState(0);

    const handleUpload = (url) => {
        setUploadedFile(url);
    }

    const handleSuccessfulUpload = () => {
        setUploadCount(uploadCount + 1);
    }

    return (
        <div className='grid-container'>
            <div className='logo-container'>
                <img src={logo} alt="logo" />
                <h1>###</h1>
            </div>
            <div className='searchbar'>
                <img src={ImgSearch} alt="searchbar" />
                <input type="text" placeholder='EX: left ear'/>
            </div>
            <div className='account'>
                <img src={ImgAccount} alt="account" />
                <h2>Account</h2>
            </div>
            <Upload onUpload={handleUpload} onSuccessfulUpload={handleSuccessfulUpload} />
            {uploadedFile && <PoseNet imageUrl={uploadedFile} />}
            <div className='folders-container'>
                {['nose', 'leftEye', 'rightEye', 'leftEar', 'rightEar', 'leftShoulder', 'rightShoulder', 'leftElbow', 'rightElbow', 'leftWrist', 'rightWrist', 'leftHip', 'rightHip', 'leftKnee', 'rightKnee', 'leftAnkle', 'rightAnkle'].map(part => (
                    <div key={part}>
                        <PhotoViewer uploadCount={uploadCount} scoreType={`${part}_score`} minScore={0.5} maxScore={1.0} />
                    </div>
                ))}
            </div>
            <div className='footer'></div>
        </div>
    );
}

export default App;
