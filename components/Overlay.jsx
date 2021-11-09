// Base
import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
// Lib
import { Icon } from 'react-native-elements'
// Colors
import colors from '../constants/colors'

const Overlay = ({ open, onClose }) => {
  return (
    <View style={{ ...styles.overlay, opacity: open ? 1 : 0 }} pointerEvents={open ? 'auto' : 'none'}>
      <View style={styles.overlayBackground} onStartShouldSetResponder={onClose} />
      <View style={styles.overlayItem}>
        <Text style={styles.overlayText}>History</Text>
        <View style={styles.overlayIcon}>
          <Icon name="history" type="material" size={16} color={colors.black} />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute', 
    top: 0, 
    left: 0, 
    bottom: 0, 
    right: 0,
    zIndex: 2,
    paddingVertical: 64
  },
  overlayBackground: {
    position: 'absolute',
    backgroundColor: 'rgba(51, 51, 51, 0.5)',
    top: 0, 
    left: 0, 
    bottom: 0, 
    right: 0,
  },
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

export default Overlay