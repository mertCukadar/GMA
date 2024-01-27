import react from "react";
import { StyleSheet, Text, TextInput, View } from 'react-native';


const TestScreen = ({navigation}) => {
    const expectedText = "Text Have to be here";
    
    return (
        <View style={styles.container}>
        <View style={styles.expectedText}>
            <Text>{expectedText}</Text>
        </View>
        <View style={styles.actualText}>
            <TextInput placeholder="Enter the text above" style = {styles.actualInput}></TextInput>
        </View>
        </View>
    );
    };

    styles = StyleSheet.create({
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