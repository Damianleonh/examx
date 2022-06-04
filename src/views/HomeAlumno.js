import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Text, View, SafeAreaView, ScrollView, Pressable, StyleSheet, Alert} from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import { signOut } from 'firebase/auth'
import { auth } from '../../database/firebase'
import { doc, getDocs, collection, where, query, onSnapshot, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase-config';
import { Fontisto } from '@expo/vector-icons';
import ModalAplicarExamen from './ModalAplicarExamen'
import * as Haptics from 'expo-haptics';

const onSignOut = () => {

  Alert.alert(
    "Alerta",
    "¿Estas seguro de cerrar sesión?",
    [
      {
        text: 'Cancelar',
        onPress: () => {
          return
        }
      },

      {
        text: 'Si',
        onPress: () => {
          signOut(auth).catch( error => {
            Alert.alert(
              "Error",
              "Error al cerrar sesion"
            )
        
          })
        }
      }

    ]
  )

}


const HomeAlumno = ( {navigation} ) => {

  const [ misExamenes, setMisExamenes] = useState([])  
  const [ misPlantillasID, setMisPlantillasID ] = useState([])
  const [ plantillas, setPlantillas ] = useState([])
  const [ isloaded, setIsLoaded ] = useState(false)
  const [ tamUnic, setTamUnic ] = useState(null)
  const [modalExamen,setModalExamen] = useState(false)

  const [miPlantilla,setMiPlantilla] = useState([])

  //Obtener examenes creados por ID
  useLayoutEffect(()=>{
    const q = query(collection(db, "examenes"), where("alumnosSelected", "array-contains-any", [auth.currentUser.email]))
    const unsuscribe = onSnapshot(q, (querySnapshot) => {

        let tempArr = []
        querySnapshot.forEach((doc) => {
            tempArr.push(doc.data())
        })

        setMisExamenes(tempArr)

        if( tempArr.length > 0){

          let tmpPlantID = []
          tempArr.forEach( (v)=>{
            tmpPlantID.push(v.plantillaid)
          })
          setMisPlantillasID(tmpPlantID)
        }

    })

  }, [])

  //Filtrar y agregar plantillas por ID
  useLayoutEffect(()=>{

    setPlantillas([])

    misPlantillasID.forEach((a)=>{

      const q = query(collection(db, "plantillas"), where("id", "==", a))
      const unsuscribe = onSnapshot(q, (querySnapshot) => {
  
          querySnapshot.forEach((doc) => {
            setPlantillas( last => [ ...last, doc.data()])
          })
      })   
    })

    if(plantillas.length > 0){
      setIsLoaded(true)
    }

  }, [misPlantillasID])


  //Filtrar plantillas duplicadas
  useLayoutEffect(()=>{
    let uniqueArray = plantillas.filter((value, index, self) =>
      index === self.findIndex((t) => (
        t.id === value.id
      ))
    )
    
    setPlantillas(uniqueArray)
    setTamUnic(uniqueArray.length)

  },[isloaded])

  //Retornar el nombre de la plantilla
  const nombrePlantillas = (index) => {
    let nm = ""
    plantillas.forEach((item) => {
      if (item.id === index) {

        nm = item.titulo
      }
    })

    return nm
  }


  const obtenerPlantilla = (plantillaid) => {
    let nm = ""
    plantillas.forEach((item) => {
      if (item.id === plantillaid) {
        nm = item
      }
    })

    return nm
  }

  
  const calcularTiempo = (obj) =>{

    let tiempo = 0
    let ctrl = true

    plantillas.forEach((e) =>{
        if(obj === e.id && ctrl){ 
          e.preguntas.forEach(j => {
            tiempo = tiempo + parseInt(j.tiempo)
          })
          ctrl = false
        }
    })

    return "Tiempo estimado: "+tiempo+"s"

  }

  return (
    <SafeAreaView style={styles.container} >

        {/* Titulo */}
        <Text style={styles.titulo}>
            Inicio
        </Text>
        
        {/* Boton cerrar sesión */}
        <SafeAreaView style={styles.logouticon}>
          <FontAwesome 
            color={"#0F74F2"}
            borderRadius="100" 
            size={25} 
            name="sign-out" 
            onPress={onSignOut}
          />
        </SafeAreaView>

        {/* Barra de opciones */}
        <View style={styles.optionsMenu}>

          <Pressable
            onPress={ () => {
              navigation.navigate("IngresarCodigo")
            }}
          >
            <View 
              style={styles.optMenuCard}
            >
              <FontAwesome 
                style={styles.iconfaws}
                color={"#808080"}
                borderRadius="100" 
                size={20} 
                name="qrcode" 
              />
              <Text style={styles.optMenuCardTxt}>
                Ingresa a examen con codigo
              </Text>
            </View>
          </Pressable>

          <Pressable
            onPress={ () => {
              navigation.navigate("HistorialExamen")
            }}            
          >            
            <View style={styles.optMenuCard}>
              <FontAwesome 
                style={styles.iconfaws}
                color={"#808080"}
                borderRadius="100" 
                size={20} 
                name="clock-o" 
              />
              <Text style={styles.optMenuCardTxt}>
                Historial de examenes
              </Text>
            </View>
          </Pressable>

        </View>

        {/* Subtitulo examenes en curso */}
        <Text style={styles.titulo2}>
            Mis exámenes
        </Text>

        {/* Lista de examenes en curso */}
        <ScrollView style={styles.scroll}
          alwaysBounceVertical={true}
        >
          {misExamenes.length > 0 &&
            misExamenes.map((examen, index) => (

              <View style={styles.exmCardContainer} key={index}>

                {/* Grado y grupo */}
                <Text style={styles.gradoTxt}>{examen.gradoGrupo}</Text>

                {/* Linea azul */}
                <View style={styles.linea}></View>

                {/* Nombre de examen y porcentaje */}
                <View>
                  <Text style={styles.examenTitle}>{nombrePlantillas(examen.plantillaid)}</Text>
                  <Text style={styles.examenPorc}> {calcularTiempo(examen.plantillaid)}</Text>
                </View>


                <View style={styles.opcionArea}>
                <Pressable 
                  style={({ pressed }) => [
                    pressed ? { opacity: 0.1, padding: 1 } : {},
                  ]}
                  onPress={() => { setModalExamen(!modalExamen), Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success),setMiPlantilla(obtenerPlantilla(examen.plantillaid))}}>
                  <Fontisto name="nav-icon-grid-a" size={27} color="#0F74F2" />
                </Pressable>

                <ModalAplicarExamen
                modalExamen={modalExamen}
                setModalExamen = {setModalExamen}
                examen={examen}
                plantilla = { miPlantilla}
                />

                
              </View>
              </View>
            ))
          }

          {misExamenes.length === 0 && (
            <Text style={styles.advertencia}>No se te ha asignado ningun examen</Text>
          )}

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
  
  optionsMenu:{
    marginTop: 20,
    flexDirection: 'column'
  },

  optMenuCard:{
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

  optMenuCardTxt:{
    marginLeft: 5,
    color: '#808080',
    fontWeight: '500'
  },

  titulo2:{
    marginTop: 10,
    marginBottom: 10,
    fontSize: 30,
    color: "#a0a0a0"
  },

  exmCardContainer:{
    borderColor: '#D9D9D9',
    borderWidth: 1,
    borderRadius: 10,
    height: 70,
    paddingHorizontal: 20,
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 10
  },

  gradoTxt:{
    fontSize: 30,
    fontWeight: '500',
    color: '#0F74F2'
  },

  linea:{
    width: 1,
    backgroundColor: "#0F74F2",
    height: "70%",
    marginHorizontal: 10
  },

  examenTitle:{
    color: "#000",
    // fontSize: 16
  },

  examenPorc:{
    color: "#0F74F2",
  },

  scroll:{
    height: '100%'
  },

  logouticon:{
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 68,
    right: 0
  },

  advertencia: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 18,
    color: '#8e8e8e'
},
opcionArea: {
  position: 'relative',
  marginLeft: 120,
  alignItems: 'center',
  justifyContent: 'center',
},
})

export default HomeAlumno