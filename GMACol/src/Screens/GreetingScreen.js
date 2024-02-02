import React, { useState } from "react";
import { Pressable, StyleSheet, TextInput, View } from "react-native";
import { Button, Text } from "react-native";
import SelectDropdown from 'react-native-select-dropdown'

const GreetingScreen = ({ navigation }) => {
  const [inputValues, setInputValues] = useState({
    age: "",
    gender: "",
  });

  const [isFullFilled, setIsFullFilled] = useState(true);

  const handleInputChange = (inputName, value) => {
    setInputValues({
      ...inputValues,
      [inputName]: value,
    });

    setIsFullFilled(inputValues.age !== "" && inputValues.gender !== "");
  };

  const genderOptions = ["Woman", "Man"];

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.ageInput}
          placeholder="Enter your age"
          value={inputValues.age}
          onChangeText={(value) => handleInputChange("age", value)}
        />
        <SelectDropdown
          defaultButtonText="Gender"
          buttonStyle={{ backgroundColor: 'white', borderRadius: 10, width: 200, height: 40, margin: 5, }}
          buttonTextStyle={{ fontSize: 16, color: 'black' }}
          data={genderOptions}
          onSelect={(selectedItem, index) => {
            handleInputChange("gender", selectedItem)
          }}
        />
      </View>

      <Pressable
        disabled={!isFullFilled}
        style={styles.button}
        onPress={() => navigation.navigate("TestScreen")}
      >
        <Text style={styles.pressableText}>Teste Başla</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#EFECEC"
  },
  inputContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'orange',
    padding: 10,
    justifyContent: 'center',
    borderRadius: 10,
  },
  ageInput: {
    height: 40,
    width: 200,
    textAlign: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    margin: 5,
  },
  button: {
    backgroundColor: 'orange',
    borderRadius: 10,
    width: 230,
    marginTop: 20,
    height: 50,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressableText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default GreetingScreen;
