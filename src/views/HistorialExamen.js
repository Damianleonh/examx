import React from 'react'
import { View, SafeAreaView, Text, StyleSheet} from 'react-native'

const HistorialExamen = () => {
  return (
      <SafeAreaView style={styles.container}>
          <Text style={styles.titulo}>Historial de examenes</Text>
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
    }
})

export default HistorialExamen