import React, { useLayoutEffect, useState } from 'react'
import { View, SafeAreaView, Text, StyleSheet, Pressable, ScrollView, Alert, Image, Dimensions } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import { auth } from '../../database/firebase'
import { doc, getDocs, collection, where, query, onSnapshot, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase-config';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { set } from 'react-native-reanimated';
import EditarPlantilla from './EditarPlantilla';
import * as Haptics from 'expo-haptics';

const VerPlantillas = () => {

    //VARIABLES 
    const [id, setId] = useState("")
    const [modalVisible, setModalVisible] = useState(false)

    const [plantillas, setPlantillas] = useState([])
    const [preguntas, setPreguntas] = useState(
        [{
            tituloPregunta: '',
            tiempo: '5',
            opcion: ['Opcion'],
            respuestaCorrecta: null
        }])

    const [plantillaEditable, setPlantillaEditable] = useState([])


    //RECOGER PLANTILLAS
    useLayoutEffect(() => {
        const q = query(collection(db, "plantillas"), where("autor", "==", auth.currentUser.email))
        const unsuscribe = onSnapshot(q, (querySnapshot) => {

            let tempArr = []
            querySnapshot.forEach((doc) => {
                tempArr.push(doc.data())
            })

            setPlantillas(tempArr)
        })
    }, [])

    const calcularTiempo = (obj) => {
        let tiempo = 0
        obj.preguntas.forEach((val) => {
            tiempo += parseInt(val.tiempo)
        })
        return tiempo + "s"
    }


    const borrarPlantilla = (obj) => {
        const q = query(collection(db, "plantillas"), where("id", "==", obj.id))
        const unsuscribe = onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                deleteDoc(doc.ref)
            })
        })

    }

    return (
        <SafeAreaView style={styles.container}>

            {/* Titulo */}
            <Text style={styles.titulo}>Ver plantillas</Text>

            {/* Plantillas */}
            <ScrollView style={styles.plantillasScroll} alwaysBounceVertical={false}>



                {plantillas.length > 0 &&
                    plantillas.map((plantilla, index) => (      
                        <View style={styles.plantCard} >


                            <View style={styles.viewTxt}>
                                <Text style={styles.plantCardTxt}>
                                    {plantilla.titulo}
                                </Text>
                                <Text style={styles.tmpEstTxt}>
                                    Tiempo total: {calcularTiempo(plantilla)}
                                </Text>
                            </View>

                            <View style={styles.accbtn}>
                                <Pressable

                                    style={({ pressed }) => [
                                        {
                                            marginRight:10
                                        },
                                        pressed ? { opacity: 0.2, padding: 5} : {},
                                    ]}
                                    onPress={() =>
                                        {Alert.alert(
                                            'Editar',
                                            '¿Deseas editar la plantilla? 📝',
                                            [
                                                { text: 'Cancelar', onPress: () => { return } },
                                                { text: 'Editar plantilla', onPress: () => { setPreguntas(plantilla.preguntas), setPlantillaEditable(plantilla), setModalVisible(true), setId(plantilla.id), Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy) } },
                                            ],
                                            {
                                                cancelable: true
                                            }
                                    ), Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success) }}
                                    
                                >
                                    <MaterialCommunityIcons name="file-document-edit" size={27} color="#a0a0a0" />
                                </Pressable>



                                <Pressable

                                    style={({ pressed }) => [
                                        {
                                            marginRight: 10
                                        },
                                        pressed ? { opacity: 0.2, padding:5} : {},
                                    ]}
                                    onPress={() =>
                                        {Alert.alert(
                                        'Eliminar plantilla',
                                        '¿Deseas eliminar la plantilla? 🚫',
                                        [
                                            { text: 'Cancelar', onPress: () => { return } },
                                            { text: 'Borrar plantilla', onPress: () => borrarPlantilla(plantilla) },
                                        ],
                                        {
                                            cancelable: true
                                        }
                                    ), Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success) }}>
                                    <MaterialCommunityIcons name="delete-forever" size={27} color="#a0a0a0" />
                                </Pressable>


                            </View>


                            <EditarPlantilla
                                modalVisible={modalVisible}
                                setModalVisible={setModalVisible}
                                id = {id}
                                setId = {setId}
                                plantillaEditable = {plantillaEditable}
                                setPlantillaEditable={setPlantillaEditable}

                                preguntas = {preguntas}
                                setPreguntas = {setPreguntas}

                            />
                        </View>
                    ))
                }

                {plantillas.length === 0 && (
                    <Text style={styles.advertencia}>No tienes examenes creados</Text>
                )}

            </ScrollView>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
    },

    titulo: {
        marginTop: 10,
        fontSize: 30
    },

    plantillasScroll: {
        marginTop: 20,
        flexDirection: 'column'
    },

    plantCard: {
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

    iconfaws: {
        marginLeft: 5,
        padding: 4
    },

    plantCardTxt: {
        fontSize: 16,
        color: '#808080',
        fontWeight: '500'
    },

    accbtn: {
        flexDirection: 'row',
        alignItems: 'center'
    },

    viewTxt: {

    },

    tmpEstTxt: {
        marginTop: 5,
        color: '#0F74F2'

    },

    btmImg: {
        width: Dimensions.get('window').width,
        height: 200,
        zIndex: -1,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },

    advertencia: {
        marginTop: 20,
        textAlign: 'center',
        fontSize: 18,
        color: '#8e8e8e'
    }
})

export default VerPlantillas