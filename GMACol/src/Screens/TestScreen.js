import React, { useState, useEffect } from "react";
import { Alert, StyleSheet, Text, TextInput, View } from 'react-native';
import { useCollectLatterSensor } from "../Functions/CollectLatterSensor";

const TestScreen = ({ navigation }) => {
  const [expectedText, setExpectedText] = useState("Atak Helikopter");
  const [actualText, setActualText] = useState("");
  const [time, setTime] = useState(0);
  const [timerStarted, setTimerStarted] = useState(false);
  const [accelerometerDataList, setAccelerometerDataList] = useState([]);
  const [sampleData , setSampleData] = useState([]);

  let count = 0;
  let letter_count = 0;
  

  handleAccelerometerData = (accelerometerData) => {
      const { x, y, z } = accelerometerData;
    
      setSampleData(sampleData => [...sampleData, accelerometerData]);
  

      setAccelerometerDataList(sampleData)
  }; 
  useCollectLatterSensor(handleAccelerometerData);

  

  useEffect(() => {
    let timer;

    if (timerStarted) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }

    // Cleanup the interval when the component is unmounted
    return () => clearInterval(timer);
  }, [timerStarted]); // Run effect when timerStarted changes

  const handleInputChange = (value) => {
    setActualText(value);
    
    letter_count = letter_count + accelerometerDataList.length;
    count += 1;
    console.log("mean : " + letter_count/count);
    setSampleData([]);

    if (!timerStarted && value !== "") {
      setTimerStarted(true);
    }

    if (value === expectedText) {
      Alert.alert("Congratulations! Time: " + time + " seconds");
      setTime(0); 
      setActualText("");
      setTimerStarted(false);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.expectedText}>
        <Text>{expectedText}</Text>
      </View>
      <View style={styles.actualText}>
        <TextInput
          placeholder="Enter the text above"
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
