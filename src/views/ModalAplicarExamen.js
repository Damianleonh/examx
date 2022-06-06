import React, { useLayoutEffect, useState, useEffect } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, View, Pressable, TextInput, KeyboardAvoidingView, Alert, Modal, Text } from "react-native";
import { doc, getDocs, collection, where, query, onSnapshot, deleteDoc, updateDoc, get, limit } from "firebase/firestore";
import * as Haptics from 'expo-haptics';
import { db } from '../../firebase-config';
import { auth } from '../../database/firebase'

const ModalAplicarExamen = ({modalExamen, setModalExamen,examen,plantilla}) => {

    const [estadoExamenState,setEstadoExamenState] = useState([
        {
            maestro: auth.currentUser.email,
            codigoExamen: '11111',
            alumnosSelected: ['a', 'a'],
            plantillaid: null,
            gradoGrupo: null,
            estado: null
        }
    ])
    

    useEffect(() => {
        const q = query(collection(db, "examenes"), where("codigoExamen", "==", examen.codigoExamen))
        const unsuscribe = onSnapshot(q, (querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    setEstadoExamenState([doc.data()])
                    console.log('pass')
            })

            
            
        })

    },[])


    const estadoExamen = () => {

        if (!estadoExamenState[0].estado === false) {
            return (
                <Text style={styles.textSubtitulo}>Estado: <Text style={styles.textInactivo}>Inactivo</Text> </Text>
            )
        } else {
            return (
                <Text style={styles.textSubtitulo}>Estado: <Text style={styles.textActivo}> Activo </Text> </Text>
            )
        }
    }

    const mostrarPregunta = () => {
        if(!estadoExamenState[0].estado === false) {
            return (
                <Text style={{textAlign:'center'}}>Aun no esta activo el examen, espera a que el docente lo active</Text>
            )
        }
    }
    

    
  return (
    <Modal
            animationType='slide'
            visible={modalExamen}>

            <SafeAreaView style={styles.container}>
                <View style={styles.containerBtnsPrincipales}>

                    <Pressable

                        style={({ pressed }) => [
                            { borderRadius: 10 },
                            pressed ? { opacity: 0.2 } : {},
                        ]}

                        onPress={() => { console.log(estadoExamenState), Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success) }}
                    >
                        <Text style={styles.txtBtnSalir}>
                            Ir a inicio
                        </Text>
                    </Pressable>

                  
                </View>

                

                <View style={styles.containerTituloExamen}>

                    <Text style={styles.textTitulo}>Area de examen</Text>
                    <Text style={styles.textSubtitulo}>Examen: {plantilla.titulo} </Text>
                    {estadoExamen()}
                </View>
                
                <View style={styles.containerPregunta}>
                        {mostrarPregunta()}
                </View>

            

            </SafeAreaView>

        </Modal>
  )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,

    },
    containerBtnsPrincipales: {
        height: 50,
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 5,
        paddingHorizontal: 22,
        flexDirection: 'row',
        backgroundColor: '#fff',
        zIndex: 2
    },
    txtBtnSalir: {
        color: '#0F74F2',
        fontSize: 16,
        fontWeight: "600",
    },
    containerTituloExamen: {
        width: "100%",
        paddingHorizontal: 20

    },

    textTitulo: {
        position: 'relative',
        left: -8,
        fontSize: 30,
        marginBottom: 10
    },
    textSubtitulo: {
        color: "#a0a0a0",
        fontSize:16
    },

    textInactivo:{
        color: "red",
        fontWeight:'600'
    },
    textActivo: {
        color: "green",
        fontWeight: '600'
    },
    containerPregunta:{
        height: "100%",
        justifyContent: 'center',
        paddingBottom:200,
        alignItems: 'center',
        paddingHorizontal:50,
    },

})

export default ModalAplicarExamen