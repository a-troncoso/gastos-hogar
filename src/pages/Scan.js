import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Camera } from "expo-camera";
import * as Permissions from "expo-permissions";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";

const Scan = () => {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [hasCameraRollPermission, setHasCameraRollPermission] = useState(null);
  const [cameraReady, setCameraReady] = useState(false);
  const [pictureTaked, setPictureTaked] = useState(false);
  const cameraRef = useRef(null);

  useEffect(() => {
    _requestCameraPermission();

    return () => {
      setHasCameraPermission(false);
    };
  }, []);

  const _requestCameraPermission = async () => {
    const cameraPermissionResult = await Permissions.askAsync(
      Permissions.CAMERA
    );
    const cameraRollPermissionResult = await Permissions.askAsync(
      Permissions.CAMERA_ROLL
    );
    setHasCameraPermission(cameraPermissionResult.granted);
    setHasCameraRollPermission(cameraRollPermissionResult.granted);
  };

  const handlePressTakePicture = () => {
    if (!cameraRef) return;

    // cameraRef.current.takePictureAsync({ onPictureSaved: handlePictureSaved });
    cameraRef.current.takePictureAsync().then(data => {
      _handlePictureSaved(data);
    });
  };

  const _handlePictureSaved = e => {
    console.log("picture saved", e);
    setPictureTaked(true);
    const { uri } = e;
    _copyImage(uri);
  };

  const _copyImage = async uri => {
    const to = `${FileSystem.documentDirectory}${uri.substring(
      uri.lastIndexOf("/") + 1,
      uri.length
    )}`;
    console.log("to", to);

    let result = null;

    try {
      // To save in a memory of application
      result = await FileSystem.copyAsync({
        from: uri,
        to
      });
      console.log("result copyAsync", result);
    } catch (err) {
      console.log("Error on copyAsync", err);
    }

    try {
      // To save in phone internal storage
      result = await MediaLibrary.createAssetAsync(to);
      console.log("result", result);
    } catch (err) {
      console.log("Error on createAssetAsync", err);
    }
  };

  return (
    <View style={styles.app}>
      {hasCameraPermission && hasCameraRollPermission ? (
        <Camera style={{ flex: 1 }} ref={cameraRef}>
          <View
            style={{
              flex: 1,
              justifyContent: "space-around",
              backgroundColor: "transparent"
            }}
          >
            <View
              style={{
                flex: 1,
                backgroundColor: "transparent"
              }}
            >
              <Text style={{ fontSize: 16, color: "white" }}>
                Camera ready!
              </Text>
              {pictureTaked && (
                <Text style={{ fontSize: 16, color: "white" }}>
                  Picture taked!
                </Text>
              )}
            </View>
            <View
              style={{
                flex: 1,
                backgroundColor: "transparent",
                alignItems: "flex-end"
              }}
            >
              <TouchableOpacity
                style={{
                  alignItems: "center",
                  backgroundColor: "red"
                }}
                onPress={handlePressTakePicture}
              >
                <Text style={{ fontSize: 30, color: "white" }}>¡Take Pic!</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Camera>
      ) : (
        <Text>No access to camera</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: "#fff",
    borderColor: "red",
    borderStyle: "solid",
    borderWidth: 1
  }
});

export default Scan;
