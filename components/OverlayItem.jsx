// Base
import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
// Lib
import { Icon } from 'react-native-elements'
// Colors
import colors from '../constants/colors'

const OverlayItem = ({ title, onSelect, icon }) => {

  return (
    <TouchableOpacity style={styles.overlayItem} onPress={onSelect}>
      <Text style={styles.overlayText}>{title}</Text>
      <View style={styles.overlayIcon}>
        <Icon name={icon.name} type={icon.type} size={16} color={colors.black} />
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  overlayItem: {
    flexDirection: 'row', 
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  overlayText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 8
  },
  overlayIcon: {
    backgroundColor: 'white',
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4
  }
})

export default OverlayItem