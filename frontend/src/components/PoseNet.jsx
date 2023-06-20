import { useEffect, useCallback } from 'react';
import * as posenet from '@tensorflow-models/posenet';
import * as tf from '@tensorflow/tfjs';
import axios from 'axios';

const serverUrl = 'http://127.0.0.1:5000';

const PoseNet = ({ imageUrl }) => {
    const sendPoseData = useCallback(async (pose) => {
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
    }, [imageUrl]);

    useEffect(() => {
        const runPosenet = async () => {
            const net = await posenet.load();

            const img = new Image();
            img.crossOrigin = "anonymous";
            img.src = imageUrl;

            await img.decode();

            const pose = await net.estimateSinglePose(tf.browser.fromPixels(img));
            console.log(pose);

            await sendPoseData(pose);
        }

        runPosenet();
    }, [imageUrl, sendPoseData]);

    return null;
}

export default PoseNet;
