import React, { useState, useEffect , useContext} from "react";
import { Alert, StyleSheet, Text, TextInput, View } from 'react-native';
import { Gyroscope } from "expo-sensors";
import { Accelerometer } from "expo-sensors";
import { AxiosContext } from "../Context/AxiosContext";

const TestScreen = ({ navigation }) => {
  const keyboardLatters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const [selectedLatters , setSelectedLatters] = useState([]);

  const [expectedText, setExpectedText] = useState("A");
  const [actualText, setActualText] = useState("");


  const [accelerometerData , setAccelerometerData] = useState({ x: 0, y: 0, z: 0 });
  const [gyroscopeData , setGyroscopeData] = useState({ x: 0, y: 0, z: 0 });

  const { sendData , UserId} = useContext(AxiosContext);

  const [data , setData] = useState([]);

  let jsonData = {
    UserID : 0,
    latter: "",
    accelX: 0,
    accelY: 0,
    accelZ: 0,
    gyroX: 0,
    gyroY: 0,
    gyroZ: 0,
  };


  useEffect(() => {
  let isMounted = true;

  setInterval(() => {
    Accelerometer.setUpdateInterval(100);
    Gyroscope.setUpdateInterval(100);
    const startAccelerometerListener = async () => {
      try {
        
        const accelerometerAvailable = await Accelerometer.isAvailableAsync();
        if (isMounted && accelerometerAvailable) {
          const accelerometerSubscription = Accelerometer.addListener(
            (accelerometerData) => {
              setAccelerometerData(accelerometerData);
            },
          );
        }

        const gyroscopeAvailable = await Gyroscope.isAvailableAsync();
        if (isMounted && gyroscopeAvailable) {
          const gyroscopeSubscription = Gyroscope.addListener((gyroscopeData) => {
            setGyroscopeData(gyroscopeData);
          });
        }

      } catch (error) {
        console.error('Error starting accelerometer listener:', error);
      }
    };

    startAccelerometerListener();
  }, 1000);
  

  return () => {
    isMounted = false;
  };
}, []);


  // CORRECT THE FUNCTION
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
      postData(data);
      setData([]);
      Alert.alert("Test is finished");
    }
    return randomLetter;
    
  }



  const handleInputChange = (value) => {
    if(value === expectedText){
      jsonData.UserID = UserId;
      jsonData.latter = value;
      jsonData.accelX = accelerometerData.x;
      jsonData.accelY = accelerometerData.y;
      jsonData.accelZ = accelerometerData.z;
      jsonData.gyroX = gyroscopeData.x;
      jsonData.gyroY = gyroscopeData.y;
      jsonData.gyroZ = gyroscopeData.z;
      setData([...data, jsonData]);
      randomLetterSelector();
  
    }
    else{
      setActualText("");
    }
  }

  const postData = (data) => {
    sendData("data/", data);
  }

  return (
    <View style={styles.container}>
      <Text>Accelerometer</Text>
      <View style={styles.expectedText}>
        <Text>x:{accelerometerData.x}</Text>
        <Text>y:{accelerometerData.y}</Text>
        <Text>z:{accelerometerData.z}</Text>
      </View>
      <Text>Gyroscope</Text>
      <View style={styles.expectedText}>
        <Text>x:{gyroscopeData.x}</Text>
        <Text>y:{gyroscopeData.y}</Text>
        <Text>z:{gyroscopeData.z}</Text>
      </View>
      <Text>Expected Text</Text>
      <View style={styles.expectedTextt}>
        <Text style = {{fontSize : 34 , color:"white"}}>{expectedText}</Text>
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
    height: 80,
    padding : 10,
    borderRadius: 10,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  expectedTextt: {
    backgroundColor: 'orange',
    width: 80,
    height: 80,
    padding : 10,
    borderRadius: 10,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default TestScreen;
