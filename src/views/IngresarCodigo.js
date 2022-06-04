import React, { useState, useEffect } from 'react'
import { View, SafeAreaView, Text, StyleSheet, Dimensions, Image, TextInput, Pressable, Alert, Keyboard, ActivityIndicator} from 'react-native'
import { collection, where, query, onSnapshot, addDoc, doc, updateDoc,arrayUnion , arrayRemove } from 'firebase/firestore';
import { db } from '../../firebase-config';
import { auth } from '../../database/firebase'

const IngresarCodigo = ({navigation}) => {

    const [ codigo, setCodigo] = useState("")
    const [ buttonState, setButtonState ] = useState(true)
    const [ examen, setExamen] =  useState([])
    const [ isloaded, setIsLoaded ] = useState(false)

    const buscarExamen = () => {

        setIsLoaded(true)

        const q = query(collection(db, "examenes"), where("codigoExamen", "==", codigo))
        const unsuscribe = onSnapshot(q, (querySnapshot) => {
            let tempArr = []
            querySnapshot.forEach((doc) => {
                tempArr.push(doc.data())
            })

            setExamen(tempArr)

            if(tempArr.length < 1){
                Alert.alert("Algo salio mal","No se encontro ningun examen")
                console.log("Error No se encontro ningun examen")
                setIsLoaded(false)
            }else{
                setIsLoaded(false)
            }
        })

    }

    const agregarAExamen = () => {

        const q = query(collection(db, "examenes"), where("codigoExamen", "==", codigo))
        const unsuscribe = onSnapshot(q, (querySnapshot) => {
            let tempArr = []
            querySnapshot.forEach((doc) => {
                updateDoc(doc.ref,{
                    alumnosSelected: arrayUnion(auth.currentUser.email)
                }).then(
                    Alert.alert(
                        'Listo!',
                        'Te has inscrito al examen con exito 🥳',
                        [
                            { text: 'Ok', onPress: () => { navigation.navigate("Home") } },
                        ],
                        {
                            cancelable: true
                        }
                    )
                )

            })
        })
    }

    return (
        <SafeAreaView style={styles.safeaview}>

            <View style={styles.container}>
                <Text style={styles.titulo}>Ingresar a examen</Text>
                <Text style={styles.subtitulo}>Tu profesor debe de contar con el codigo que se ingresara a continuación.</Text>
            </View>

            <View style={styles.apartado}>
                <Text style={styles.indicacion}>Ingresa el codigo de 6 digitos</Text>

                <View style={styles.ggcontianer}>
                    <TextInput
                        autoCapitalize = {"characters"}
                        style={styles.ggelement}
                        placeholder='------'
                        keyboardType='default'
                        maxLength={6}
                        onChangeText={ (txt) =>{
                            { txt.length > 5 ? setButtonState(false) : setButtonState(true)}
                            setCodigo(txt)
                        }}
                    />
                </View>

                <View style={styles.btnContainer}>
                    <Pressable style={buttonState ? styles.buttondis : styles.button}
                        disabled={buttonState}
                        onPress= {() => {
                            buscarExamen()
                            Keyboard.dismiss
                        } }
                    >
                        <Text style={styles.buttonText}>Buscar</Text>
                    </Pressable>
                </View>

                { examen.length > 0 && 
                    examen.map((a, index) => (
                        <Pressable
                            style={styles.cardBtn}
                            key={index}
                            onPress={ () => agregarAExamen()}
                        >
                            <View style={ styles.plantCard } >

                                <View style={styles.viewTxt}>                            
                                    <Text style={styles.plantCardTxt}>
                                        {a.gradoGrupo}
                                    </Text>
                                    <Text style={styles.tmpEstTxt}>
                                        Correo del profesor: {a.maestro}
                                    </Text>
                                </View>

                            </View>
                        </Pressable>
                    ))
                }

                { isloaded && (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <ActivityIndicator size='large' />
                    </View>
                ) }



            </View>

            {/* -------Bottom image---------*/}
            <Image
                source={require('../img/bottomimg.png')}
                style={styles.btmImg}
                resizeMode={'cover'}
            />

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeaview:{
        backgroundColor: '#fff',
        flex: 1
    },
    container:{
        marginHorizontal: 20,
    },
    
    titulo:{
        marginTop: 10,
        fontSize: 30
    },

    subtitulo:{
        marginTop: 10,
        color: '#808080'
    },

    apartado:{
        marginTop: 20,
        width: Dimensions.get('window').width,
        height: 550,
        paddingHorizontal: 20,
    },

    indicacion:{
        textAlign: 'center',
        color: '#0F74F2',
        fontSize: 16,
        marginVertical: 20,
        fontWeight: '600'
    },

    btmImg:{
        width: Dimensions.get('window').width,
        height: 200,
        zIndex: -1,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },

    ggcontianer:{
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
        marginHorizontal: 60
    },

    ggelement:{
        fontSize: 60,
        color: '#0F74F2'
    },

    btnContainer:{
        alignItems: 'center',
        marginTop: 50
    },

    button: {
        backgroundColor: '#0F74F2',
        width: 200,
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },

    buttondis: {
        backgroundColor: '#0F74F299',
        width: 200,
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },

    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 20
    },

    plantCard:{
        borderColor: '#D9D9D9',
        borderWidth: 1,
        borderRadius: 10,
        height: 65,
        paddingHorizontal: 15,
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 10,
        justifyContent: 'space-between'
    },

    plantCardTxt:{
        fontSize: 16,
        color: '#808080',
        fontWeight: '500'
    },

    tmpEstTxt:{
        marginTop: 5,
        color: '#0F74F2'
    },

    cardBtn:{
        marginTop: 40
    }
})

export default IngresarCodigo