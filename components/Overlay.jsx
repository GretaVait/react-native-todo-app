// Base
import React from 'react'
import { View, StyleSheet } from 'react-native'

const Overlay = ({ open, onClose, children }) => {
  return (
    <View style={{ ...styles.overlay, opacity: open ? 1 : 0 }} pointerEvents={open ? 'auto' : 'none'}>
      <View style={styles.overlayBackground} onStartShouldSetResponder={onClose} />
      {children}
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
    zIndex: 101,
    paddingVertical: 64
  },
  overlayBackground: {
    position: 'absolute',
    backgroundColor: 'rgba(51, 51, 51, 0.5)',
    top: 0, 
    left: 0, 
    bottom: 0, 
    right: 0,
  }
})

export default Overlay