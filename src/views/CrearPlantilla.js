import React, { useState, useEffect } from "react";
import { SafeAreaView, ScrollView, StyleSheet, View, Image, Pressable, TextInput} from "react-native";
import { auth } from '../../database/firebase'
import { RadioButton, Text } from 'react-native-paper';

const CrearPlantilla = () => {
 
    useEffect(() => {
      var date = new Date().getDate(); //Current Date
      var month = new Date().getMonth() + 1; //Current Month
      var year = new Date().getFullYear(); //Current Year
      var hours = new Date().getHours(); //Current Hours
      var min = new Date().getMinutes(); //Current Minutes

      if(date<10){
          date = "0" + date
      }
      if(month<10){
          month = "0" + month
      }
      if(hours < 10){
          hours = "0" + hours
      }
      if(min < 10){
          min = "0" + min
      }

      setDate({
          dateDay: date + '/' + month + '/' + year,
          dateHour: hours + ':' + min
      }
      );
    }, []);

    //Todos los datos del formulario
    const [ titulo, setTitulo ] = useState("") 
    const [ autor, setAutor ] = useState("")
    const [ fechaCreacion, setFechaCreacion ] = useState("")
    const [ fechaAct, setFechaAct ] = useState("")
    const [ preguntas, setPreguntas ] = useState([{
        titulo: "¿2+2?",
        tiempo: 5,
        respuestas: [
            "5",
            "4"
        ]
    }])

    const [date, setDate] = useState("")
    const [ opPregunta, setOpPregunta ] = useState({})
    // const [ plantilla, setPlantilla] = useState({
    //     titulo: "",
    //     autor: auth.currentUser.email,
    //     fechaCreacion: "",
    //     fechaActualizacion: null,
    //     preguntas: [{
    //         titulo: "",
    //         tiempo: 5, //En segundos
    //         respuestas: [
    //         ],
    //         repCorrecta: null //Posicion en el array de respuestas
    //     }]
    // });

    return (
        <SafeAreaView style={styles.container}>
            {/* container principal */}
            <View style={styles.containerF}>

                {/* Titulos */}
                <TextInput style={styles.txtForm}
                    placeholder = "Titulo de la plantilla"
                    onChangeText = {(txt) => setTitulo(txt)}
                    placeholderTextColor="#a0a0a0"
                />

                <Text style={styles.txtFecha}>Fecha de creación: {date.dateDay} {date.dateHour}</Text>

                <ScrollView
                    alwaysBounceVertical = {false}
                >

                    { preguntas.map((pregunta, index) => (                      
                        <View style={styles.containerP} key={index}>

                            {/* Pregunta contenedor "pregunta" */}
                            <View style={styles.containerOps}>
                                <TextInput 
                                    style={styles.txtOps}
                                    placeholderTextColor="#a0a0a0"
                                    placeholder="Ingresa una pregunta"
                                    onChangeText={ (txt) => {pregunta.titulo = txt}}
                                />


                            </View>
                            <DropDownPicker
                                    items={[
                                        {label: 'Apple', value: 'apple'},
                                        {label: 'Banana', value: 'banana'}
                                    ]}       
                                />
                            {/* Pregunta contenedor respuesta */}
                            <View style={styles.containerR}>
                                {/* <RadioButton.Group
                                    onValueChange={value => setOpPregunta(value)}
                                    value={opPregunta}
                                >
                                    <View>
                                    <Text>First</Text>
                                    <RadioButton value="first" />
                                    </View>
                                    <View>
                                    <Text>Second</Text>
                                    <RadioButton value="second" />
                                    </View>
                                    <View>
                                    <Text>Second</Text>
                                    <RadioButton value="third" />
                                    </View>
                                </RadioButton.Group> */}
                            </View>
                        </View>
                    ))}
                    
                    <Pressable style={styles.btnMas}>
                        <Image
                        style={{ width: 25, height: 25 }}
                        source={require("../img/mas.png")}
                        />
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
    containerF:{
        marginHorizontal: 20,
        marginTop: 10,
    },
    txtForm:{
        fontSize: 30,
        color: "#000",
    },
    txtFecha:{
        color: "#a0a0a0",
        marginTop: 10, 
        marginBottom: 20
    },
    containerP:{
        borderColor: '#D9D9D9',
        borderWidth: 1,
        borderRadius: 10,
        padding: 20,
        marginBottom: 10
    },
    containerOps:{
        flexDirection: "row",
        justifyContent: "space-between",
    },
    txtOps:{
        fontSize: 18
    },
    txtOps2:{
        marginLeft:110,
        fontSize: 18
    },
    containerR:{
        marginTop:20,
        alignItems:"baseline",
        marginBottom: 20
    },
    btnMas:{
        marginTop:30,
        alignItems:"center"
    }
    
})

export default CrearPlantilla;
