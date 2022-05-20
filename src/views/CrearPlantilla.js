import React, { useState, useEffect } from "react";
import { SafeAreaView, ScrollView, StyleSheet, View, Image, Pressable, TextInput, KeyboardAvoidingView } from "react-native";
import { auth } from '../../database/firebase'
import ModalSelector from 'react-native-modal-selector'
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';


import { RadioButton, Text } from 'react-native-paper';
const CrearPlantilla = () => {


    //FUNCION QUE CHECKEA LOS INSISOS Y SI ESTOS ESTAN VACIOS PARA POSTETIOR AGREGADO
    // function funcionInsisos(obj,index) {        
    //     if ((Object.keys(obj).length === 0) === false) {

    //         return( //Objeto con elementos
    //             console.log(preguntas)
    //         )

    //     }else{


    //         return(//Objeto sin elementos

    //             <Pressable
    //             onPress={() => agregarOpcion(obj,index)}>
    //                 <Text style={styles.txtbtnAgregarInciso}>Agregar opcion</Text>
    //             </Pressable>
    //         )
    //     }

    // }



    //VARIABLE PRINCIPAL DE PREGUNTAS

    const [preguntas, setPreguntas] = useState(
        [{
            tituloPregunta: '',
            tiempo: '5',
            opcion: ['Opcion'],
            respuestaInciso: null
        }])

    const [inputOpcion, setInputOpcion] = useState("")


    const agregarPregunta = () => {
        setPreguntas
            ([...preguntas, {
                tituloPregunta: '',
                tiempo: '5',
                opcion: ['Opcion'],
                respuestaInciso: null
            }])
    }

    const eliminarPregunta = (index) => {
        const cambio = [...preguntas]
        cambio.splice(index, 1)
        setPreguntas(cambio)
    }

    const renderizarOpciones = () => {
        setPreguntas([...preguntas])
    }





    //Variables del picker modal
    let indx = 0;
    const data = [
        { key: indx++, section: true, label: 'Segundos' },
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

                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    animated={true}

                >

                    <ScrollView
                        alwaysBounceVertical={false}
                        showsVerticalScrollIndicator={false}

                    >
                        {/************* AREA DE PREGUNTAS ********************/}
                        {preguntas.map((pregunta, index) => (

                            <View key={index} style={styles.containerPregunta}>

                                <View style={styles.containerPreguntaA}>
                                    <TextInput
                                        style={styles.textInputPregunta}
                                        placeholder="Ingresa la pregunta"
                                        placeholderTextColor="#a0a0a0"
                                        onChangeText={(txt) => { pregunta.tituloPregunta = txt }}
                                        multiline={true}
                                    >
                                    </TextInput>

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
                                                selectStyle={{ borderWidth: 0 }}
                                                selectTextStyle={{ color: '#0F74F2' }}
                                                initValueTextStyle={{ color: '#0F74F2' }}>
                                            </ModalSelector>
                                        </View>

                                        <View style={styles.containerBotones}>
                                            <Pressable
                                                onPress={() => { eliminarPregunta(index), pregunta.tituloPregunta = "" }}>
                                                <MaterialCommunityIcons name="delete-forever" size={27} color="#a0a0a0" />
                                            </Pressable>
                                        </View>

                                    </View>



                                </View>

                                <View style={styles.containerPreguntaC}>
                                    <Pressable
                                        onPress={() => { pregunta.opcion.push('opcion'), console.log(preguntas), renderizarOpciones() }}>
                                        <Text style={styles.txtbtnAgregarInciso}>Agregar opcion</Text>
                                    </Pressable>


                                </View>

                                {pregunta.opcion.map((option, ind) => (
                                    <View key={ind} style={styles.containerPreguntaC}>

                                        <Text style={{ color: "#a0a0a0" }}> •   </Text>

                                        <TextInput
                                            style={styles.textInputOpcion}
                                            placeholder='Ingresa una respuesta'
                                            placeholderTextColor="#a0a0a0"
                                            onChangeText={(text) => { pregunta.opcion[ind] = text }}
                                        >
                                        </TextInput>


                                        <View
                                            style={styles.containerOpcionesBtns}>
                                            <Pressable
                                                onPress={() => { pregunta.opcion.splice(ind, 1), renderizarOpciones() }}

                                            >
                                                <Text style={styles.txtbtnAgregarInciso}>Eliminar</Text>
                                            </Pressable>


                                        </View>
                                    </View>
                                ))}



                            </View>
                        ))}

                        {/* $$$$$$$$$$$$$$$$$$$$ TERMINA AREA DE PREGUNTAS $$$$$$$$$$$$$$$$$$$$$ */}





                        <Pressable style={styles.btnMas}
                            onPress={() => agregarPregunta()}>
                            <AntDesign name="pluscircle" size={35} color="#a0a0a0" />
                        </Pressable>

                    </ScrollView>

                </KeyboardAvoidingView>


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

    textInputOpcion: {

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
        marginTop: 30,
        alignItems: "center",
        marginBottom: 200
    },
    txtbtnAgregarInciso: {
        color: '#0F74F2'
    },

    containerOpcionesBtns: {
        flex:1,
        flexDirection:"row-reverse",    
    },

})

export default CrearPlantilla
