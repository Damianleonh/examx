import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView, TouchableOpacity, Image } from 'react-native'
import { auth } from '../firebase';

const Login = () => {
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')

    const hadleSingUp = () =>{
        auth
        .createUserWithEmailAndPassword(email,pass)
        .then(userCredentials => {
            const user = userCredentials.user;
            console.log(user.email);
        })
        .catch(error => alert(error.message))
    }

    return (


        <KeyboardAvoidingView
            style={styles.contenedor}
            behavior="padding">
            <View style={styles.imgcont}>
                <Image
                    style={styles.img}
                    source={require('../sources/Images/logo.jpg')}
                />
            </View>
            <View style={styles.inputContenedor}>
                <TextInput
                    placeholder="Correo"
                    defaultValue= {email}
                    onChanceText ={text => setEmail(text) } 
                    style={styles.input}
                />
                <TextInput
                    placeholder="Contraseña"
                    defaultValue= {pass}
                    onChanceText ={text => setPass(text)} 
                    style={styles.input}
                    secureTextEntry
                />
            </View>

            <View style={styles.buttonContenedor}>
                <TouchableOpacity
                    onPress={() => { }}
                    style={styles.button}>
                    <Text style={styles.buttonText}>Iniciar Sesión</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={hadleSingUp}
                    style={[styles.button, styles.buttonSecundario]}>
                    <Text style={styles.buttonSecundarioTexto}>Regístrarse</Text>
                </TouchableOpacity>

            </View>
        </KeyboardAvoidingView>
    )
}

export default Login

const styles = StyleSheet.create({
    contenedor: {
        justifyContent: 'flex-start',
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white'
    },
    imgcont: {
        marginTop:100
    },
    img:{
        width: 300,
        height:100,
    
    },

    inputContenedor:{
        width:'80%'
    },
    input:{ 
        paddingHorizontal:15,
        paddingVertical: 10,
        borderRadius:10,
        borderColor: '#E3F4FF',
        borderWidth:3,
        marginTop: 15
    },
    buttonContenedor:{
        width: '60%',
        justifyContent:'center',
        alignItems:'center',
        marginTop: 40

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
    },
    buttonSecundario:{
        backgroundColor: '#E3F4FF',
        marginTop:20
    },
    buttonSecundarioTexto:{
        color: '#0F74F2',
        fontWeight: 'bold',
        fontSize: 20  
    }
})