import React, { useState } from 'react';
import Upload from './components/Upload';
import PoseNet from './components/PoseNet';

function App() {
    const [uploadedFile, setUploadedFile] = useState(null);

    const handleUpload = (url) => {
        setUploadedFile(url);
    }

    return (
        <div className="App">
            <Upload onUpload={handleUpload} />
            {uploadedFile && <PoseNet imageUrl={uploadedFile} />}
        </div>
    );
}

export default App;
