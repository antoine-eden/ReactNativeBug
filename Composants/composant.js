import React,{Component,useState, useEffect } from 'react';
//import Geolocation from '@react-native-community/geolocation';
import { StyleSheet, Text, View, Image, TextInput, Keyboard,Button} from 'react-native';
import { pays } from './meteo.js';
import * as Location from 'expo-location';





export class Meteo extends Component{

  constructor(props){
    super(props);
    this.state = {"city" : "Lyon"};
    this.pays = pays;

  }

  componentDidMount(){
      Location.requestPermissionsAsync();
      console.log(Location.getCurrentPositionAsync());

    fetch("https://api.openweathermap.org/data/2.5/forecast?q="+this.state.city+"&APPID=fa956c3c094574e034c48dc970215933")
      .then(res => res.json())
      .then((result) => {if (result.cod == "200") {this.setState({"tab" : result})}} , (error) => {} );


  }

  update(ville){
    fetch("https://api.openweathermap.org/data/2.5/forecast?q="+ville+"&APPID=fa956c3c094574e034c48dc970215933")
      .then(res => res.json())
      .then((result) => {if (result.cod == "200") {this.setState({"tab" : result})}} , (error) => {this.setState({"error" : error})} );

    this.setState({"city" : ville });
  }

  kelvin(kelvin) {
    return (kelvin-273.15).toFixed(1);
  }

  changeCity(){
    this.update(this.state.city);
  }


  render(){
    if (this.state && this.state.tab != undefined) {
      return (
        <View>
          <TextInput  onChangeText={text => (this.setState({"city" : text}))} style={{height: 40,backgroundColor: 'azure', fontSize: 20}} placeholder="Changer la ville"/>
          <Button title="Valider" onPress={(event)=> (this.changeCity())}/>
          <Text h2="true">{this.state.tab.city.name}</Text>
          <Text h2="true">{this.pays[this.state.tab.city.country]}</Text>
          <View><Text>Max : {this.kelvin(this.state.tab.list[0].main.temp_max)} °C</Text></View>
          <View><Text>Actu : {this.kelvin(this.state.tab.list[0].main.temp)} °C</Text></View>
          <View><Text>Min : {this.kelvin(this.state.tab.list[0].main.temp_min)} °C</Text></View>
        </View>
      );
  }else{
      return(
          <View><Text>A</Text></View>
      )
    }
  }
}


const test = StyleSheet.create({
  img: {
    width : "90%",
    height : 200,
  },
  text : {
    width : "90%",
  },
  cont:{
    width : "100%",
    alignItems : "center",
  }
});
