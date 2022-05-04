import React from 'react'
import { Text, View, SafeAreaView, ScrollView, Pressable, StyleSheet} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { backgroundColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes'

const Home = () => {
  return (
    <SafeAreaView style={styles.container} >
        <Text style={styles.titulo}>
            Inicio
        </Text>

        <View style={styles.optionsMenu}>

          <Pressable style={styles.cardOpcion}>
            <LinearGradient
              colors={["#8C4DE9", "#0083B0"]}
              start={{x: 1, y: 0}} end={{x: 0, y: 1}}
              style={styles.degradado}
            >
              <Text style={styles.cardTxt}>Crear plantilla</Text>
            </LinearGradient>
          </Pressable>

          <Pressable style={styles.cardOpcion}>
            <LinearGradient
              colors={["#8C4DE9", "#0083B0"]}
              start={{x: 1, y: 0}} end={{x: 0, y: 1}}
              style={styles.degradado}
            >
              <Text style={styles.cardTxt}>Ver plantillas</Text>
            </LinearGradient>
          </Pressable>

          <Pressable style={styles.cardOpcion}>
            <LinearGradient
              colors={["#8C4DE9", "#0083B0"]}
              start={{x: 1, y: 0}} end={{x: 0, y: 1}}
              style={styles.degradado}
            >
              <Text style={styles.cardTxt}>Alumnos</Text>
            </LinearGradient>
          </Pressable>

          <Pressable style={styles.cardOpcion}>
            <LinearGradient
              colors={["#8C4DE9", "#0083B0"]}
              start={{x: 1, y: 0}} end={{x: 0, y: 1}}
              style={styles.degradado}
            >
              <Text style={styles.cardTxt}>Aplicar examen</Text>
            </LinearGradient>
          </Pressable>

        </View>

        <Text style={styles.titulo2}>
            Examenes en curso
        </Text>

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
              <Text style={styles.examenPorc}>30%</Text>
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
              <Text style={styles.examenPorc}>30%</Text>
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
              <Text style={styles.examenPorc}>30%</Text>
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
    flexDirection: 'row'
  },

  cardOpcion:{
    marginRight: 10,
    borderRadius: 10,
    flex: 1,
    height: 85,
  },

  cardTxt:{
    textAlign: 'center',
    color: '#fff',
    marginHorizontal: 4
  },
  
  degradado:{
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    width: '100%',
    height: '100%'
  },

  titulo2:{
    marginTop: 30,
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
  }
})

export default Home