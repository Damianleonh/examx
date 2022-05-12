import React, { useState, createContext, useContext, useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

//Firebase
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./database/firebase";
import { db } from './firebase-config';
//views
import Login from "./src/views/Login"
import Home from "./src/views/Home";
import CrearPlantilla from "./src/views/CrearPlantilla";
import VerPlantillas from "./src/views/VerPlantillas";
import Alumnos from "./src/views/Alumnos";
import AplicarExamen from "./src/views/AplicarExamen";
import HomeAlumno from "./src/views/HomeAlumno";


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
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  )
}


const AlumnoStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeAlumno} />
      <Stack.Screen name="CrearPlantilla" component={CrearPlantilla} />
      <Stack.Screen name="VerPlantillas" component={VerPlantillas} />
      <Stack.Screen name="Alumnos" component={Alumnos} />
      <Stack.Screen name="AplicarExamen" component={AplicarExamen} />
    </Stack.Navigator>
  )
}

const AppStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="CrearPlantilla" component={CrearPlantilla} />
      <Stack.Screen name="VerPlantillas" component={VerPlantillas} />
      <Stack.Screen name="Alumnos" component={Alumnos} />
      <Stack.Screen name="AplicarExamen" component={AplicarExamen} />
    </Stack.Navigator>
  )
}

const AppNavigator = () => {
  const [userData, setUserData] = useState(null)
  const { user, setUser } = useContext(AuthenticatedUserContext);
  const [isLoading, setIsLoading] = useState(true);


  //USE EFECT PARA LA RECOLECCION Y VALIDADACION DE DATOS 
  useEffect(() => {
    const recoleccionDatos = () => {
      const usuario = auth.currentUser.email;
      const myDoc = doc(db, "Usuarios", usuario)
      getDoc(myDoc).then(snapshot => {
        if (snapshot.exists) {
          setUserData(snapshot.data())
          console.log(userData)
        } else {
          console.log("error")
        }
      })

    }

    
    const unsubscribeAuth = onAuthStateChanged(
      auth,
      async authenticatedUser => {
        if (authenticatedUser) {
          setUser(authenticatedUser)
          recoleccionDatos()
        } else {
          setUser(null)
        }
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
      <AppNavigator />
    </AuthenticatedUserProvider>
  )
}

