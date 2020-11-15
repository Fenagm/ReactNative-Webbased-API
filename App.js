import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Button, Text, View, TextInput, Image, } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Constants from 'expo-constants';
import { set } from 'react-native-reanimated';

const axios = require("axios");

export default class App extends React.Component {

  state = {

    data: [],
    getdata: null,
    count: 0,
    personaje: '',
  }

  handlerText(e) {
    console.log(e.target.value);

  }

  handlerSearchButton() {
    console.log(this.state.campo);
    let personaje = this.state.campo;
    axios.get('https://rickandmortyapi.com/api/character/?name=' + personaje).
      then(response =>
        this.setState({ data: response.data.results, getdata: true, count: response.data.info.count, nextpage: response.data.info.next, }));

  }

  handlerNextPage() {
    if (this.state.nextpage !== 'null') {
      axios.get(this.state.nextpage).
        then(response =>
          this.setState({ data: response.data.results, getdata: true, nextpage: response.data.info.next, prevpage: response.data.info.prev }));
    }
  }

  handlerPrevPage() {
    if (this.state.prevpage !== 'null') {
      axios.get(this.state.prevpage).
        then(response =>
          this.setState({ data: response.data.results, getdata: true, nextpage: response.data.info.next, prevpage: response.data.info.prev }));
    }
  }



  render() {
    if (this.state.getdata == null) {

      return (

        <View style={styles.container}>
          <Image style={styles.header}
            source={require('../RNrmapi/OIP.jpg')}
          />
          <Text style={styles.text}>Buscar Personaje</Text>
          <TextInput
            style={{ height: 40, width: 240, borderColor: 'gray', borderWidth: 1, marginBottom: 16 }}
            onChangeText={(value) => this.setState({ campo: value })}

          />
          <Button style={styles.buttonpages}
            title="Buscar"
            color="green"
            onPress={this.handlerSearchButton.bind(this)} />

        </View>);
    }
    else {
      return (
        <ScrollView style={styles.containerresult}>

          <Text style={{ fontSize: 24 }}>Resultados {this.state.count} coincidencia(s)</Text>

          {this.state.data.map((state) => (

            <View style={styles.containerresultgrid} >

              <Image style={styles.tinyLogo}
                source={{ uri: state.image }} />
              <Text style={styles.gridtext}>Nombre: {state.name}  {'\n'}Status: {state.status}{'\n'}Especie: {state.species}</Text>
            </View>

          ))}


          <View style={{ flex: 2, padding: 10 }}></View>

          <Button style={{ paddingBottom: 8 }}
            title="Pagina Anterior"
            color="green"
            onPress={this.handlerPrevPage.bind(this)} />

          <View style={{ flex: 2, padding: 10 }}></View>

          <Button
            title="Pagina Siguiente"
            color="green"
            onPress={this.handlerNextPage.bind(this)} />

          <View style={{ flex: 2, padding: 10 }}></View>

          <Button
            title="Home"
            color="green"
            onPress={() => this.setState({ getdata: null })} />
        </ScrollView>




      );
    }
  }
}


const styles = StyleSheet.create({
  header: {
    height: 280,
    resizeMode: 'contain',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingBottom: 4,
  },
  containerresult: {
    flex: 1,
    marginTop: 48,
    marginLeft: 8,
    marginRight: 8,
    marginBottom: 8,


  },
  containerresultgrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: 20,
    margin: 2,
    marginBottom: 4,
    borderColor: "green",
    borderWidth: 3,
    backgroundColor: "white",


  },
  gridtext: {
    marginLeft: 64,
    alignContent: 'center',
    marginTop: 4,
    fontSize: 16

  },
  scrollView: {
    backgroundColor: 'white',
    marginHorizontal: 2,
  },
  text: {
    fontSize: 50,
    paddingBottom: 2,
  },
  containersav: {
    flex: 1,

  },
  tinyLogo: {
    width: 60,
    height: 60,
    display: 'flex',
    resizeMode: 'contain',
    position: 'absolute',
    marginTop: 20,
    marginLeft: 8

  },
});