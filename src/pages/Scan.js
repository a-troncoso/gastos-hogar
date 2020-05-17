import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Camera } from "expo-camera";
import * as Permissions from "expo-permissions";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("db.GastosHogarDB");

const Scan = props => {
  const { navigation } = props;

  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [hasCameraRollPermission, setHasCameraRollPermission] = useState(null);
  const [cameraReady, setCameraReady] = useState(false);
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
    console.log("picture saved: ", e);
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
      console.log("Se guarda imagen en memoria de la App", result);
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
      const result = await MediaLibrary.createAssetAsync(to);
      console.log("Se guarda imagen en Internal Storage", result);
    } catch (err) {
      console.error("Error on createAssetAsync", err);
    }
  };

  const _savePurchaseInDB = pictureURI => {
    const currendDate = new Date();
    db.transaction(tx => {
      tx.executeSql(
        "insert into purchase (image, category, subcategory, amount, comment, date) values (?, 'comida', '', 0, '', ?);",
        [pictureURI, currendDate.toISOString()],
        (transaction, result) => {
          console.info("Purchase inserted in DataBase", transaction);
          console.info("Purchase inserted in DataBase", result);
        },
        error => {
          console.error("Error inserting Purchase in Database", error);
        }
      );
      tx.executeSql("select * from purchase;", [], (transaction, result) => {
        console.log("Purchases", result.rows._array);
      });
    });
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
