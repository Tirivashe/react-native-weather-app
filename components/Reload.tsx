import React from 'react';
import { View, Platform, StyleSheet} from 'react-native';
import { Ionicons } from '@expo/vector-icons'
import { colors } from "../utils/index";

type ReloadProps = {
  load: ()=> void
}

export default function ReloadIcon({ load } : ReloadProps) {
  const reloadIconName = Platform.OS === 'ios' ? 'ios-refresh' : "md-refresh"
  return (
    <View style={styles.icon}>
      <Ionicons onPress={load} name={reloadIconName} size={24} color={colors.PRIMARY_COLOR}/>
    </View>
  );
}

const styles = StyleSheet.create({
  icon: {
    position: 'absolute',
    top: 100,
    right: 20,
  }
})
