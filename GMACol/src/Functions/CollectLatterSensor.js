// useCollectLatterSensor.js
import { useEffect } from 'react';
import { Accelerometer } from 'expo-sensors';

export function useCollectLatterSensor(callback) {
  useEffect(() => {
    const setData = (accelerometerData) => {
      // Handle the accelerometer data as needed
      callback(accelerometerData);
    };

    Accelerometer.setUpdateInterval(16);
    const subscription = Accelerometer.addListener(setData);

    return () => {
      // Cleanup function
      subscription.remove();
    };
  }, [callback]);
}
