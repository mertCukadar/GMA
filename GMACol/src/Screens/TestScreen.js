import React, { useState, useEffect } from "react";
import { Alert, StyleSheet, Text, TextInput, View } from 'react-native';
import { Gyroscope } from "expo-sensors";
import { Accelerometer } from "expo-sensors";
import * as Progress from 'react-native-progress';

const TestScreen = ({ navigation }) => {
  const keyboardLatters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const [selectedLatters , setSelectedLatters] = useState([]);

  const [expectedText, setExpectedText] = useState("A");
  const [actualText, setActualText] = useState("");
  const [timerStarted, setTimerStarted] = useState(false);
  const [progress, setProgress] = useState(0.5);
  const [enteredText, setEnteredText] = useState("");


  const [accelerometerDataList, setAccelerometerDataList] = useState([]);
  const [gyroscopeDataList, setGyroscopeDataList] = useState([]);
  const [sensorsAvailable, setSensorsAvailable] = useState(true);





  useEffect(() => {
    let isMounted = true;
  
    // Set progress bar respect to DataListLength
    const updateProgressBar = () => {
      if (isMounted) {
        setProgress(accelerometerDataList.length / 50);
  
        if (accelerometerDataList.length > 50) {
          cleanData();
        }
      }
    };
  
    updateProgressBar(); // Call the function initially
  
    // Cleanup function to set isMounted to false when the component is unmounted
    return () => {
      isMounted = false;
    };
  }, [accelerometerDataList]); // Add accelerometerDataList to the dependency array
  
  
  
  useEffect(() => {
    let isMounted = true;
  
    const setupSensors = async () => {
      try {
        const accelerometerAvailable = await Accelerometer.isAvailableAsync();
        const gyroscopeAvailable = await Gyroscope.isAvailableAsync();
  
        if (isMounted && accelerometerAvailable) {
          const accelerometerSubscription = Accelerometer.addListener(
            (accelerometerData) => {
              setAccelerometerDataList((prevData) => [...prevData, accelerometerData]);
            },
            { intervalMs: 20 } // Set a larger interval, adjust as needed
          );
        }
  
        if (isMounted && gyroscopeAvailable) {
          const gyroscopeSubscription = Gyroscope.addListener(
            (gyroscopeData) => {
              setGyroscopeDataList((prevData) => [...prevData, gyroscopeData]);
            },
            { intervalMs: 20 } // Set a larger interval, adjust as needed
          );
        }
      } catch (error) {
        console.error("Error setting up sensors:", error);
      }
    };
  
    setupSensors();
  
    return () => {
      isMounted = false;
    };
  }, []); // Dependency array is empty, so it runs only once on mount
  
  


  

  const randomLetterSelector = () => {
    const randomLetter = keyboardLatters.charAt(
      Math.floor(Math.random() * keyboardLatters.length)      
    );
    if (randomLetter in selectedLatters){
      randomLetterSelector();
    }else{
      setSelectedLatters([...selectedLatters, randomLetter]);
      setExpectedText(randomLetter);
    }
    if (selectedLatters.length === 26){
      setSelectedLatters([]);
    }
    return randomLetter;
    
  }

  const cleanData = () => {
    setAccelerometerDataList([]);
    setGyroscopeDataList([]);
  }

  const handleInputChange = (value) => {
    setActualText(value);

    if (!timerStarted && value !== "") {
      setTimerStarted(true);
      setExpectedText(randomLetterSelector());
    }

    if (value === expectedText) {
      setActualText("");
      setExpectedText(randomLetterSelector());
    }else{
      setActualText("");
    }



   
 
  }

  return (
    <View style={styles.container}>
      <Progress.Bar progress={progress} width={200} />
      <View style={styles.expectedText}>
        <Text>{expectedText}</Text>
      </View>
      <View style={styles.actualText}>
        <TextInput
          placeholder="Enter the Latter above"
          style={styles.actualInput}
          value={actualText}
          onChangeText={(value) => handleInputChange(value)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actualInput: {
    height: 40,
    width: 200,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    textAlign: 'center',
  },
  expectedText: {
    backgroundColor: 'orange',
    width: 230,
    height: 50,
    borderRadius: 10,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default TestScreen;
