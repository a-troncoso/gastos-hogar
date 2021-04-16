import React, { useRef, useState, useEffect } from "react"
import { StyleSheet, View, Text } from "react-native"
import { Camera as NativeCamera } from "expo-camera"

const Camera = () => {
  const cameraRef = useRef(null)
  const [hasCameraPermission, setHasCameraPermission] = useState(null)
  const [cameraMounted] = useState(true)

  useEffect(() => {
    _requestCameraPermission()
  }, [])

  const _requestCameraPermission = async () => {
    const { granted } = await NativeCamera.requestPermissionsAsync()
    setHasCameraPermission(granted)
    // await Permissions.askAsync(Permissions.CAMERA_ROLL)
  }

  return (
    <>
      {hasCameraPermission && cameraMounted ? (
        <NativeCamera style={expenseCamera.camera} ref={cameraRef}>
          <View style={expenseCamera.scanCameraContent}></View>
        </NativeCamera>
      ) : (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text>Loading...</Text>
        </View>
      )}
    </>
  )
}

const expenseCamera = StyleSheet.create({
  camera: { flex: 1, height: "100%" },
  scanCameraContent: {
    flex: 1,
    backgroundColor: "transparent"
  }
})

export default Camera
