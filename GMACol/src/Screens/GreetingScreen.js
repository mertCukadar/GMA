import react from "react";
import { Pressable, StyleSheet, TextInput } from "react-native";
import { Button, Text, View } from "react-native";
import { useState } from "react";
import SelectDropdown from 'react-native-select-dropdown'



const GreetingScreen = ({ navigation }) => {
  const countries = ["Woman" , "Man"]
  const [age, setAge] = useState("0");
  const isFullFilled = true;
  

  return (
  <View style={Styles.container}>
  <View style = { Styles.InputContainer}>
    <TextInput style = {Styles.ageInput} placeholder="Enter your age"></TextInput>
    <SelectDropdown
      defaultButtonText="Gender"
      buttonStyle={{backgroundColor: 'white', borderRadius: 10, width: 200, height: 40, margin: 5,}}
      buttonTextStyle={{fontSize: 16, color: 'black'}}
      data={countries}
      onSelect={(selectedItem, index) => {
        console.log(selectedItem, index)
      }}
    />
  </View>

  <Pressable
    disabled={!isFullFilled}
    style={Styles.button}
    title="Teste Başla"
    onPress={() => navigation.navigate("TestScreen")}
  >
    <Text style={Styles.pressableText}>Teste Başla</Text>
  </Pressable>
  </View>
  )
};

Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center', 
    backgroundColor: "#EFECEC"
  },
  InputContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'orange',
    padding: 10,
    justifyContent: 'center',
    borderRadius: 10,
    
  },
  ageText: {
    fontSize: 12,
    fontWeight: 'italic',
    alignItems: "center",
    margin: 10,
    
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