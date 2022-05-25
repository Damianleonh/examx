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

    return (
        <SafeAreaView style={styles.container}>

            {/* Titulo */}
            <Text style={styles.titulo}>Ver plantillas</Text>

            {/* Plantillas */}
            <ScrollView style={styles.plantillasScroll}>

                {/* -------Una sola plantilla---------*/}
                { plantillas.map((plantilla, index) =>(

                    <Pressable >
                        <View style={styles.plantCard} >
                            <FontAwesome 
                                style={styles.iconfaws}
                                color={"#808080"}
                                borderRadius="100" 
                                size={20} 
                                name="qrcode" 
                            />
                            <Text style={styles.plantCardTxt}>
                                {plantilla.titulo}
                            </Text>
                        </View>
                    </Pressable>

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
        height: 50,
        paddingHorizontal: 10,
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 10,
    },

    iconfaws:{
        marginLeft: 5
    },

    plantCardTxt:{
        marginLeft: 5,
        color: '#808080',
        fontWeight: '500'
    }
})

export default VerPlantillas