import React, { useState, useEffect, useRef, useCallback } from "react";
import PropTypes from "prop-types";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  FlatList,
  Image
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { Camera } from "expo-camera";
import * as Permissions from "expo-permissions";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import { insertPurchase } from "../dbOperations/purchase/purchaseBDTransactions";

import throwErrorAlert from '../utils/alerts/Alerts';

import { Octicons } from "@expo/vector-icons";

const PurchaseImage = props => {
  const { uri, onRemoveImage } = props;

  const [isRemoveIconVisible, setIsRemoveIconVisible] = useState(false);

  const handlePressImage = () => {
    if (isRemoveIconVisible) onRemoveImage({ uri });
    else setIsRemoveIconVisible(true);
  };

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
  );
};

PurchaseImage.defaultProps = {
  onRemoveImage: () => {}
};

PurchaseImage.propTypes = {
  onRemoveImage: PropTypes.func
};

const Scan = props => {
  const { navigation, route } = props;

  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [cameraMounted, setCameraMounted] = useState(true);
  const [pictures, setPictures] = useState([]);
  const cameraRef = useRef(null);
  const picturesRoll = useRef(null);

  useFocusEffect(
    useCallback(() => {
      setCameraMounted(true);
      setPictures([]);

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
    } catch (err) {
      throwErrorAlert("copiar fotos", JSON.stringify(err));
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
      throwErrorAlert("guardar foto en el dispositivo", JSON.stringify(err));
    }
  };

  const handleRemoveImage = imageURI => {
    const filteredPictures = pictures.filter(p => p !== imageURI);
    setPictures(filteredPictures);
  };

  const savePurchase = async () => {
    try {
      await insertPurchase(pictures, route.params.categoryId, 1);
    } catch (err) {
      throwErrorAlert("ingresar la compra", JSON.stringify(err));
    }
    setCameraMounted(false);
  };

  return (
    <View style={styles.scan}>
      {hasCameraPermission && cameraMounted ? (
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
                    onPress={savePurchase}
                  >
                    <MaterialIcons
                      name="navigate-next"
                      size={32}
                      color="#0062ff"
                    />
                  </TouchableOpacity>
                )}
              </View>
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
    marginTop: 8,
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
    borderColor: "#0062ff",
    borderStyle: "solid",
    borderWidth: 3
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
});

export default Scan;
