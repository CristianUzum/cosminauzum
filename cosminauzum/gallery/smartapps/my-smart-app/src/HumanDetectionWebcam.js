import React, { useState, useEffect, useRef } from 'react';
import Webcam from 'react-webcam';
import * as tf from '@tensorflow/tfjs';
import * as cocoSsd from '@tensorflow-models/coco-ssd';

const HumanDetectionWebcam = () => {
  const webcamRef = useRef(null);
  const [isHumanDetected, setIsHumanDetected] = useState(false);
  const [model, setModel] = useState(null);

  useEffect(() => {
    const loadModel = async () => {
      const loadedModel = await cocoSsd.load();
      setModel(loadedModel);
    };

    loadModel();
  }, []);

  const detectHumans = async () => {
    if (model && webcamRef.current) {
      const video = webcamRef.current.video;
      const predictions = await model.detect(video);

      const hasHuman = predictions.some(prediction => prediction.class === 'person');
      setIsHumanDetected(hasHuman);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (isHumanDetected) {
        detectHumans();
      }
    }, 1000); // Check for humans every second

    return () => clearInterval(intervalId);
  }, [isHumanDetected]);

  return (
    <div>
      {isHumanDetected ? (
        <Webcam audio={false} ref={webcamRef} />
      ) : (
        <p>No human detected. Webcam is off.</p>
      )}
    </div>
  );
};

export default HumanDetectionWebcam;
