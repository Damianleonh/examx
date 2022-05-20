import React from 'react'
import { Text, View, SafeAreaView, ScrollView, Pressable, StyleSheet, Alert} from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import { signOut } from 'firebase/auth'
import { auth } from '../../database/firebase'

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
                onPress={onSignOut}
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
                onPress={onSignOut}
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

          {/* Un solo elemento */}
          <View style={styles.exmCardContainer}>

            {/* Grado y grupo */}
            <Text style={styles.gradoTxt}>6D</Text>

            {/* Linea azul */}
            <View style={styles.linea}></View>

            {/* Nombre de examen y porcentaje */}
            <View>
              <Text style={styles.examenTitle}>Examen 1</Text>
              <Text style={styles.examenPorc}>Tiempo estimado: 5m 45s</Text>
            </View>
          </View>

          {/* Un solo elemento */}
          <View style={styles.exmCardContainer}>

            {/* Grado y grupo */}
            <Text style={styles.gradoTxt}>6D</Text>

            {/* Linea azul */}
            <View style={styles.linea}></View>

            {/* Nombre de examen y porcentaje */}
            <View>
              <Text style={styles.examenTitle}>Examen 1</Text>
              <Text style={styles.examenPorc}>Tiempo estimado: 5m 45s</Text>
            </View>
          </View>

          {/* Un solo elemento */}
          <View style={styles.exmCardContainer}>

            {/* Grado y grupo */}
            <Text style={styles.gradoTxt}>6D</Text>

            {/* Linea azul */}
            <View style={styles.linea}></View>

            {/* Nombre de examen y porcentaje */}
            <View>
              <Text style={styles.examenTitle}>Examen 1</Text>
              <Text style={styles.examenPorc}>Tiempo estimado: 5m 45s</Text>
            </View>
          </View>

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
  }
})

export default HomeAlumno