import React from 'react'
import { Text, SafeAreaView, View, Image, TextInput, StyleSheet } from 'react-native'

const App = () => {
    return (
        <SafeAreaView>
            <Image
                style={styles.imagen}
                source={ require('./sources/Images/logo.jpg') }
            />

            <TextInput
                placeholder='Correo'
                keyboardType='email-address'
            />

            <TextInput
                placeholder='Correo'
                keyboardType='email-address'
            />

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    imagen:{
        width: 200,
        height: 100
    }
})



export default App