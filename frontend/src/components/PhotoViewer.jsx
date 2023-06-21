import React, { useEffect, useState } from 'react';
import axios from 'axios';

function PhotoViewer({ scoreType, minScore, maxScore, uploadCount }) {
  const [images, setImages] = useState([]);

  useEffect(() => {
    axios.get(`http://127.0.0.1:5000/get-images/${scoreType}/${minScore}/${maxScore}`)
      .then(res => {
        setImages(res.data);
      })
      .catch(err => {
        console.error(err);
      });
  }, [scoreType, minScore, maxScore, uploadCount]);

  return (
    <div>
      {images.image_urls && images.image_urls.map((image, index) => (
        <img key={index} src={image} alt={`Pose ${index}`} />
      ))}
    </div>
  );
}

export default PhotoViewer;
