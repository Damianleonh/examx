import React, { useState, useLayoutEffect, useRef, useEffect} from 'react'
import { View, SafeAreaView, Text, StyleSheet, ScrollView, Dimensions, Image, Pressable, TextInput, Alert} from 'react-native'
import { auth } from '../../database/firebase'
import { collection, where, query, onSnapshot, addDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase-config';

const AplicarExamen = ({navigation}) => {

    // ----Zona de hooks---
    const [ plantillas, setPlantillas ] = useState([]) //Datos de firebase
    const [ alumnos, setAlumnos ] = useState([])

    const [ codigoExamen, setCodigoExamen] = useState("") //Datos de examen
    const [ plantillaSelected, setPlantillaSelected ] = useState(null)
    const [ alumnosSelected, setAlumnosSelected ] = useState([])
    const [ gradoGrupo, setGradoGrupo] = useState({grado:"", grupo:""})
    
    const [ scrollIndex, setScrollIndex] = useState(1) //Variables de control
    const [ buttonState, setButtonState ] = useState(true)
    const [ correosBusqueda, setCorreosBusqueda ] = useState([])
    const scrollRef = useRef()

    useEffect(()=>{
        if(alumnosSelected.length===0){
            setButtonState(true)
        }
    }, [alumnosSelected])

    //---Cargar plantillas disponibles---
    useLayoutEffect( ()=>{

        //Consulta plantillas
        const q = query(collection(db, "plantillas"), where("autor", "==", auth.currentUser.email))
        const unsuscribe = onSnapshot(q,(querySnapshot)=>{
            let tempArr = []
            querySnapshot.forEach((doc) => {
                tempArr.push(doc.data())
            })

            setPlantillas(tempArr)
        })

        //Consultar alumnos
        const q2 = query(collection(db, "Usuarios"), where("tipo", "==", "usuarioAlumno"))
        const unsuscribe2 = onSnapshot(q2, (snap)=>{
            let tempAlum = []
            snap.forEach((alumno)=>{
                tempAlum.push(alumno.data())
            })

            setAlumnos(tempAlum)
        })

        //Generar codigo
        setCodigoExamen(generarCodigo(6))

    }, [])

    // ------Calcular tiempo de plantillas----
    const calcularTiempo = (obj) =>{
        let tiempo = 0
        obj.preguntas.forEach((val)=>{
            tiempo += parseInt(val.tiempo)
        })

        return tiempo+"s"
    }

    //Calcular scroll horizontal, dividir pantallas
    const horizontalScroll = () =>{
        scrollRef.current.scrollTo({ x: Dimensions.get('window').width * scrollIndex})
        setScrollIndex(scrollIndex+1)
    }

    //Generar codigo de exmen
    const generarCodigo = (length) => {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * 
            charactersLength));
        }
        return result;
    }

    //Subir datos
    const fetchData = () => {
        addDoc(collection(db,"examen'es"),{
            maestro: auth.currentUser.email,
            codigoExamen: codigoExamen,
            alumnosSelected: alumnosSelected,
            plantillaSelected: plantillaSelected,
            gradoGrupo: gradoGrupo
        }).then(()=>{
            Alert.alert("Alerta", "Examen creado correctamente")
            navigation.navigate("Home")
        }).catch(()=>{
            Alert.alert("Alerta", "Ocurrio algun error al crear el examen")
        })
    }

    const validarGGBtn = (txt) =>{
        setGradoGrupo(txt)

        if(txt.length >= 2){
            setButtonState(false)
        }else{
            setButtonState(true)
        }
    }

    //Funcion buscar alumno
    const buscarAlumno = (txt) =>{

        //Separar correos de objeto alumnos
        let correos = []
        alumnos.forEach( e =>{
            correos.push(e.correo)
        })

        if(txt){
            //Filtrar por index
            const newData = correos.filter(item=>{
                const itemData = item ? item.toUpperCase()
                        : ''.toUpperCase()
                const textData = txt.toUpperCase()
                return itemData.indexOf(textData) > -1;
            })
            setCorreosBusqueda(newData)
        }else{
            setCorreosBusqueda([])
        }


    }
    return (
        <SafeAreaView style={styles.safeaview}>
            <View style={styles.container}>
                <Text style={styles.titulo}>Aplicar examen</Text>
                <Text style={styles.subtitulo}>Gestor de aplicación de examenes</Text>
            </View>

            <ScrollView
                style={styles.slider}
                horizontal={true}
                pagingEnabled={true}
                showsHorizontalScrollIndicator={false}
                bounces={false}
                scrollEnabled={false}
                ref={scrollRef}
            >
                {/* ------Apartado plantillas-------- */}
                <View style={styles.apartado}>
                    <Text style={styles.indicacion}>Selecciona una plantilla para continuar</Text>
                    <ScrollView
                        alwaysBounceVertical={false}
                    >
                        {/* -------Mapeo de plantillas----------*/}
                        { plantillas.map((plantilla, index) =>(

                            <Pressable
                                onPress={()=>{
                                    setPlantillaSelected(index)
                                    setButtonState(false)
                                }}
                            >
                                <View style={ plantillaSelected === index ? styles.plantCardSelec : styles.plantCard } >

                                    <View style={styles.viewTxt}>                            
                                        <Text style={styles.plantCardTxt}>
                                            {plantilla.titulo}
                                        </Text>
                                        <Text style={styles.tmpEstTxt}>
                                            Tiempo total: {calcularTiempo(plantilla)}
                                        </Text>
                                    </View>

                                </View>
                            </Pressable>

                        )) }
                        {/* ------------------------------------ */}
                    </ScrollView>
                </View>


                {/*--------Apartado alumnos-----------*/}
                <View style={styles.apartado}>

                    <Text style={styles.indicacion}>Elige a los alumnos participantes {"\n"}o comparte este codigo</Text>
                    <Text style={styles.indicacioncode} selectable={true}>{codigoExamen} {"\n"}</Text>

                    <TextInput
                        style={styles.input}
                        placeholder={"Buscar por correo"}
                        onChangeText={ (item) =>{
                            buscarAlumno(item)
                        }}
                    />

                    <ScrollView
                        alwaysBounceVertical={false}
                    >
                        {/* -------Mapeo de alumnos----------*/}
                        { alumnos.map((alumno, index) =>{
                            if(correosBusqueda.length === 0){
                                return (
                                    <Pressable
                                        onPress={()=>{
                                            setButtonState(false)
        
                                            if(!(alumnosSelected.find(e=> e==alumno.correo))){
                                                //Agregar alumno
                                                setAlumnosSelected([...alumnosSelected, alumno.correo])
                                            }else{
                                                //Borrar alumno si ya existe
                                                const remove = alumnosSelected.filter((item)=> item !== alumno.correo )
                                                setAlumnosSelected(remove)
                                            }
                    
                                        }}
                                    >
                                        <View style={ alumnosSelected.find(e=> e==alumno.correo) ? styles.plantCardSelec : styles.plantCard  } >
        
                                            <View style={styles.viewTxt}>                            
                                                <Text style={styles.plantCardTxt}>
                                                    {alumno.nombreUsuario}
                                                </Text>
                                                <Text style={styles.tmpEstTxt}>
                                                    {alumno.correo}
                                                </Text>
                                            </View>
        
                                        </View>
                                    </Pressable>
                                )
                            }else{
                                if(correosBusqueda.find( e => e === alumno.correo)){
                                    return (
                                        <Pressable
                                            onPress={()=>{
                                                setButtonState(false)
            
                                                if(!(alumnosSelected.find(e=> e==alumno.correo))){
                                                    //Agregar alumno
                                                    setAlumnosSelected([...alumnosSelected, alumno.correo])
                                                }else{
                                                    //Borrar alumno si ya existe
                                                    const remove = alumnosSelected.filter((item)=> item !== alumno.correo )
                                                    setAlumnosSelected(remove)
                                                }
                        
                                            }}
                                        >
                                            <View style={ alumnosSelected.find(e=> e==alumno.correo) ? styles.plantCardSelec : styles.plantCard  } >
            
                                                <View style={styles.viewTxt}>                            
                                                    <Text style={styles.plantCardTxt}>
                                                        {alumno.nombreUsuario}
                                                    </Text>
                                                    <Text style={styles.tmpEstTxt}>
                                                        {alumno.correo}
                                                    </Text>
                                                </View>
            
                                            </View>
                                        </Pressable>
                                    )
                                }

                            }
                        }) }
                        {/* ------------------------------------ */}
                    </ScrollView>

                </View>


                {/*--------Apartado grado grupo-------*/}
                <View style={styles.apartado}>
                    <Text style={styles.indicacion}>Ingresa un grado y grupo</Text>
                    <View style={styles.ggcontianer}>
                        <TextInput
                            style={styles.ggelement}
                            placeholder='6D'
                            keyboardType='default'
                            maxLength={2}
                            onChangeText={ (txt) =>{
                                validarGGBtn(txt)
                            }}
                        />
                    </View>
                </View>

            </ScrollView>

            {/*-------Boton siguiente--------*/}
            <View style={styles.btnContainer}>
                <Pressable style={buttonState ? styles.buttondis : styles.button}
                    onPress={()=> {
                        horizontalScroll()
                        { scrollIndex >= 3 && fetchData()}
                        setButtonState(true)
                    }}
                    disabled={buttonState}
                >
                    <Text style={styles.buttonText}>
                        { scrollIndex >=3 ? "Crear" : "Siguiente" }
                    </Text>
                </Pressable>
            </View>

            {/* -------Bottom image---------*/}
            <Image
                source={require('../img/bottomimg.png')}
                style={styles.btmImg}
                resizeMode={'cover'}
            />

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeaview:{
        backgroundColor: '#fff',
        flex: 1
    },
    container:{
        marginHorizontal: 20,
    },
    
    titulo:{
        marginTop: 10,
        fontSize: 30
    },

    subtitulo:{
        marginTop: 10,
        color: '#808080'
    },

    apartado:{
        marginTop: 20,
        width: Dimensions.get('window').width,
        height: 550,
        paddingHorizontal: 20,
    },

    btmImg:{
        width: Dimensions.get('window').width,
        height: 200,
        zIndex: -1,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },

    plantCard:{
        borderColor: '#D9D9D9',
        borderWidth: 1,
        borderRadius: 10,
        height: 65,
        paddingHorizontal: 15,
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 10,
        justifyContent: 'space-between'
    },

    plantCardSelec:{
        borderColor: '#fff',
        borderWidth: 1,
        borderRadius: 10,
        height: 65,
        paddingHorizontal: 15,
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 10,
        backgroundColor: '#f0f0f0',
        justifyContent: 'space-between'
    },

    iconfaws:{
        marginLeft: 5,
        borderColor: '#d0d0d0',
        borderWidth: 1,
        borderRadius: 4,
        padding: 4
    },

    plantCardTxt:{
        fontSize: 16,
        color: '#808080',
        fontWeight: '500'
    },

    accbtn:{
        flexDirection: 'row',
        alignItems: 'center'
    },

    tmpEstTxt:{
        marginTop: 5,
        color: '#0F74F2'
    },

    indicacion:{
        textAlign: 'center',
        color: '#0F74F2',
        fontSize: 16,
        marginVertical: 20,
        fontWeight: '600'
    },

    indicacioncode:{
        textAlign: 'center',
        color: '#000',
        fontSize: 24,
        fontWeight: '300'
    },

    button: {
        backgroundColor: '#0F74F2',
        width: 200,
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },

    buttondis: {
        backgroundColor: '#0F74F299',
        width: 200,
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },

    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 20
    },

    btnContainer:{
        // backgroundColor: '#f00',
        position: 'relative',
        bottom: 30,
        alignItems: 'center'
    },

    input: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        borderColor: '#f0f0f0',
        borderWidth: 3,
        marginBottom: 15,
    },

    ggcontianer:{
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
        marginHorizontal: 120
    },

    ggelement:{
        fontSize: 60,
        color: '#0F74F2'
    }
})

export default AplicarExamen