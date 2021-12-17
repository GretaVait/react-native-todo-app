// Base
import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity, Text, ImageBackground } from 'react-native'
// Lib
import { Camera } from 'expo-camera'
// Colors
import colors from '../constants/colors'
import { useEffect } from 'react'
import { Icon } from 'react-native-elements/dist/icons/Icon'
import ButtonSmall from './ButtonSmall'

const TakePicture = ({ note, setNote, setOpenCamera, onOpenCamera }) => {
  const [type, setType] = useState(Camera.Constants.Type.back)
  const [previewVisible, setPreviewVisible] = useState(false)
  const [capturedImage, setCapturedImage] = useState(null)
  const [loading, setLoading] = useState(false)

  let camera = Camera

  const onTakePicture = async () => {
    setLoading(true)
    if (camera) {
      let photo = await camera.takePictureAsync()
      setPreviewVisible(true)
      setCapturedImage(photo)
    }
    setLoading(false)
  }

  const handleRetakePicture = () => {
    setCapturedImage(null)
    setPreviewVisible(false)
    onOpenCamera()
  }

  const handleSavePicture = () => {
    setOpenCamera(false)
    setPreviewVisible(false)

    setNote((prevState) => ({
      ...prevState,
      files: [
        ...note.files,
        {
          id: capturedImage.uri.substr(capturedImage.uri.length - 12) + capturedImage.width,
          localUri: capturedImage.uri, 
          width: capturedImage.width, 
          height: capturedImage.height
        }
      ]
    }))
  }

  const handleCloseCamera = () => {
    setOpenCamera(false)
    setPreviewVisible(false)
  }

  useEffect(() => {
    console.log(loading, 'loading')
  }, [loading])

  return (
    <View style={{ flex: 1}}>

      {previewVisible ?
        <View style={styles.imagePreview}>
          <ImageBackground 
            source={{uri: capturedImage && capturedImage.uri}}
            style={{
              flex: 1
            }}
          />

          <ButtonSmall handleChange={handleCloseCamera} style={styles.backButton}>
            <Icon name="arrow-back-outline" type="ionicon" size={20} />
          </ButtonSmall>

          <View style={styles.cameraActions}>

            <TouchableOpacity style={styles.cameraActionButton} onPress={handleRetakePicture}>
              <Text style={styles.cameraActionButtonText}>Re-take</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.cameraActionButton} onPress={handleSavePicture}>
              <Text style={styles.cameraActionButtonText}>Save</Text>
            </TouchableOpacity>

          </View>
        </View>
      :
        <Camera
          style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}
          type={type}
          ref={ref => { camera = ref }} 
        >
          <ButtonSmall handleChange={handleCloseCamera} style={styles.backButton}>
            <Icon name="arrow-back-outline" type="ionicon" size={20} />
          </ButtonSmall>
          {loading &&
            <View style={styles.loading} pointerEvents="none">
              <Icon type="material" name="sync" size={64} color="#FFF" />
            </View>
          }
          <TouchableOpacity style={styles.cameraButton} onPress={onTakePicture} />
        </Camera>
      }

    </View>
  )
}

const styles = StyleSheet.create({
  cameraButton: {
    width: 64,
    height: 64,
    borderRadius: 500,
    backgroundColor: 'white',
    marginBottom: 32
  },
  imagePreview: {
    backgroundColor: 'transparent',
    flex: 1,
    width: '100%',
    height: '100%'
  },
  cameraActions: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 32,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  cameraActionButton: {
    backgroundColor: colors.lightGrey,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 500
  },
  cameraActionButtonText: {
    fontSize: 24,
    color: colors.black
  },
  loading: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.black,
    opacity: .5,
    zIndex: 2
  },
  backButton: {
    position: 'absolute',
    left: 16,
    top: 16
  }
})

export default TakePicture