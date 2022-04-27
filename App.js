import React, { useState } from 'react'
import { Text, SafeAreaView, View, Image, TextInput, StyleSheet, Pressable, Modal, KeyboardAvoidingView, Dimensions } from 'react-native'
import { backgroundColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes'
import Registro from './src/components/Registro'

const App = () => {

    const [ modalRegistro, setModalRegistro ] = useState(false)

    return (
        <SafeAreaView style={styles.container}>

            <Image
                style={styles.imagen}
                source={ require('./src/Images/logo.jpg') }
            />

            {/* Inputs y botones */}
            <View style={styles.contenedorBtnInputs}>
                <TextInput
                    style={styles.input}
                    placeholder='Correo'
                    keyboardType='email-address'
                    secu
                />

                <TextInput
                    placeholder="Contraseña"
                    style={styles.input}
                    secureTextEntry
                />


                {/* Contenedor de botones */}
                <View style={styles.contenedorBotones}>

                    {/* Boton iniciar sesión */}
                    <Pressable
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>
                            Iniciar sesión
                        </Text>
                    </Pressable>

                    {/* Boton registro */}
                    <Pressable
                        style={styles.button2}
                        onPress= { () => setModalRegistro(!modalRegistro)}
                    >
                        <Text style={styles.buttonText2}>
                            Registrate
                        </Text>
                    </Pressable>


                    { modalRegistro && (
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

            {/* Ultima imagen */}
            <KeyboardAvoidingView style={styles.contenedorImgBottom}>
                <Image
                    style={styles.imgBottom}
                    source={ require('./src/Images/BOTTOMAPP.png')}
                />
            </KeyboardAvoidingView>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        backgroundColor: '#0ff'
    },

    imagen:{
        width: 200,
        height: 50,
        marginTop: 50,
        marginBottom: 5
    },
    
    
    contenedorImgBottom:{
        // backgroundColor: '#ff0',
        width: '100%',
        height: '100%',
    },
    
    imgBottom:{
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        resizeMode: 'contain',
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



export default App