import React from 'react'
import { View, SafeAreaView, Text, StyleSheet} from 'react-native'

const IngresarCodigo = () => {
  return (
      <SafeAreaView style={styles.container}>
          <Text style={styles.titulo}>Ingresar a examen</Text>
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

export default IngresarCodigo