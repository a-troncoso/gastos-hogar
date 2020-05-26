import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Camera } from "expo-camera";
import * as Permissions from "expo-permissions";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import { insertPurchase } from "../dbOperations/purchase/purchaseBDTransactions";

const Scan = props => {
  const { navigation, route } = props;

  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [hasCameraRollPermission, setHasCameraRollPermission] = useState(null);
  const [pictureTaked, setPictureTaked] = useState(false);
  const cameraRef = useRef(null);

  useEffect(() => {
    _requestCameraPermission();
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

    cameraRef.current.takePictureAsync().then(data => {
      _handlePictureSaved(data);
      navigation.navigate("Categories");
    });
  };

  const _handlePictureSaved = e => {
    setPictureTaked(true);
    const { uri } = e;
    _savePictureInAppMemory(uri);
    _savePictureInAppInternalStorage(uri);
  };

  const _savePictureInAppMemory = async pictureURI => {
    const to = `${FileSystem.documentDirectory}${pictureURI.substring(
      pictureURI.lastIndexOf("/") + 1,
      pictureURI.length
    )}`;

    try {
      const result = await FileSystem.copyAsync({
        from: pictureURI,
        to
      });
      _savePurchaseInDB(pictureURI);
    } catch (err) {
      console.error("Error on copyAsync", err);
    }
  };

  const _savePictureInAppInternalStorage = async pictureURI => {
    const to = `${FileSystem.documentDirectory}${pictureURI.substring(
      pictureURI.lastIndexOf("/") + 1,
      pictureURI.length
    )}`;

    try {
      await MediaLibrary.createAssetAsync(to);
    } catch (err) {
      console.error("Error on createAssetAsync", err);
    }
  };

  const _savePurchaseInDB = pictureURI => {
    insertPurchase(pictureURI, route.params.categoryId);
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
            ></View>
            <View
              style={{
                flex: 1,
                backgroundColor: "transparent",
                alignItems: "center",
                justifyContent: "flex-end"
              }}
            >
              <TouchableOpacity
                style={{
                  width: 80,
                  height: 80,
                  marginBottom: 24,
                  borderRadius: 100 / 2,
                  borderColor: "white",
                  borderStyle: "solid",
                  borderWidth: 3,
                  backgroundColor: "transparent"
                }}
                onPress={handlePressTakePicture}
              />
            </View>
          </View>
        </Camera>
      ) : (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text>Loading...</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: "#fff"
    // borderColor: "red",
    // borderStyle: "solid",
    // borderWidth: 1
  }
});

export default Scan;
