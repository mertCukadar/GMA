import React, { useState, useEffect } from "react";
import { Alert, StyleSheet, Text, TextInput, View } from 'react-native';

const TestScreen = ({ navigation }) => {
  const [expectedText, setExpectedText] = useState("Atak Helikopter");
  const [actualText, setActualText] = useState("");
  const [time, setTime] = useState(0);
  const [timerStarted, setTimerStarted] = useState(false);

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

    if (!timerStarted && value !== "") {
      // Kullanıcı ilk kez yazmaya başladığında ve actualText boş değilse timer'ı başlat
      setTimerStarted(true);
    }

    if (value === expectedText) {
      Alert.alert("Congratulations! Time: " + time + " seconds");
      setTime(0); 
      setActualText("");
      setTimerStarted(false); // Yazma işlemi tamamlandığında timer'ı sıfırla
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
