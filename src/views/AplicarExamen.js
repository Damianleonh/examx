import React, { useState, useLayoutEffect, useRef} from 'react'
import { View, SafeAreaView, Text, StyleSheet, ScrollView, Dimensions, Image, Pressable} from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import VerPlantillas from './VerPlantillas'
import { auth } from '../../database/firebase'
import { collection, where, query, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase-config';
import { backgroundColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes'

const AplicarExamen = () => {

    // ----Zona de hooks---
    const [ plantillas, setPlantillas ] = useState([])
    const [ scrollIndex, setScrollIndex] = useState(1)
    const [ plantillaSelected, setPlantillaSelected ] = useState(null)
    const [ buttonState, setButtonState ] = useState(true)
    const scrollRef = useRef()

    //---Cargar plantillas disponibles---
    useLayoutEffect( ()=>{
        const q = query(collection(db, "plantillas"), where("autor", "==", auth.currentUser.email))
        const unsuscribe = onSnapshot(q,(querySnapshot)=>{

            let tempArr = []
            querySnapshot.forEach((doc) => {
                tempArr.push(doc.data())
            })

            setPlantillas(tempArr)
        })
    }, [])

    // ------Calcular tiempo de plantillas----
    const calcularTiempo = (obj) =>{
        let tiempo = 0
        obj.preguntas.forEach((val)=>{
            tiempo += parseInt(val.tiempo)
        })

        return tiempo+"s"
    }

    const horizontalScroll = () =>{
        scrollRef.current.scrollTo({ x: Dimensions.get('window').width * scrollIndex})
        setScrollIndex(scrollIndex+1)
    }

    return (
        <SafeAreaView style={styles.safeaview}>
            <View style={styles.container}>
                <Text style={styles.titulo}>Aplicar examen</Text>
                <Text style={styles.subtitulo}>Gestor de aplicación de examenes</Text>
            </View>

            <ScrollView
                style={styles.slider}
                horizontal={true}
                pagingEnabled={true}
                showsHorizontalScrollIndicator={false}
                bounces={false}
                scrollEnabled={false}
                ref={scrollRef}
            >
                {/* ------Apartado plantillas-------- */}
                <View style={styles.apartado}>
                    <Text style={styles.indicacion}>Selecciona una plantilla para continuar</Text>
                    <ScrollView
                        alwaysBounceVertical={false}
                    >
                        {/* -------Mapeo de plantillas----------*/}
                        { plantillas.map((plantilla, index) =>(

                            <Pressable
                                onPress={()=>{
                                    setPlantillaSelected(index)
                                    setButtonState(false)
                                }}
                            >
                                <View style={ plantillaSelected === index ? styles.plantCardSelec : styles.plantCard } >

                                    <View style={styles.viewTxt}>                            
                                        <Text style={styles.plantCardTxt}>
                                            {plantilla.titulo}
                                        </Text>
                                        <Text style={styles.tmpEstTxt}>
                                            Tiempo total: {calcularTiempo(plantilla)}
                                        </Text>
                                    </View>

                                </View>
                            </Pressable>

                        )) }
                        {/* ------------------------------------ */}
                    </ScrollView>
                </View>


                {/*--------Apartado alumnos-----------*/}
                <View style={styles.apartado}>
                    <Text>Alumnos</Text>
                </View>


                {/*--------Apartado grado grupo-------*/}
                <View style={styles.apartado}>
                    <Text>Grado y grupo</Text>
                </View>

            </ScrollView>

            {/*-------Boton siguiente--------*/}
            <View style={styles.btnContainer}>
                <Pressable style={buttonState ? styles.buttondis : styles.button}
                    onPress={()=> {
                        horizontalScroll()
                        setButtonState(true)
                    }}
                    disabled={buttonState}
                >
                    <Text style={styles.buttonText}>
                        Siguiente
                    </Text>
                </Pressable>
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
        height: 500,
        paddingHorizontal: 20,
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

    plantCardSelec:{
        borderColor: '#fff',
        borderWidth: 1,
        borderRadius: 10,
        height: 65,
        paddingHorizontal: 15,
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 10,
        backgroundColor: '#f0f0f0',
        justifyContent: 'space-between'
    },

    iconfaws:{
        marginLeft: 5,
        borderColor: '#d0d0d0',
        borderWidth: 1,
        borderRadius: 4,
        padding: 4
    },

    plantCardTxt:{
        fontSize: 16,
        color: '#808080',
        fontWeight: '500'
    },

    accbtn:{
        flexDirection: 'row',
        alignItems: 'center'
    },

    tmpEstTxt:{
        marginTop: 5,
        color: '#0F74F2'
    },

    indicacion:{
        textAlign: 'center',
        color: '#0F74F2',
        fontSize: 16,
        marginVertical: 20,
        fontWeight: '600'
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

    slider:{
    },

    btnContainer:{
        // backgroundColor: '#f00',
        position: 'relative',
        bottom: 30,
        alignItems: 'center'
    }
})

export default AplicarExamen