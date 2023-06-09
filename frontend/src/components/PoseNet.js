import React, { useRef, useEffect } from 'react';
import * as posenet from '@tensorflow-models/posenet';
import * as tf from '@tensorflow/tfjs';

const PoseNet = ({ imageUrl }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const runPosenet = async () => {
            const net = await posenet.load();

            const img = new Image();
            img.crossOrigin = "anonymous"; // Aggiungi questa riga
            img.src = imageUrl;
            await img.decode();

            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            canvas.width = img.width;
            canvas.height = img.height;

            const pose = await net.estimateSinglePose(tf.browser.fromPixels(img));
            console.log(pose);
            ctx.drawImage(img, 0, 0);

            pose.keypoints.forEach(keypoint => {
                ctx.beginPath();
                ctx.arc(keypoint.position.x, keypoint.position.y, 10, 0, 2 * Math.PI);
                ctx.fillStyle = 'aqua';
                ctx.fill();
            });
        }
        runPosenet();
    }, [imageUrl]);

    return (
        <canvas ref={canvasRef} style={{height: "400px"}}/>
    );
}

export default PoseNet;
