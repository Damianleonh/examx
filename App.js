import React from "react";
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

//Components
import Login from "./src/views/Login"
import Registro from "./src/views/Register"
import Home from "./src/views/Home";

//Navigator
const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Login" component={ Login }/>
        <Stack.Screen name="Home" component={ Home }/>
      </Stack.Navigator>
    </NavigationContainer>

  )
}

