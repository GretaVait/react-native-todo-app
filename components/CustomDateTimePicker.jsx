// Base
import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Platform, Modal } from 'react-native'
// Lib
import DateTimePickerModal from "react-native-modal-datetime-picker"
import moment from 'moment'
// Comp
import Title from '../components/Title'
// Colors
import colors from '../constants/colors'

const CustomDateTimePicker = ({ note, setNote }) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [mode, setMode] = useState('date')

  const showDatePicker = () => {
    setDatePickerVisibility(true);
    setMode('date')
  }

  const showTimePicker = () => {
    setDatePickerVisibility(true);
    setMode('time')
  }

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  }

  const handleConfirm = (date) => {
    hideDatePicker()
    setNote((prevState) => ({
      ...prevState,
      date: date
    }))
  }

  return (
    <View>
      <Title>Select Time of Notification</Title>

      <View style={styles.pickerContainer}>
        <TouchableOpacity onPress={showTimePicker} style={styles.picker}>
          <Text style={{...styles.pickerItem, ...styles.pickerText}}>{moment(note.date).format('HH')}</Text>
          <Text style={styles.pickerItem}>:</Text>
          <Text style={{...styles.pickerItem, ...styles.pickerText}}>{moment(note.date).format('mm')}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={showDatePicker} style={styles.picker}>
          <Text style={{...styles.pickerItem, ...styles.pickerText}}>{moment(note.date).format('MM')}</Text>
          <Text style={styles.pickerItem}>/</Text>
          <Text style={{...styles.pickerItem, ...styles.pickerText}}>{moment(note.date).format('DD')}</Text>
          <Text style={styles.pickerItem}>/</Text>
          <Text style={{...styles.pickerItem, ...styles.pickerText}}>{moment(note.date).format('YY')}</Text>
        </TouchableOpacity>
      </View>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode={mode}
        locale="en_GB"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        date={note.date}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  pickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },    
  picker: {
    flexDirection: 'row'
  },
  pickerItem: {
    padding: 8,
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.purple
  },
  pickerText: {
    borderBottomColor: colors.purple,
    borderBottomWidth: 2
  }
})

export default CustomDateTimePicker