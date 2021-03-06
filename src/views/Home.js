import React, { useEffect, useState } from 'react'
import { Text, View, SafeAreaView, ScrollView, Pressable, StyleSheet, Alert, Modal } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { FontAwesome } from '@expo/vector-icons'
import { signOut } from 'firebase/auth'
import { auth } from '../../database/firebase'
import { collection, where, query, onSnapshot, addDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase-config';
import * as Haptics from 'expo-haptics';
import CrearPlantilla from './CrearPlantilla'
import { Fontisto } from '@expo/vector-icons';
import ModalExamen from './ModalExamen'

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
          signOut(auth).catch(error => {
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

const Home = ({ navigation }) => {


  <Fontisto name="nav-icon-grid-a" size={27} color="#0F74F2" />

  const [modalVisibleCrearPlantilla, setModalVisibleCrearPlantilla] = useState(false)

  const [examenes, setExamenes] = useState([])
  const [plantillas, setPlantillas] = useState([])

  const [modalExamen, setModalExamen] = useState(false)

  const [tituloPlantilla, setTituloPlantilla] = useState('')

  const [examenSeleccionado, setExamenSeleccionado] = useState({
    maestro: auth.currentUser.email,
    codigoExamen: '11111',
    alumnosSelected: ['a','a'],
    plantillaid: null,
    gradoGrupo:null,
    estado: false
  })

  useEffect(() => {
    //Consulta examenes
    const q = query(collection(db, "examenes"), where("maestro", "==", auth.currentUser.email))
    const unsuscribe = onSnapshot(q, (querySnapshot) => {
      let tempArr = []
      querySnapshot.forEach((doc) => {
        tempArr.push(doc.data())
      })

      setExamenes(tempArr)
    })

    const q2 = query(collection(db, "plantillas"), where("autor", "==", auth.currentUser.email))
    const unsuscribe2 = onSnapshot(q2, (snap) => {
      let tempPlant = []
      snap.forEach((alumno) => {
        tempPlant.push(alumno.data())
      })
      setPlantillas(tempPlant)
    })

  }, [])


  const cantidadAlumnos = (index) => {

    let cant = examenes[index].alumnosSelected.length
    if (cant === 1) {
      cant += " Alumno"
    } else {
      cant += " Alumnos"
    }
    return cant

  }

  const nombrePlantillas = (index) => {
    let nm = ""
    plantillas.forEach((item) => {
      if (item.id === index) {
        nm = item.titulo
      }
    })

    return nm
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
          style={({ pressed }) => [
            styles.cardOpcion,
            pressed ? { opacity: 0.9, padding: 3 } : {},
          ]}
          onPress={() => { setModalVisibleCrearPlantilla(!modalVisibleCrearPlantilla), Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success) }}
        >
          <LinearGradient
            colors={["#8C4DE9", "#0083B0"]}
            start={{ x: 1, y: 0 }} end={{ x: 0, y: 1 }}
            style={styles.degradado}
          >
            <Text style={styles.cardTxt}>Crear plantilla</Text>
          </LinearGradient>
        </Pressable>


        <CrearPlantilla
          modalVisibleCrearPlantilla={modalVisibleCrearPlantilla}
          setModalVisibleCrearPlantilla={setModalVisibleCrearPlantilla}
        />

        <Pressable

          style={({ pressed }) => [
            styles.cardOpcion,
            pressed ? { opacity: 0.9, padding: 3 } : {},
          ]}
          onPress={() => { navigation.navigate('VerPlantillas'), Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success) }}
        >
          <LinearGradient
            colors={["#8C4DE9", "#0083B0"]}
            start={{ x: 1, y: 0 }} end={{ x: 0, y: 1 }}
            style={styles.degradado}
          >
            <Text style={styles.cardTxt}>Ver plantillas</Text>
          </LinearGradient>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.cardOpcion,
            pressed ? { opacity: 0.9, padding: 3 } : {},
          ]}
          onPress={() => { navigation.navigate('Alumnos'), Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success) }}
        >
          <LinearGradient
            colors={["#8C4DE9", "#0083B0"]}
            start={{ x: 1, y: 0 }} end={{ x: 0, y: 1 }}
            style={styles.degradado}
          >
            <Text style={styles.cardTxt}>Historial</Text>
          </LinearGradient>
        </Pressable>

        <Pressable

          style={({ pressed }) => [
            styles.cardOpcion,
            pressed ? { opacity: 0.9 } : {},
          ]}
          onPress={() => { navigation.navigate('AplicarExamen'), Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success) }}
        >
          <LinearGradient
            colors={["#8C4DE9", "#0083B0"]}
            start={{ x: 1, y: 0 }} end={{ x: 0, y: 1 }}
            style={styles.degradado}
          >
            <Text style={styles.cardTxt}>Crear examen</Text>
          </LinearGradient>
        </Pressable>
      </View>

      {/* Subtitulo examenes en curso */}
      <Text style={styles.titulo2}>
        Examenes
      </Text>

      {/* Lista de examenes en curso */}
      <ScrollView style={styles.scroll}
        alwaysBounceVertical={true}
      >

        {examenes.length > 0 &&
          examenes.map((examen, index) => (

            <View style={styles.exmCardContainer}>

              {/* Grado y grupo */}
              <Text style={styles.gradoTxt}>{examen.gradoGrupo}</Text>

              {/* Linea azul */}
              <View style={styles.linea}></View>

              {/* Nombre de examen y porcentaje */}
              <View>
                <Text style={styles.examenTitle}>{nombrePlantillas(examen.plantillaid)}</Text>
                <Text style={styles.examenPorc}> {cantidadAlumnos(index)}</Text>
              </View>

              <View style={styles.opcionArea}>
                <Pressable 
                  style={({ pressed }) => [
                    pressed ? { opacity: 0.1, padding: 1 } : {},
                  ]}
                  onPress={() => { setModalExamen(!modalExamen), Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success), setTituloPlantilla(nombrePlantillas(examen.plantillaid), setExamenSeleccionado(examen))}}>
                  <Fontisto name="nav-icon-grid-a" size={27} color="#0F74F2" />
                </Pressable>

                <ModalExamen 
                  modalExamen={modalExamen}
                  setModalExamen = {setModalExamen}
                  idExamen = {examen.codigoExamen}
                  examen = {examenSeleccionado}
                  plantilla = {plantillas}
                  titulo= {tituloPlantilla}/>
              </View>
            </View>
          ))
        }

        {examenes.length === 0 && (
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

  optionsMenu: {
    marginTop: 20,
    flexDirection: 'row'
  },

  cardOpcion: {
    marginRight: 10,
    borderRadius: 10,
    flex: 1,
    height: 85,
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },

  cardTxt: {
    textAlign: 'center',
    color: '#fff',
    marginHorizontal: 4
  },

  degradado: {
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    width: '100%',
    height: '100%'
  },

  titulo2: {
    marginTop: 30,
    marginBottom: 10,
    fontSize: 30,
    color: "#a0a0a0"
  },

  exmCardContainer: {
    borderColor: '#D9D9D9',
    borderWidth: 1,
    borderRadius: 10,
    height: 70,
    paddingHorizontal: 20,
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 10
  },

  gradoTxt: {
    fontSize: 30,
    fontWeight: '500',
    color: '#0F74F2'
  },

  linea: {
    width: 1,
    backgroundColor: "#0F74F2",
    height: "70%",
    marginHorizontal: 10
  },

  examenTitle: {
    color: "#000",
    // fontSize: 16
  },

  examenPorc: {
    color: "#0F74F2",
  },

  scroll: {
    height: '100%'
  },

  logouticon: {
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
    marginLeft: 180,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default Home