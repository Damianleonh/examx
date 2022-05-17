import React, {useState}from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Modal,
  Alert
} from 'react-native';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import CrearFormulario from './src/components/CrearFormulario';
import MisPlantillas from './src/components/MisPlantillas';
const App = () => {

  const [modal1,setModal1] = useState(false)
  const [modal2,setModal2] = useState(false)
  const [plantillas, setPlantillas] = useState([])
  const [plantilla, setPlantilla] = useState({})//extraemos id y lo buscamos

  const PlantillaEditar = id => {
    const PlantillaEditar = plantillas.filter(plantilla=> plantilla.id=== id)
    setPlantilla(PlantillaEditar[0])
  } //funcion para detectar cual id estas editando
  const EliminarPlantilla= id => {
    Alert.alert(
      "Eliminar plantilla",
      "Estas seguro?, los cambios no se revertiran",
      [
        {text:"Cancelar"},
        {text:"Aceptar", onPress:()=>{
          const PlantillasActualizadas = plantillas.filter(PlantillasState => PlantillasState.id !== id)
          setPlantillas(PlantillasActualizadas)
        }}
      ]
  )
  }
  return (
    <SafeAreaView style={styles.contenedorTodo}>
      <Pressable style={styles.btnPlantilla} onPress={()=>{setModal1(true)}}>
        <Text style={styles.txtContenedor}>Crear{" "}
          <Text style={styles.txtContenedor2}>formulario</Text>
        </Text>
      </Pressable>
      <Pressable style={styles.btnPlantilla2} onPress={()=>{setModal2(true)}}>
        <Text style={styles.txtContenedor}>Mis{" "}
          <Text style={styles.txtContenedor2}>plantillas</Text>
        </Text>
      </Pressable>

      <Modal
      animationType='slide'
      visible={modal1}>
        <CrearFormulario
        setModal1={setModal1}
        setPlantillas={setPlantillas}
        plantillas={plantillas}
        plantilla={plantilla}
        setPlantilla={setPlantilla}
        />
      </Modal>

      <Modal
      animation="slide"
      visible={modal2}>
        <MisPlantillas
        plantillas={plantillas}
        setModal2={setModal2}
        setModal1={setModal1}
        PlantillaEditar={PlantillaEditar}
        EliminarPlantilla={EliminarPlantilla}
        />
      </Modal>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  contenedorTodo:{
    backgroundColor:"#cae9ff",
    flex:1,
    alignItems:"center",
    padding:20
  },
  btnPlantilla:{
    backgroundColor:"#4361EE",
    paddingHorizontal:30,
    paddingVertical:20,
    borderRadius:10
  },
  btnPlantilla2:{
    marginTop:10,
    backgroundColor:"#4361EE",
    paddingHorizontal:45,
    paddingVertical:20,
    borderRadius:10
  },
  txtContenedor:{
    fontSize:20,
    fontWeight:"300",
    color:"#FFF"
  },
  txtContenedor2:{
    fontSize: 20,
    fontWeight:"600"
  },
  linearGradient:{
    marginTop:20,
    paddingHorizontal:7,
    borderRadius: 5,
    paddingVertical:10
  },
  buttonText: {
    fontSize: 22,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    fontWeight:"700",
    margin: 10,
    color: '#FFF',
    backgroundColor: 'transparent',
  },
  sss:{
    backgroundColor:"red"
  }
})



export default App;
