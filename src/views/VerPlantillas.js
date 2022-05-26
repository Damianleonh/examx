import React, { useLayoutEffect, useState} from 'react'
import { View, SafeAreaView, Text, StyleSheet, Pressable, ScrollView} from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import { auth } from '../../database/firebase'
import {  doc, getDocs, collection, where, query, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase-config';

const VerPlantillas = () => {

    const [ plantillas, setPlantillas ] = useState([])

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

    const calcularTiempo = (obj) =>{
        let tiempo = 0
        obj.preguntas.forEach((val)=>{
            tiempo += parseInt(val.tiempo)
        })

        return tiempo+"s"
    }

    return (
        <SafeAreaView style={styles.container}>

            {/* Titulo */}
            <Text style={styles.titulo}>Ver plantillas</Text>

            {/* Plantillas */}
            <ScrollView style={styles.plantillasScroll} alwaysBounceVertical={false}>

                {/* -------Una sola plantilla---------*/}
                { plantillas.map((plantilla, index) =>(

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
                            >
                                <FontAwesome 
                                    style={styles.iconfaws}
                                    color={"#808080"}
                                    borderRadius="100" 
                                    size={20} 
                                    name="edit" 
                                />
                            </Pressable>
                            <Pressable>
                                <FontAwesome 
                                    style={styles.iconfaws}
                                    color={"#808080"}
                                    borderRadius="100" 
                                    size={20} 
                                    name="trash" 
                                />
                            </Pressable>
                        </View>
                    </View>
                )) }
                {/* ------------------------------------ */}
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        marginHorizontal: 20,
    },
    
    titulo:{
        marginTop: 10,
        fontSize: 30
    },

    plantillasScroll:{
        marginTop: 20,
        flexDirection: 'column'
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

    viewTxt:{
        
    },

    tmpEstTxt:{
        marginTop: 5,
        color: '#0F74F2'

    }
})

export default VerPlantillas