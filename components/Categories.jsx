// Base
import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
// Navigation
import { useNavigation } from '@react-navigation/core'
// Redux
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { toggleCategory } from '../redux/actions/categoryActions'
// Colors
import colors from '../constants/colors'

const Catgories = () => {
  const nav = useNavigation()
  const dispatch = useDispatch()
  const category = useSelector(state => state.category)

  const data = [
    {
      id: 456,
      title: 'Personal',
      screen: 'HomeScreen',
      color: '#9CC9E7'
    },
    {
      id: 123,
      title: 'Work',
      screen: 'WorkCategoryScreen',
      color: '#F69595'
    },
    {
      id: 789,
      title: 'Ideas',
      screen: 'IdeasCategoryScreen',
      color: '#9BBCC6'
    },
  ]

  const handleCategoryPress = (screen, category) => {
    nav.navigate(screen)
    dispatch(toggleCategory(category))
  }

  return (
    <View style={styles.categoriesList}>

      <View>
        {
          data.map(item => (
            <TouchableOpacity key={item.id} style={{ ...styles.category, backgroundColor: category.activeItem.toLowerCase() === item.title.toLowerCase() ? '#FFF' : item.color }} onPress={() => { handleCategoryPress(item.screen, item.title) }}>
              <Text style={styles.categoryText}>{item.title}</Text>
            </TouchableOpacity>
          ))
        }
      </View>

      {/* <TouchableOpacity style={{ ...styles.category, backgroundColor: '#DEDEDE', marginBottom: 0 }} onPress={() => { nav.navigate('SettingsScreen') }}>
        <Text style={styles.categoryText}>Settings</Text>
      </TouchableOpacity> */}

    </View>
  ) 
}

const styles = StyleSheet.create({
  categoriesList: {
    backgroundColor: colors.purple,
    height: '100%',
    paddingVertical: 8,
    justifyContent: 'space-between',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  category: {
    position: 'relative',
    width: 32,
    height: 110,
    paddingVertical: 16,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    marginBottom: 4
  },
  categoryText: {
    transform: [{ translateX: -32 }, { rotate: '-90deg' }, { translateX: 0 }],
    width: 110,
    height: 32,
    color: '#4C416B',
    fontWeight: 'bold'
  }
})

export default Catgories