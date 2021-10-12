import React from "react";
import { Text, TextInput, View, StyleSheet, TouchableOpacity } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginForm = ({ navigation }) => {
  const [form, setForm] = React.useState(null)

  const handleChangeText = (field, text) => {
    setForm({
      ...form,
      [field]: text,
    })
  }

  React.useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem('@kmz/rick-and-morty')
        if(value) {
          navigation.navigate('Home')
        }
      } catch(e) {
        // error reading value
      }
    }
    getData()
  })

  const handleSubmit = async () => {
    try {
      const payload = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      }
      const response = await fetch('http://localhost:3001/auth/local/login', payload)
      const { token } = await response.json()
      // save token to local storage
      await AsyncStorage.setItem('@kmz/rick-and-morty', token)

      navigation.navigate('Home')
    } catch (error) {
      console.log("🚀 ~ file: Login.js ~ line 28 ~ handleSubmit ~ error", error)
      alert(error.message)
    }
  }

  return (
    <View>
      <View>
        <Text>Login Rick & Morty</Text>
      </View>
      <Text style={styles.text}>Email</Text>
      <TextInput
        autoCapitalize="none"
        style={styles.input}
        onChangeText={(text) => handleChangeText("email", text)}
        keyboardType="email-address"
      />
      <Text style={styles.text}>Password</Text>
      <TextInput
        autoCapitalize="none"
        onChangeText={(text) => handleChangeText("password", text)}
        style={styles.input}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: "white",
    fontSize: 30,
    marginBottom: 10,
  },
  input: {
    height: 40,
    color: "white",
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "white",
    padding: 10,
    width: 300,
  },
  button: { backgroundColor: "#BB86FC", padding: 7, marginTop: 10 },
  buttonText: {
    fontSize: 20,
    color: "#fff",
    textAlign: "center",
  },
});

export default LoginForm;
