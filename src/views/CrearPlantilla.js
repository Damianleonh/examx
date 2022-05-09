import React,{useState} from 'react'
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    Image,
    RadioButton
} from 'react-native';

const radioButtonsData = [{
    id: '1', 
    label: 'Option 1',
    value: 'option1'
}, {
    id: '2',
    label: 'Option 2',
    value: 'option2'
}]

import { RadioGroup } from 'react-native-radio-buttons-group';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
function CrearPlantilla() {
    const [radioButtons, setRadioButtons] = useState(radioButtonsData)

    function onPressRadioButton(radioButtonsArray) {
        setRadioButtons(radioButtonsArray);
    }

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.containerF}>
         <Text style={styles.txtForm}>Formulario 1</Text>
         <Text style={styles.txtFecha}>Fecha</Text>
         <View style={styles.containerP}>
             <View style={styles.containerOps}>
                 <Text style={styles.txtOps}>¿Pregunta 1?</Text>
                 <Text style={styles.txtOps2}>5 Seg </Text>
                 <Image style={{width:25,height:25,marginRight:10}} source={require("../img/reloj.png")}/>    
                 <Image style ={{width:25,height:25, marginLeft:15}} source={require("../img/tacho-de-basura.png")}/>
             </View>
             <View style={styles.containerR}>
                <RadioGroup style={styles.radioBtn}
                    radioButtons={radioButtons} 
                    onPress={onPressRadioButton} 
                    />
             </View>
         </View>
         <View style={styles.containerP}>
             <View style={styles.containerOps}>
                 <Text style={styles.txtOps}>¿Pregunta 1?</Text>
                 <Text style={styles.txtOps2}>5 Seg </Text>
                 <Image style={{width:25,height:25,marginRight:10}} source={require("../img/reloj.png")}/>    
                 <Image style ={{width:25,height:25, marginLeft:15}} source={require("../img/tacho-de-basura.png")}/>
             </View>
             <View style={styles.containerR}>
                <RadioGroup style={styles.radioBtn}
                    radioButtons={radioButtons} 
                    onPress={onPressRadioButton} 
                    />
             </View>
         </View>
         <View style={styles.containerP}>
             <View style={styles.containerOps}>
                 <Text style={styles.txtOps}>¿Pregunta 1?</Text>
                 <Text style={styles.txtOps2}>5 Seg </Text>
                 <Image style={{width:25,height:25,marginRight:10}} source={require("../img/reloj.png")}/>    
                 <Image style ={{width:25,height:25, marginLeft:15}} source={require("../img/tacho-de-basura.png")}/>
             </View>
             <View style={styles.containerR}>
                <RadioGroup style={styles.radioBtn}
                    radioButtons={radioButtons} 
                    onPress={onPressRadioButton} 
                    />
             </View>
         </View>
         <Pressable style={styles.btnMas}>
            <Image style={{width:25,height:25}} source={require("../img/mas.png")}/>
         </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    containerF:{
        flex:1,
        marginLeft:15,
        marginTop: 30
    },
    txtForm:{
        fontSize: 30,
        color: "#000",
        
    },
    txtFecha:{
        fontSize:20,
        fontWeight: "300"
    },
    containerP:{
        marginTop:15 ,
        marginRight:15,
        borderRadius: 5,
        paddingHorizontal:20,
        paddingVertical: 5,
        borderColor: "#737373",
        borderWidth: 1,
        padding:20
    },
    containerOps:{
        flexDirection: "row",
        justifyContent: "space-between",
    },
    txtOps:{
        fontSize: 18
    },
    txtOps2:{
        marginLeft:110,
        fontSize: 18
    },
    containerR:{
        marginTop:20,
        alignItems:"baseline",
        marginBottom: 20
    },
    btnMas:{
        marginTop:30,
        alignItems:"center"
    }
    
})

export default CrearPlantilla
