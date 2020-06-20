import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { Camera } from "expo-camera";
import * as Permissions from "expo-permissions";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import { insertPurchase } from "../dbOperations/purchase/purchaseBDTransactions";

const Scan = props => {
  const { navigation, route } = props;

  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [cameraMounted, setCameraMounted] = useState(true);
  const [pictures, setPictures] = useState([]);
  const cameraRef = useRef(null);

  useFocusEffect(
    useCallback(() => {
      setCameraMounted(true);

      return () => {
        setCameraMounted(false);
      };
    }, [])
  );

  useEffect(() => {
    _requestCameraPermission();
  }, []);

  useEffect(() => {
    if (!cameraMounted) navigation.navigate("Categories");
  }, [cameraMounted]);

  const _requestCameraPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    setHasCameraPermission(status === "granted");
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
  };

  const handlePressTakePicture = () => {
    if (!cameraRef) return;

    cameraRef.current.takePictureAsync().then(data => {
      setCameraMounted(false);
      setPictures([...pictures, data.uri]);
      _handlePictureSaved(data);
    });
  };

  const _handlePictureSaved = e => {
    const { uri } = e;
    _savePictureInAppMemory(uri);
    _savePictureInAppInternalStorage(uri);
  };

  const _savePictureInAppMemory = async pictureURI => {
    const to = `${FileSystem.documentDirectory}/${pictureURI.substring(
      pictureURI.lastIndexOf("/") + 1,
      pictureURI.length
    )}`;

    try {
      await FileSystem.copyAsync({ from: pictureURI, to });
      _savePurchaseInDB(pictureURI);
    } catch (err) {
      console.error("Error on copyAsync", err);
    }
  };

  const _savePictureInAppInternalStorage = async pictureURI => {
    const to = `${FileSystem.documentDirectory}/${pictureURI.substring(
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
    <View style={styles.scan}>
      {hasCameraPermission && cameraMounted ? (
        <Camera style={{ flex: 1 }} ref={cameraRef}>
          <View style={styles.scanCameraContent}>
            <View style={styles.scanPicturesRollView}>
              <FlatList
                data={pictures}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                keyExtractor={item => item}
                renderItem={({ item }) => (
                  <Image
                    style={styles.scanTakedPicture}
                    source={{ uri: item }}
                  ></Image>
                )}
              ></FlatList>
            </View>
            <View style={styles.scanTakePictureView}>
              <TouchableOpacity
                style={styles.scanTakePictureBtn}
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
    height: 100,
    justifyContent: "flex-end",
    flexDirection: "row",
    paddingVertical: 10
    // borderColor: "green",
    // borderWidth: 1,
    // borderStyle: "solid"
  },
  scanTakedPicture: {
    width: 80,
    marginHorizontal: 4
    // backgroundColor: "#E8E8E8",
    // borderColor: "red",
    // borderWidth: 1,
    // borderStyle: "solid"
  },
  scanTakePictureView: {
    // borderColor: "white",
    // borderWidth: 1,
    // borderStyle: "solid",
    flex: 0.1,
    minHeight: 80,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center"
  },
  scanTakePictureBtn: {
    width: 80,
    height: 80,
    // marginBottom: 24,
    borderRadius: 100 / 2,
    borderColor: "white",
    borderStyle: "solid",
    borderWidth: 3,
    backgroundColor: "transparent"
  }
});

export default Scan;
