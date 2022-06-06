import React, { useLayoutEffect, useState, useEffect } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, View, Pressable, TextInput, KeyboardAvoidingView, Alert, Modal, Text } from "react-native";
import * as Haptics from 'expo-haptics';

const ModalAplicarExamen = ({modalExamen, setModalExamen,examen,plantilla}) => {


    const estadoExamen = () => {
        if(examen.estado === false){
            return(
                <Text style={styles.textSubtitulo}>Estado: <Text style={styles.textInactivo}>{examen.estado}</Text> </Text>
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

                        onPress={() => { setModalExamen(!modalExamen), Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success) }}
                    >
                        <Text style={styles.txtBtnSalir}>
                            Ir a inicio
                        </Text>
                    </Pressable>

                    <Pressable

                        style={({ pressed }) => [
                            { borderRadius: 10 },
                            pressed ? { opacity: 0.2 } : {},
                        ]}
                        onPress={() => {
                            Alert.alert('Finalizar Examen', '¿Seguro de finalizar el examen y recoger todos los resultados?', [
                                {
                                    text: 'Cancelar',
                                    onPress: () => { return },
                                    style: 'cancel',
                                },
                                {
                                    text: 'OK', onPress: () => { return }
                                },
                            ]), Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success), console.log(examen)
                        }}
                    >
                        <Text style={styles.txtBtnSalir}>
                            Comenzar Examen
                        </Text>
                    </Pressable>
                </View>

                

                <View style={styles.containerTituloExamen}>

                    <Text style={styles.textTitulo}>Area de examen</Text>
                    <Text style={styles.textSubtitulo}>Examen: {plantilla.titulo} </Text>
                    {estadoExamen()}

                </View>
                <View style={styles.containerBtnEstado}>
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

})

export default ModalAplicarExamen