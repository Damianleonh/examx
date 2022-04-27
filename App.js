import React, { useState } from 'react'
import { Text, SafeAreaView, View, Image, TextInput, StyleSheet, Pressable, Modal } from 'react-native'
import Registro from './src/components/Registro'

const App = () => {

    const [ modalRegistro, setModalRegistro ] = useState(false)

    return (
        <SafeAreaView>
            <Image
                style={styles.imagen}
                source={ require('./src/Images/logo.jpg') }
            />

            <TextInput
                placeholder='Correo'
                keyboardType='email-address'
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
                    placeholder='Correo'
                    keyboardType='email-address'
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
            <Image
                source={ require('./src/Images/BOTTOMAPP.png')}
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
    },

    button2:{
        backgroundColor: '#D9DEFB',
        width: 200,
        padding: 15,
        borderRadius:10,
        alignItems:'center'
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

    }
})



export default App