import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Pressable } from 'react-native-web';

export default function App() {
  const [examen, setExamen] = useState({
    "autor": "s@s.com",
    "fechaActualizacion": null,
    "fechaCreacion": {
      "date": "06/06/2022",
      "hora": "02:22",
    },
    "id": 238592,
    "preguntas": [
      {
        "opcion": [
          "4",
          "5",
          "6",
          "8",
        ],
        "respuestaCorrecta": 0,
        "tiempo": "30",
        "tituloPregunta": "Resultado de la suma 2 + 2",
      },
      {
        "opcion": [
          "3",
          "5",
          "0",
          "7",
        ],
        "respuestaCorrecta": 2,
        "tiempo": "30",
        "tituloPregunta": "Resultado de la resta 2 - 2",
      },
      {
        "opcion": [
          "16",
          "17",
          "18",
          "8",
        ],
        "respuestaCorrecta": 3,
        "tiempo": "30",
        "tituloPregunta": "Resultado de la multiplicación 2 * 4",
      },
      {
        "opcion": [
          "1.5",
          "40",
          "1.3",
          "0.33%",
        ],
        "respuestaCorrecta": 0,
        "tiempo": "30",
        "tituloPregunta": "Resuelve la división 3/2",
      },
    ],
    "titulo": "Matemáticas híper basicas",
  })

  const [preguntaActual, setPreguntaActual] = useState(0)
  const [tiempo, setTiempo] = useState(0)

  useEffect(() => {
    setTimeout(() => {
      setTiempo(tiempo - 1)
    }, 1000)
  }, [tiempo])

  if (tiempo === 0) {
    setPreguntaActual(preguntaActual + 1)
    setTiempo(Number(examen.preguntas[preguntaActual].tiempo))
  }

  function getRandomColor() {
    var letters = 'ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 6)];
    }
    return color;
  }

  return (
    <View style={styles.container}>
      <View style={styles.container_cuestion}>
        {preguntaActual < examen.preguntas.length ? ( // si la pregunta actual es menor a la cantidad de preguntas
          <>
            <View style={styles.container_row_doble}>
              <Text style={styles.title}>{examen.preguntas[preguntaActual].tituloPregunta}</Text>
              <Text style={styles.time}>⏰ {tiempo}</Text>
            </View>
            <View style={styles.container_row_answers}>
              {examen.preguntas[preguntaActual].opcion.map((opcion, index) => {
                return (
                  <Pressable
                    key={index}
                    onPress={() => {
                      if (examen.preguntas[preguntaActual].respuestaCorrecta === index) {
                        setPreguntaActual(preguntaActual + 1)
                        setTiempo(Number(examen.preguntas[preguntaActual].tiempo))
                      }
                    }
                    }
                  >
                    <Text style={{ fontSize: 16, textAlign: 'center', margin: 5, paddingHorizontal: 10, backgroundColor: getRandomColor(), borderRadius: '0.75rem', width: 150 }}>{opcion}</Text>
                  </Pressable>
                )
              })}
            </View>
          </>
        ) : (
            <Text style={styles.title}>Gracias por participar 🙋  </Text>
          )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'#f1fcfc',
  },
  container_cuestion: {
    padding:10,
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1
    }
  },
  container_row_doble: {
    flex: 1,
    flexDirection: 'row',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginRight: 10,
  },
  container_column_answers: {
    flex: 1,
    flexDirection: 'column',
    fontWeight: 'semibold',
    color: '#000',
    textAlign: 'center',
    marginRight: 20,
    fontSize: 17,
    textAlign: 'center',
    margin: 10,
    borderRadius: '0.75rem',
    backgroundColor: '#f1fcfc',
    color: '#000',
    padding: '0.2rem',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    padding: '0.5rem',
    fontWeight: 'bold'
  },
  time: {
    fontSize: 15,
    textAlign: 'center',
    margin: 10,
    borderRadius: '0.75rem',
    backgroundColor: '#f1fcfc',
    color: '#000',
    padding: '0.5rem',
  }
});