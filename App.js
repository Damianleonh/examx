import React from 'react'
import { Text, SafeAreaView, View, Image, TextInput, StyleSheet, Pressable } from 'react-native'

const App = () => {
    return (
        <SafeAreaView>

            {/* Imagen principal */}
            <Image
                style={styles.imagen}
                source={ require('./sources/Images/logo.jpg') }
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

                <Pressable
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>
                        Iniciar sesión
                    </Text>
                </Pressable>

                <Pressable
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>
                        Iniciar sesión
                    </Text>
                </Pressable>

            </View>

            {/* Ultima imagen */}
            <Image
                source={ require('./sources/Images/BOTTOMAPP.png')}
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
        width: '100%',
        padding: 15,
        borderRadius:10,
        alignItems:'center'
    },

    buttonText:{
        color:'white',
        fontWeight: 'bold',
        fontSize: 20      
    }

})



export default App