import React from 'react'
import { View, SafeAreaView, Text, StyleSheet} from 'react-native'

const AplicarExamen = () => {
  return (
      <SafeAreaView style={styles.container}>
          <Text style={styles.titulo}>Aplicar examen</Text>
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

export default AplicarExamen