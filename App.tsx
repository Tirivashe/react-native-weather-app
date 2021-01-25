import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect}  from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location'
import WeatherInfo from './components/WeatherInfo'
import UnitsPicker from './components/UnitsPicker'
import { colors } from './utils/index'
import ReloadIcon from './components/Reload'
import WeatherDetails from './components/WeatherDetails'
//import { key } from 'react-native-dotenv'
import config from './config'

const WEATHER_API_KEY = config.WEATHER_API_KEY
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather?'


export default function App() {

  const [errorMessage, setErrorMessage] = useState<string>('')
  const [currentWeather, setCurrentWeather] = useState<any>(null)
  const [units, setUnits] = useState('metric')

  async function load(){
    setCurrentWeather(null)
    setErrorMessage('')
    try{
      let { status } = await Location.requestPermissionsAsync()
      if(status !== 'granted'){
        setErrorMessage('Access to location is needed to run the app')
      }
      const location = await Location.getCurrentPositionAsync()
      const { latitude, longitude } = location.coords

      const weatherUrl = `${BASE_URL}lat=${latitude}&lon=${longitude}&units=${units}&appid=${WEATHER_API_KEY}`
      
      const response = await fetch(weatherUrl)
      const data = await response.json()
      if(response.ok){
        setCurrentWeather(data)
      }else{
        setErrorMessage(data.message)
      }

    }catch(error){
      console.error(error)
    }
  }

    useEffect(() => {
      load()
    }, [units])

    if(currentWeather){
      return (
        <View style={styles.container}>
          <StatusBar style="auto" />
          <View style={styles.main}>
            <UnitsPicker units={units} setUnits={setUnits}/>
            <ReloadIcon load={load}/>
            <WeatherInfo currentWeather={currentWeather} />
          </View>
          <WeatherDetails currentWeather={currentWeather} units={units} />
        </View>
      );
    } else if(errorMessage) {
      return (
        <View style={styles.container}>
          <ReloadIcon load={load}/>
          <Text style={{ textAlign: 'center' }}>{errorMessage}</Text>
          <StatusBar style="auto" />
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color={colors.PRIMARY_COLOR} />
          <StatusBar style="auto" />
        </View>
      );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },

  main:{
    flex: 1,
    justifyContent: "center",

  }
});
