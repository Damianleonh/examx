import React, { useState } from 'react'
import { Text, SafeAreaView, View, Image, TextInput, StyleSheet, Pressable, Modal, Alert } from 'react-native'
import { Picker } from '@react-native-picker/picker';

//Firebase
import { addDoc, collection, doc, setDoc } from "firebase/firestore"
import { db } from '../../firebase-config';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../firebase-config';

const Registro = ({ modalRegistro, setModalRegistro }) => {

  const [correo, setCorreo] = useState("")
  const [password, setPassword] = useState("")
  const [repassword, setResPassword] = useState("")
  const [nombre, setNombre] = useState("")
  const [apellido, setApellido] = useState("")
  const [seleccionTipoUsuario, setSeleccionTipoUsuario] = useState("");

  function crearUsuario() {

    //VALIDACIONES
    if ([correo, password, repassword, nombre, apellido, seleccionTipoUsuario].includes('')) {
      Alert.alert(
        'Error',
        'Todos los campos son obligatorios'
      )
      return
    }

    if (password != repassword) {
      Alert.alert(
        'Error',
        'Las contraseñas no son iguales'
      )
      return
    }

    //Crear usuario en Authentication
    const app = initializeApp(firebaseConfig)
    const auth = getAuth(app)

    createUserWithEmailAndPassword(auth, correo, password)
        .then((userCredential)=>{
            Alert.alert(
              'Mensaje',
              'Cuenta creada correctamente'
            )
            const user = userCredential.user
            console.log(user)

            //ENVIAR A FIRESTORE
            const myDoc = doc(db, "Usuarios", correo)
            const docData = {
              correo: correo,
              nombreUsuario: nombre + " " + apellido,
              tipo:seleccionTipoUsuario + ""
            }

            setDoc(myDoc, docData).then(()=>{
              console.log("Usuario registrado en firestore");
              setModalRegistro(!modalRegistro);
            }).catch(error=>{
              console.log("Error al registrar en firestore: ",error)
            })

        })
        .catch(err => {
            if (err.code === 'auth/invalid-email') {
              Alert.alert(
                'Error',
                'El correo es invalido'
              )
            }else if(err.code === 'auth/weak-password' ){
              Alert.alert(
                'Error',
                'La contraseña es debil'
              )
            }else if(err.code === 'auth/email-already-in-use' ){
              Alert.alert(
                'Error',
                'La cuenta ya existe'
              )
            }else{
              Alert.alert(
                'Error',
                'Error al registrar', err
              )
            }
            console.log(err)
            return
        })

  }

  return (
    <SafeAreaView>
      <Pressable
        style={styles.btnRegresar}
        onPress={() => setModalRegistro(!modalRegistro)}>
        <Text
          style={styles.textoBtnRegresar}
        >
          Cancelar</Text>
      </Pressable>

      <Image
        style={styles.imagen}
        source={require('../img/logo.jpg')}
      />

      {/* Inputs y botones */}
      <View style={styles.contenedorBtnInputs}>
        <TextInput
          onChangeText={(txt) => setCorreo(txt)}
          style={styles.input}
          placeholder='Correo'
          keyboardType='email-address'
          placeholderTextColor="#a0a0a0"

        />

        <TextInput
          onChangeText={(txt) => setPassword(txt)}
          style={styles.input}
          placeholder='Contraseña'
          secureTextEntry
          placeholderTextColor="#a0a0a0"

        />
        <TextInput
          onChangeText={(txt) => setResPassword(txt)}
          style={styles.input}
          placeholder='Repetir Contraseña'
          secureTextEntry
          placeholderTextColor="#a0a0a0"

        />
        <TextInput
          onChangeText={(txt) => setNombre(txt)}
          style={styles.input}
          placeholder='Nombre/s'
          placeholderTextColor="#a0a0a0"

        />

        <TextInput
          onChangeText={(txt) => setApellido(txt)}
          style={styles.input}
          placeholder='Apellidos'
          placeholderTextColor="#a0a0a0"

        />


        <View style={styles.containerPicker}>
          <Text style={styles.tipouserTxt}>Selecciona el tipo de usuario:</Text>
          <Picker
            selectedValue={seleccionTipoUsuario}
            onValueChange={(itemValue,itemIndex) => 
              setSeleccionTipoUsuario(itemValue)
            }
          >
            <Picker.Item label="Profesor" value="usuarioProfesor" />
            <Picker.Item label="Alumno" value="usuarioAlumno" />
          </Picker>

        </View>


        {/* Contenedor de botones */}
        <View style={styles.contenedorBotones}>

          {/* Boton registrar */}
          <Pressable
            style={styles.button}
            onPress={() => crearUsuario()}
          >
            <Text style={styles.buttonText}>
              Registrate
            </Text>
          </Pressable>
        </View>
      </View>



      {/* Ultima imagen */}
      <Image
        source={require('../img/BOTTOMAPP.png')}
      />



    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  imagen: {
    width: 200,
    height: 100
  },

  input: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    borderColor: '#E3F4FF',
    borderWidth: 3,
    marginTop: 15,
  },

  contenedorBtnInputs: {
    marginHorizontal: 30
  },

  button: {
    backgroundColor: '#0F74F2',
    width: 200,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 40
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20
  },

  buttonText2: {
    color: '#002060',
    fontWeight: 'bold',
    fontSize: 20
  },

  contenedorBotones: {
    alignItems: 'center'
  },

  btnRegresar: {
    width: 100,
    alignItems: 'center',
    marginHorizontal: 15,
  },

  textoBtnRegresar: {
    color: '#0F74F2',
    fontWeight: '400',
    fontSize: 17
  },

  containerPicker: {
    padding: 15,
    marginBottom: 40
  },

  tipouserTxt: {
    fontSize: 18,
    position: 'relative',
    top: 40,
    left: 33
  }
})

export default Registro
