
import React, { useLayoutEffect, useState, useEffect } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, View, Pressable, TextInput, KeyboardAvoidingView, Alert, Modal, Text } from "react-native";
import * as Haptics from 'expo-haptics';
import { AntDesign } from '@expo/vector-icons';
import ModalSelector from 'react-native-modal-selector'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient'
import { updateDoc } from 'firebase/firestore';
import { doc, getDocs, collection, where, query, onSnapshot, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase-config';

const EditarPlantilla = ({ modalVisible, setModalVisible, id, setId, plantillaEditable, setPlantillaEditable, preguntas, setPreguntas }) => {



    const [tituloPlantilla, setTituloPlantilla] = useState(plantillaEditable.tituloPlantilla)

    const [date, setDate] = useState("")
    const [hora, setHora] = useState("")

    const elegirOpcion = (obj, i) => {
        if (obj.respuestaCorrecta === i) {
            return (
                <Pressable onPress={() => { return (obj.respuestaCorrecta = null), renderizarOpciones(), Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success) }}>
                    <FontAwesome name="star" size={20} color="#0F74F2" style={{ marginRight: 10 }} />
                </Pressable>
            )

        } else {
            return (
                <Pressable onPress={() => { return (obj.respuestaCorrecta = i), renderizarOpciones(), Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success) }}>
                    <Feather name="star" size={20} color="#0F74F2" style={{ marginRight: 10 }} />
                </Pressable>
            )

        }

    }


    const renderizarOpciones = () => {
        setPreguntas([...preguntas])
    }

    const eliminarPregunta = (index) => {
        const cambio = [...preguntas]
        cambio.splice(index, 1)
        setPreguntas(cambio)
    }

    const agregarPregunta = () => {
        setPreguntas
            ([...preguntas, {
                tituloPregunta: '',
                tiempo: '5',
                opcion: ['Opcion'],
                respuestaCorrecta: null
            }])
    }

    const tituloPreguntaFuncion = (pregunta) => {

        if (pregunta.tituloPregunta === "") {
            return (<TextInput
                style={styles.textInputPregunta}
                placeholder="Ingresa una pregunta"
                placeholderTextColor="#a0a0a0"
                onChangeText={(txt) => { pregunta.tituloPregunta = txt }}
                multiline={true}
            >
            </TextInput>)
        } else {
            return (<TextInput
                style={styles.textInputPregunta}
                placeholder={pregunta.tituloPregunta}
                placeholderTextColor="#a0a0a0"
                onChangeText={(txt) => { pregunta.tituloPregunta = txt }}
                multiline={true}
            >
            </TextInput>)
        }
    }


    const subirPlantilla = () => {
        const q = query(collection(db, "plantillas"), where("id", "==", id))
        const unsuscribe = onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                updateDoc(doc.ref,{
                    titulo: tituloPlantilla,
                    fechaActualizacion: { date, hora },
                    preguntas: preguntas
                })
            })
        })

        Alert.alert(
            'Listo!',
            'Tu platilla se ha subido con exito 🥳',
            [
                { text: 'Ok', onPress: () => { setModalVisible(!modalVisible), setId('') } },
            ],
            {
                cancelable: true
            }
        );
    }


    //Variables del picker modal
    let indx = 0;
    const data = [
        { key: indx++, section: true, label: 'SegundechaCreacion: { date, hora },os' },
        { key: indx++, label: '5 ' },
        { key: indx++, label: '10 ' },
        { key: indx++, label: '20 ' },
        { key: indx++, label: '30' },
        { key: indx++, label: '60' },
    ];

    //INICIA AREA FECHA --------------------------------------------------------------

    useEffect(() => {
        var date = new Date().getDate(); //Current Date
        var month = new Date().getMonth() + 1; //Current Month
        var year = new Date().getFullYear(); //Current Year
        var hours = new Date().getHours(); //Current Hours
        var min = new Date().getMinutes(); //Current Minutes

        if (date < 10) {
            date = "0" + date
        }
        if (month < 10) {
            month = "0" + month
        }
        if (hours < 10) {
            hours = "0" + hours
        }
        if (min < 10) {
            min = "0" + min
        }

        setDate(
            date + '/' + month + '/' + year
        );

        setHora(
            hours + ':' + min
        )

    }, []);
    //TERMINA AREA FECHA --------------------------------------------------------------

    return (
        <Modal
            animationType='slide'
            presentationStyle="pageSheet"
            visible={modalVisible}
        >
            <SafeAreaView style={styles.container}>
                <View style={styles.containerBtnsPrincipales}>

                    <Pressable

                        style={({ pressed }) => [
                            { borderRadius: 10 },
                            pressed ? { opacity: 0.2 } : {},
                        ]}

                        onPress={() => { setModalVisble(!modalVisible), Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success) }}
                    >
                        <Text style={styles.txtBtnSalir}>
                            Salir
                        </Text>
                    </Pressable>

                    <Pressable

                        style={({ pressed }) => [
                            { borderRadius: 10 },
                            pressed ? { opacity: 0.2 } : {},
                        ]}
                        onPress={() => {
                            Alert.alert('Subir plantilla', '¿Seguro de subir la plantilla?', [
                                {
                                    text: 'Cancelar',
                                    onPress: () => { subirPlantilla(), Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success) },
                                    style: 'cancel',
                                },
                                {
                                    text: 'OK', onPress: () => {
                                        if (tituloPlantilla === "") {
                                            Alert.alert('No', "no")
                                        } else { subirPlantilla() }
                                    }
                                },
                            ]), Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
                        }}
                    >
                        <Text style={styles.txtBtnSalir}>
                            Subir plantilla
                        </Text>
                    </Pressable>

                </View>

                <View style={styles.containerA}>
                    <TextInput style={styles.txtForm}
                        placeholder={plantillaEditable.titulo}
                        onChangeText={(txt) => { setTituloPlantilla(txt) }}
                        placeholderTextColor="#a0a0a0"
                    />

                    <Text style={styles.txtFecha}>Fecha de edición: {date} {hora}</Text>
                </View>

                <View style={styles.containerF}>
                    
                <KeyboardAvoidingView
                    
                        style={{flexDirection: 'column', zIndex:0, marginHorizontal:20}} 
                        behavior={Platform.OS === 'ios' ? 'position' : null}

                    >
                        <ScrollView
                            animated={true}
                            alwaysBounceVertical={false}
                            showsVerticalScrollIndicator={false}
                            automaticallyAdjustContentInsets={true}
                            style={styles.scroll}
                        >


                            {preguntas.map((pregunta, index) => (


                                <View
                                    key={index}
                                    style={styles.containerPregunta}>

                                    <View style={styles.containerPreguntaA}>

                                        {tituloPreguntaFuncion(pregunta)}

                                        <View style={styles.containerBotones}>
                                            <View style={styles.containerPreguntaSegundos}>
                                                <AntDesign name="clockcircle" size={20} color="#a0a0a0" />
                                                <ModalSelector
                                                    style={styles.modalselector}
                                                    initValue={pregunta.tiempo}
                                                    cancelButtonAccessibilityLabel={'Cancelar'}
                                                    data={data}
                                                    touchableActiveOpacity={0}
                                                    onChange={(option) => { pregunta.tiempo = option.label }}
                                                    value={pregunta.tiempo}
                                                    onModalOpen={() => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning)}
                                                    selectStyle={{ borderWidth: 0 }}
                                                    selectTextStyle={{ color: '#0F74F2' }}
                                                    initValueTextStyle={{ color: '#0F74F2' }}>
                                                </ModalSelector>
                                            </View>

                                            <View style={styles.containerBotones}>
                                                <Pressable
                                                    style={({ pressed }) => [
                                                        { borderRadius: 10 },
                                                        pressed ? { opacity: 0.2 } : {},
                                                    ]}
                                                    onPress={() => { eliminarPregunta(index), pregunta.tituloPregunta = "", Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy) }}>
                                                    <MaterialCommunityIcons name="delete-forever" size={27} color="#a0a0a0" />
                                                </Pressable>
                                            </View>

                                        </View>

                                    </View>

                                    <View style={styles.containerPreguntaC}>
                                        <Pressable
                                            style={({ pressed }) => [
                                                { borderRadius: 10 },
                                                pressed ? { opacity: 0.2 } : {},
                                            ]}
                                            onPress={() => { pregunta.opcion.push('Ingresa Opcion'), renderizarOpciones(), Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success) }}>
                                            <Text style={styles.txtbtnAgregarInciso}>Agregar opcion</Text>
                                        </Pressable>

                                    </View>


                                    {pregunta.opcion.map((opc, ind) => (
                                        <View key={ind} style={styles.containerPreguntaC}>


                                            {elegirOpcion(pregunta, ind)}

                                            <TextInput
                                                style={styles.textInputOpcion}
                                                placeholder={opc}
                                                placeholderTextColor="#a0a0a0"
                                                onChangeText={(text) => { pregunta.opcion[ind] = text }}
                                            >
                                            </TextInput>


                                            <View
                                                style={styles.containerOpcionesBtns}>
                                                <Pressable
                                                    style={({ pressed }) => [
                                                        { borderRadius: 10 },
                                                        pressed ? { opacity: 0.2 } : {},
                                                    ]}
                                                    onPress={() => { pregunta.opcion.splice(ind, 1), renderizarOpciones(), Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error) }}
                                                >
                                                    <Text style={styles.txtbtnAgregarInciso}>Eliminar</Text>
                                                </Pressable>

                                            </View>
                                        </View>
                                    ))}

                                </View>

                            ))}

                            <View style={styles.containerFin}>


                                <Pressable
                                    style={({ pressed }) => [
                                        {
                                            borderRadius: 10,
                                            marginTop: 10,
                                            alignItems: "center",
                                            marginBottom: 50
                                        },
                                        pressed ? { opacity: 0.2 } : {},
                                    ]}
                                    onPress={() => { agregarPregunta(), Haptics.selectionAsync(), console.log(preguntas) }}>
                                    <AntDesign name="pluscircle" size={35} color="#a0a0a0" />
                                </Pressable>


                            </View>
                        </ScrollView>

                    </KeyboardAvoidingView>
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
    containerA: {
        marginHorizontal: 20,
        zIndex:2,
        backgroundColor: '#fff',
    },
    txtForm: {
        fontSize: 30,
        color: "#000",
    },
    txtFecha: {
        color: "#a0a0a0",
        marginTop: 10,
        marginBottom: 20
    },
    containerPregunta: {
        borderColor: '#D9D9D9',
        borderWidth: 1,
        borderRadius: 10,
        padding: 20,
        marginBottom: 10

    },
    textInputPregunta: {
        width: 130,
        marginRight: '12%'
    },

    textInputOpcion: {
        maxWidth: 230

    },
    containerPreguntaA: {
        flexDirection: 'row',
        marginBottom: 5,
        justifyContent: 'space-between',
        alignItems: 'center',
        alignContent: 'center',
    },

    containerPreguntaB: {
        flexDirection: 'row',
        marginBottom: 5,
        marginTop: 10,

    },
    containerPreguntaC: {
        flexDirection: 'row',
        marginBottom: 5,
        marginTop: 10,
        display: 'flex',
        alignItems: 'center',

    },

    containerPreguntaSegundos: {
        borderColor: '#D9D9D9',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 2,
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
        marginRight: 10,
        color: 'black',
        maxHeight: 40,
        alignItems: 'center',
        justifyContent: 'center',

    },
    containerPreguntaBorrar: {
        borderColor: '#D9D9D9',
        borderWidth: 1,
        borderRadius: 10,
        width: 30,
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        maxHeight: 40,
    },

    containerBotones: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    modalselector: {
        borderWidth: 0,
        marginLeft: 5,
        fontSize: 1,
        color: '#0F74F2'
    },

    containerOps: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    txtOps: {
        fontSize: 18
    },
    txtOps2: {
        marginLeft: "6",
        fontSize: 18
    },
    containerR: {
        marginTop: 20,
        alignItems: "baseline",
        marginBottom: 20
    },
    btnMas: {

    },
    txtbtnAgregarInciso: {
        color: '#0F74F2'
    },

    containerOpcionesBtns: {
        flex: 1,
        flexDirection: "row-reverse",
    },
    textBtnSubir: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },

    degradado: {
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        width: '100%',
        height: '100%'
    },
    txtBtnSalir: {
        color: '#0F74F2',
        fontSize: 16,
        fontWeight: "400",
    },
    containerFin: {
        marginBottom: 200
    },
    scroll: {
        paddingBottom: 50,
        flexGrow: 1,

    },

})

export default EditarPlantilla