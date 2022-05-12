import React, { useState, useEffect } from "react";
import { SafeAreaView, ScrollView, StyleSheet, View, Image, Pressable, TextInput } from "react-native";
import { auth } from '../../database/firebase'
import ModalSelector from 'react-native-modal-selector'
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';


import { RadioButton, Text } from 'react-native-paper';
const CrearPlantilla = () => {

    //VARIABLE PRINCIPAL DE PREGUNTAS

    const [preguntas, setPreguntas] = useState([
        {
            tituloPregunta: '',
            tiempo: '',
            incisos: {
                inciso1:''
            },
            respuestaInciso: {}
        },
    ])


    const agregarPregunta = () => {
        setPreguntas([...preguntas, {
            tituloPregunta: '',
            tiempo: '',
            incisos: {
                a:'Valor 1'
            },
            respuestaInciso: {}
        }])
    }

    const eliminarPregunta = (index) => {
        const cambio = [...preguntas]
        cambio.splice(index, 1)
        setPreguntas(cambio)
    }


    //Variables del picker modal
    let indx = 0;
    const data = [
        { key: indx++, section: true, label: 'Segundos' },
        { key: indx++, label: '5 Segundos' },
        { key: indx++, label: '10 Segundos' },
        { key: indx++, label: '20 Segundos' },
        { key: indx++, label: '30 Segundos' },
        { key: indx++, label: '1 Minuto' },
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

        setDate({
            dateDay: date + '/' + month + '/' + year,
            dateHour: hours + ':' + min
        }
        );
    }, []);

    //TERMINA AREA FECHA --------------------------------------------------------------

    //Todos los datos del formulario
    const [titulo, setTitulo] = useState("")
    const [autor, setAutor] = useState("")
    const [fechaCreacion, setFechaCreacion] = useState("")
    const [fechaAct, setFechaAct] = useState("")



    const [date, setDate] = useState("")


    return (
        <SafeAreaView style={styles.container}>
            {/* container principal */}
            <View style={styles.containerF}>

                {/* Titulos */}
                <TextInput style={styles.txtForm}
                    placeholder="Titulo de la plantilla"
                    onChangeText={(txt) => setTitulo(txt)}
                    placeholderTextColor="#a0a0a0"
                />

                <Text style={styles.txtFecha}>Fecha de creación: {date.dateDay} {date.dateHour}</Text>

                <ScrollView
                    alwaysBounceVertical={false}
                >
                    {/************* AREA DE PREGUNTAS ********************/}
                    {preguntas.map((pregunta, index) => (
                        <View key={index} style={styles.containerPregunta}>
                            <View style={styles.containerPreguntaA}>
                                <TextInput
                                    style={styles.textInputPregunta}
                                    placeholder="Ingresa la pregunta"
                                    placeholderTextColor="#a0a0a0"
                                    onChangeText={(txt) => pregunta.tituloPregunta(txt)}
                                    multiline={true}
                                >
                                </TextInput>

                                <View style={styles.containerPreguntaSegundos}>
                                    <AntDesign name="clockcircle" size={20} color="#a0a0a0" />
                                    <ModalSelector
                                        style={styles.modalselector}
                                        initValue="5 segundos"
                                        cancelButtonAccessibilityLabel={'Cancelar'}
                                        data={data}
                                        touchableActiveOpacity={0}
                                        // onChange={(option) => { alert(`${option.label} (${option.key}) nom nom nom`) }}
                                        selectStyle={{ borderWidth: 0 }}
                                        selectTextStyle={{ color: '#0083B0' }} />
                                </View>


                                <View style={styles.containerPreguntaBorrar}>
                                    <Pressable
                                    onPress={() => eliminarPregunta(index)}>
                                        <MaterialCommunityIcons name="delete-forever" size={27} color="#a0a0a0" />
                                    </Pressable>
                                    
                                </View>
                            </View>

                            


                        </View>
                    ))}

                    {/* $$$$$$$$$$$$$$$$$$$$ TERMINA AREA DE PREGUNTAS $$$$$$$$$$$$$$$$$$$$$ */}





                    <Pressable style={styles.btnMas}
                        onPress={() => agregarPregunta()}>
                        <AntDesign name="pluscircle" size={35} color="#a0a0a0" />
                    </Pressable>

                </ScrollView>

            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1
    },
    containerF: {
        marginHorizontal: 20,
        marginTop: 10,
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
    containerPreguntaA: {
        flexDirection: 'row',
        marginBottom:5,
        
    },
    containerPreguntaSegundos: {
        borderColor: '#D9D9D9',
        borderWidth: 1,
        borderRadius: 10,
        padding: 3,
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
        marginRight: 10,
        width: 130,
        maxHeight: 40

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
        maxHeight: 40
    },
    modalselector: {
        borderWidth: 0,
        marginLeft: 5,
        fontSize: 1
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
        marginTop: 30,
        alignItems: "center"
    }

})

export default CrearPlantilla
