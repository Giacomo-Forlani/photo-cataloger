import React, { useRef, useEffect } from 'react';  // Assicurati di importare useRef ed useEffect da React
import * as posenet from '@tensorflow-models/posenet';  // Assicurati che '@tensorflow-models/posenet' sia correttamente installato
import * as tf from '@tensorflow/tfjs';  // Assicurati che '@tensorflow/tfjs' sia correttamente installato
import axios from 'axios';
const serverUrl = 'http://127.0.0.1:5000'; // l'URL del server Flask

// Modifica il componente PoseNet come segue:
const PoseNet = ({ imageUrl }) => {
    const canvasRef = useRef(null);

    // Aggiungi questa funzione per inviare i dati della posa al server
    const sendPoseData = async (pose) => {
        const poseData = {
            image_url: imageUrl,
            nose_score: pose.keypoints[0].score,
            leftEye_score: pose.keypoints[1].score,
            rightEye_score: pose.keypoints[2].score,
            leftEar_score: pose.keypoints[3].score,
            rightEar_score: pose.keypoints[4].score,
            leftShoulder_score: pose.keypoints[5].score,
            rightShoulder_score: pose.keypoints[6].score,
            leftElbow_score: pose.keypoints[7].score,
            rightElbow_score: pose.keypoints[8].score,
            leftWrist_score: pose.keypoints[9].score,
            rightWrist_score: pose.keypoints[10].score,
            leftHip_score: pose.keypoints[11].score,
            rightHip_score: pose.keypoints[12].score,
            leftKnee_score: pose.keypoints[13].score,
            rightKnee_score: pose.keypoints[14].score,
            leftAnkle_score: pose.keypoints[15].score,
            rightAnkle_score: pose.keypoints[16].score
        };        

        try {
            await axios.post(`${serverUrl}/save-pose`, poseData);
        } catch (error) {
            console.error('Failed to save pose data:', error);
        }
    }

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

            // Invia i dati della posa al server
            await sendPoseData(pose);
        }

        runPosenet();
    }, [imageUrl]);

    return (
        <canvas ref={canvasRef} style={{height: "400px"}}/>
    );
}

export default PoseNet;
