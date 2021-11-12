// Base
import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity, Text, ImageBackground } from 'react-native'
// Lib
import { Camera } from 'expo-camera'
// Colors
import colors from '../constants/colors'

const TakePicture = ({ note, setNote, setOpenCamera, onOpenCamera }) => {
  const [type, setType] = useState(Camera.Constants.Type.back)
  const [previewVisible, setPreviewVisible] = useState(false)
  const [capturedImage, setCapturedImage] = useState(null)

  let camera = Camera

  const onTakePicture = async () => {
    if (camera) {
      let photo = await camera.takePictureAsync()
      setPreviewVisible(true)
      setCapturedImage(photo)
      console.log(photo)
    }
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
  }
})

export default TakePicture