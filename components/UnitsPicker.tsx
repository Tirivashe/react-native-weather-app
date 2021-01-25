import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { Picker} from '@react-native-community/picker'

type Units = {
  units: string,
  setUnits: React.Dispatch<React.SetStateAction<any>>
}

export default function UnitsPicker({ units, setUnits } : Units) {
  return (
    <View style={styles.units}>
      <Picker selectedValue={units} onValueChange={item => setUnits(item)} mode="dropdown">
        <Picker.Item label="C" value='metric'/>
        <Picker.Item label="F" value='imperial'/>
      </Picker>
     </View>
  );
}

const styles = StyleSheet.create({
  units: {
    position: 'absolute',
    ...Platform.select({
      ios: {
        top: -20
      },

      android: {
        top: 100
      }
    }),
    height: 50,
    width: 100,
    left: 20
  }
})