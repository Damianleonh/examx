import React, {useState, createContext, useContext, useEffect} from "react";
import { View, ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

//Firebase
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./database/firebase";

//views
import Login from "./src/views/Login"
import Registro from "./src/views/Register"
import Home from "./src/views/Home";

//Navigator
const Stack = createNativeStackNavigator()

//----------------->Auth 
const AuthenticatedUserContext = createContext({}); //Contexto usuario autenticado

const AuthenticatedUserProvider = ({ children }) => { //Funcion para guardar al usuario en el contexto
  const [user, setUser] = useState(null); 
  return (
      <AuthenticatedUserContext.Provider value={{ user, setUser }}>
        {children}
      </AuthenticatedUserContext.Provider>
    );
};

//---------------------------

const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }} >
      <Stack.Screen name="Login" component={ Login }/>
    </Stack.Navigator>
  )
}

const AppStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={ Home }/>
    </Stack.Navigator>
  )
}

const AppNavigator = () => {
  const { user, setUser } = useContext(AuthenticatedUserContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(
      auth,
      async authenticatedUser => {
        authenticatedUser ? setUser(authenticatedUser) : setUser(null);
        setIsLoading(false);
      }
    );
    return unsubscribeAuth;
  }, [user]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size='large' />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AuthenticatedUserProvider>
      <AppNavigator/>
    </AuthenticatedUserProvider>
  )
}

