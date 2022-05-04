import React, { useState } from 'react'
import { Text, SafeAreaView, View, Image, TextInput, StyleSheet, Pressable, Modal, KeyboardAvoidingView, Dimensions, Alert } from 'react-native'
import Registro from './Register'

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../firebase-config'
import { useNavigation } from '@react-navigation/native';

const Login = () => {

    const [modalRegistro, setModalRegistro] = useState(false)
    const [ correo, setCorreo ] = useState("")
    const [ password, setPassword ] = useState("")

    const navigation = useNavigation();
    const app = initializeApp(firebaseConfig)
    const auth = getAuth(app)

    const handleSignIn = () => {

        if( [ correo, password ].includes('') ){
            Alert.alert(
              'Error',
              'Todos los campos son obligatorios'
          )
          return
        }

        signInWithEmailAndPassword(auth,correo,password)
        .then((userCredential)=>{
            console.log("Sesion iniciada")
            const user = userCredential.user
            console.log(user)
            navigation.navigate("Home")
        })
        .catch(err =>{
            if (err.code === 'auth/invalid-email') {
                Alert.alert(
                  'Error',
                  'El correo es invalido'
                )
            }else{
                Alert.alert(
                    'Error',
                    'Datos incorrectos'
                )
            }
            console.log(err)
        } )

    }

    return (
        <SafeAreaView style={styles.container}>


        {/* Inputs y botones */}
        <View style={styles.contenedorBtnInputs}>
            <Image
                style={styles.imagen}
                source={require('../img/logo.jpg')}
            />
            <TextInput
                style={styles.input}
                placeholder='Correo'
                keyboardType='email-address'
                autoComplete='email'
                textContentType='emailAdress'
                onChangeText={ (txt) => { setCorreo(txt) }}
                placeholderTextColor = "#a0a0a0" 
            />

            <TextInput
                placeholder="Contraseña"
                style={styles.input}
                secureTextEntry
                onChangeText={ (txt) => { setPassword(txt) }}
                placeholderTextColor = "#a0a0a0" 
            />


            {/* Contenedor de botones */}
            <View style={styles.contenedorBotones}>

                {/* Boton iniciar sesión */}
                <Pressable
                    style={styles.button}
                    onPress={ () => handleSignIn() }
                >
                    <Text style={styles.buttonText}>
                        Iniciar sesión
                    </Text>
                </Pressable>

                {/* Boton registro */}
                <Pressable
                    style={styles.button2}
                    onPress={() => setModalRegistro(!modalRegistro)}
                >
                    <Text style={styles.buttonText2}>
                        Registrate
                    </Text>
                </Pressable>


                {modalRegistro && (
                    <Modal
                        animationType='slide'
                        visible={modalRegistro}
                    >
                        <Registro
                            modalRegistro={modalRegistro}
                            setModalRegistro={setModalRegistro}
                        />

                    </Modal>
                )}

            </View>

        </View>

        <Image
            style={styles.imgBottom}
            source={require('../img/BOTTOMAPP.png')}
        />

    </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        justifyContent: 'flex-end',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    },

    imagen: {
        width: 200,
        height: 50,
        marginTop: 50,
        marginBottom: 5
    },

    imgBottom: {
        width: '100%',
        height: 300
    },

    input: {
        marginHorizontal: 30,
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        borderColor: '#E3F4FF',
        borderWidth: 3,
        marginTop: 15,
        color: "#000"
    },

    contenedorBtnInputs: {
        position: 'absolute',
        top: 0,
        width: Dimensions.get('window').width,
    },

    button: {
        backgroundColor: '#0F74F2',
        width: 200,
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 40
    },

    button2: {
        backgroundColor: '#D9DEFB',
        width: 200,
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20
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
    }
})


export default Login