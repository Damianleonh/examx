import React from 'react'
import { Text, SafeAreaView, View, Image, TextInput, StyleSheet, Pressable, Modal } from 'react-native'

const Registro = ({ modalRegistro,setModalRegistro} ) => {
  return (
    <SafeAreaView>
      {/* Boton cerrar modal*/}
      <Pressable
      style={styles}
      >
        <Text>Volver</Text>
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
          placeholder='Contrasena'
          
        />


        {/* Contenedor de botones */}
        <View style={styles.contenedorBotones}>

          {/* Boton iniciar sesión */}
          <Pressable
            style={styles.button}
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
    imagen:{
        width: 200,
        height: 100
    },

    input:{ 
        paddingHorizontal:15,
        paddingVertical: 10,
        borderRadius:10,
        borderColor: '#E3F4FF',
        borderWidth:3,
        marginTop: 15
    },

    contenedorBtnInputs:{
        marginHorizontal: 30
    },

    button:{
        backgroundColor: '#0F74F2',
        width: 200,
        padding: 15,
        borderRadius:10,
        alignItems:'center',
        marginTop: 40
    },

    button2:{
        backgroundColor: '#D9DEFB',
        width: 200,
        padding: 15,
        borderRadius:10,
        alignItems:'center',
        marginTop: 20
    },

    buttonText:{
        color:'#fff',
        fontWeight: 'bold',
        fontSize: 20      
    },

    buttonText2:{
        color:'#002060',
        fontWeight: 'bold',
        fontSize: 20      
    },

    contenedorBotones:{
        alignItems: 'center'
    }
})

export default Registro
