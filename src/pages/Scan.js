import React, { useState, useEffect, useRef, useCallback } from "react"
import PropTypes from "prop-types"
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  FlatList,
  Image
} from "react-native"
import { MaterialIcons } from "@expo/vector-icons"
import { useFocusEffect } from "@react-navigation/native"
import { Camera } from "expo-camera"
import * as MediaLibrary from "expo-media-library"
import * as FileSystem from "expo-file-system"
import { Octicons } from "@expo/vector-icons"

import alerts from "../components/atoms/Alerts"
import color from "../assets/colors"

const { StorageAccessFramework } = FileSystem

const PurchaseImage = props => {
  const { uri, onRemoveImage } = props

  const [isRemoveIconVisible, setIsRemoveIconVisible] = useState(false)

  const handlePressImage = () => {
    if (isRemoveIconVisible) onRemoveImage({ uri })
    else setIsRemoveIconVisible(true)
  }

  return (
    <TouchableWithoutFeedback onPress={handlePressImage}>
      <View style={styles.purchaseImageView}>
        <Image style={styles.purchaseImageImage} source={{ uri }} />
        {isRemoveIconVisible && (
          <View style={styles.purchaseImageRemoveView}>
            <Octicons
              style={styles.purchaseImageRemoveIcon}
              name="trashcan"
              size={40}
              color="#f02e2e"
            />
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  )
}

PurchaseImage.defaultProps = {
  onRemoveImage: () => {}
}

PurchaseImage.propTypes = {
  onRemoveImage: PropTypes.func
}

const Scan = props => {
  const { navigation, route } = props
  const { params: routeParams } = route

  const [hasCameraPermission, setHasCameraPermission] = useState(null)
  const [cameraMounted, setCameraMounted] = useState(true)
  const [pictures, setPictures] = useState([])
  const [isPurchaseInserted, setIsPurchaseInserted] = useState(false)
  const cameraRef = useRef(null)
  const picturesRoll = useRef(null)
  const AppUri = StorageAccessFramework.getUriForDirectoryInRoot("GastosHogar")

  useFocusEffect(
    useCallback(() => {
      setCameraMounted(true)
      setIsPurchaseInserted(false)
      setPictures(routeParams.pictures)

      return () => {
        setCameraMounted(false)
      }
    }, [])
  )

  useEffect(() => {
    _requestCameraPermission()
    // _requestDirectoryPermission()
  }, [])

  const _requestCameraPermission = async () => {
    const { granted } = await Camera.requestPermissionsAsync()
    setHasCameraPermission(granted)
  }

  // const _requestDirectoryPermission = async () => {
  //   await StorageAccessFramework.requestDirectoryPermissionsAsync(AppUri)
  // }

  const handlePressTakePicture = () => {
    if (!cameraRef) return

    cameraRef.current.takePictureAsync().then(data => {
      setPictures([...pictures, data.uri])
      _handlePictureSaved(data)
    })
  }

  const _handlePictureSaved = e => {
    const { uri } = e
    _savePictureInAppMemory(uri)
    // _savePictureInAppInternalStorage(uri)
  }

  const _savePictureInAppMemory = async pictureURI => {
    const fileName = pictureURI.substring(
      pictureURI.lastIndexOf("/") + 1,
      pictureURI.length
    )
    const pathToSave = `${FileSystem.documentDirectory}/${fileName}`

    try {
      await FileSystem.copyAsync({ from: pictureURI, to: pathToSave })
    } catch (err) {
      alerts.throwErrorAlert("copiar fotos", JSON.stringify(err))
    }
  }

  // const _savePictureInAppInternalStorage = async pictureURI => {
  //   const to = `${FileSystem.documentDirectory}/${pictureURI.substring(
  //     pictureURI.lastIndexOf("/") + 1,
  //     pictureURI.length
  //   )}`

  //   try {
  //     const result = await MediaLibrary.createAssetAsync(to)
  //     _crop(result.uri)
  //   } catch (err) {
  //     alerts.throwErrorAlert(
  //       "guardar foto en el dispositivo",
  //       JSON.stringify(err)
  //     )
  //   }
  // }

  // TODO: implementar este recorte cuando termine feature nuevo diseño
  const _crop = async pictureTaked => {
    const cropProps = {
      offset: { x: 0, y: 0 },
      size: { width: 20, height: 20 }
    }

    // TODO: Revisar como cortar la imagen ya que la libreria culia de image.editor no funciona con rn
    // try {
    //   const croppedImageURI = await ImageEditor.cropImage(
    //     pictureTaked.uri,
    //     cropProps
    //   )

    //   if (croppedImageURI) {
    //     // _savePictureInAppMemory(_savePictureInAppMemory);
    //   }
    // } catch (cropError) {
    //   // alerts.throwErrorAlert("copiar fotos", JSON.stringify(cropError));
    // }
  }

  const handleRemoveImage = imageURI => {
    const filteredPictures = pictures.filter(p => p !== imageURI)
    setPictures(filteredPictures)
  }

  const handlePressNavigateNext = async () => {
    // We're executing callback function passed as route params
    routeParams.savePictures(pictures)
    navigation.navigate("ExpenseDetail")
  }

  if (!hasCameraPermission)
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>No hay permisos para acceder a la cámara</Text>
      </View>
    )
  return (
    <View style={styles.scan}>
      {cameraMounted && (
        <Camera style={{ flex: 1 }} ref={cameraRef}>
          <View style={styles.scanCameraContent}>
            <View style={styles.scanPicturesRollView}>
              <FlatList
                ref={picturesRoll}
                data={pictures}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                keyExtractor={item => item}
                renderItem={({ item }) => (
                  <PurchaseImage
                    uri={item}
                    onRemoveImage={e => handleRemoveImage(e.uri)}
                  />
                )}
                onContentSizeChange={() => picturesRoll.current.scrollToEnd()}
              ></FlatList>
            </View>
            <View style={styles.scanTakePictureView}>
              <View style={styles.scanTakePictureButtonsView}>
                <TouchableOpacity
                  style={styles.scanTakePictureBtn}
                  onPress={handlePressTakePicture}
                />
                {pictures.length > 0 && (
                  <TouchableOpacity
                    style={styles.scanSavePurchaseBtn}
                    onPress={handlePressNavigateNext}
                  >
                    <MaterialIcons
                      name="navigate-next"
                      size={32}
                      color={color.gray["140"]}
                    />
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
        </Camera>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  scan: {
    flex: 1,
    backgroundColor: "#fff"
  },
  scanCameraContent: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "transparent"
  },
  scanPicturesRollView: {
    // borderColor: "green",
    // borderWidth: 1,
    // borderStyle: "solid",
    height: 100,
    justifyContent: "flex-end",
    flexDirection: "row",
    paddingVertical: 10
  },
  scanTakePictureView: {
    // borderColor: "white",
    // borderWidth: 1,
    // borderStyle: "solid",
    height: 150,
    minHeight: 80,
    backgroundColor: "transparent"
  },
  scanTakePictureButtonsView: {
    // borderColor: "red",
    // borderWidth: 1,
    // borderStyle: "solid",
    position: "relative",
    flexDirection: "row",
    minHeight: 80,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center"
  },
  scanTakePictureBtn: {
    width: 80,
    height: 80,
    borderRadius: 100 / 2,
    borderColor: "white",
    borderStyle: "solid",
    borderWidth: 3,
    backgroundColor: "transparent"
  },
  scanSavePurchaseBtn: {
    position: "absolute",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    right: 16,
    width: 60,
    height: 60,
    borderRadius: 100 / 2,
    backgroundColor: color.blue["20"]
  },
  purchaseImageView: {
    position: "relative",
    width: 80,
    marginHorizontal: 4,
    borderColor: "white",
    borderWidth: 2,
    borderStyle: "solid",
    opacity: 0.75
  },
  purchaseImageImage: {
    width: "100%",
    height: "100%"
  },
  purchaseImageRemoveView: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center"
  }
})

export default Scan
