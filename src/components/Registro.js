import React, { useState } from 'react'
import { Text, SafeAreaView, View, Image, TextInput, StyleSheet, Pressable, Modal, Alert } from 'react-native'
import { Picker } from '@react-native-picker/picker';

const Registro = ({ modalRegistro, setModalRegistro }) => {
  const [seleccionTipoUsuario, setSeleccionTipoUsuario] = useState();
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
        source={require('../Images/logo.jpg')}
      />

      {/* Inputs y botones */}
      <View style={styles.contenedorBtnInputs}>
        <TextInput
          style={styles.input}
          placeholder='Correo'
          keyboardType='email-address'

        />

        <TextInput
          style={styles.input}
          placeholder='Contraseña'
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder='Repetir Contraseña'
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder='Nombre/s'
        />

        <TextInput
          style={styles.input}
          placeholder='Apellidos'
        />


        <View style={styles.containerPicker}>
          <Text style={styles.tipouserTxt}>Selecciona el tipo de usuario:</Text>
          <Picker
          //  selectedValue={selectedLanguage}
          //  onValueChange={(itemValue, itemIndex) =>
          //setSelectedLanguage(itemValue)}
          >
            <Picker.Item label="Profesor" value="usuarioProfesor" />
            <Picker.Item label="Alumno" value="usuarioAlumno" />
          </Picker>

        </View>


        {/* Contenedor de botones */}
        <View style={styles.contenedorBotones}>

          {/* Boton iniciar sesión */}
          <Pressable
            style={styles.button}
            onPress = { () => (
              Alert.alert("Error", "Error al registrar",[
                {
                  text: "Ok"
                }
              ])
            )}
          >
            <Text style={styles.buttonText}>
              Registrate
            </Text>
          </Pressable>
        </View>
      </View>



      {/* Ultima imagen */}
      <Image
        source={require('../Images/BOTTOMAPP.png')}
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
    marginTop: 15
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
    marginBottom:40
  },

  tipouserTxt:{
    fontSize: 18,
    position: 'relative',
    top:40,
    left: 33
  }
})

export default Registro
