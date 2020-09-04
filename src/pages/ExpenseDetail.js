import React, { useRef, useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight
} from "react-native";
import { Camera } from "expo-camera";
import * as Permissions from "expo-permissions";

import color from "../utils/styles/color";

const Hero = props => {
  const { central } = props;

  return <View style={styles.hero}>{central}</View>;
};

const styles = StyleSheet.create({
  hero: {
    // borderColor: "red",
    // borderWidth: 1,
    // borderStyle: "solid",
    height: 112,
    alignItems: "center",
    backgroundColor: color.blue["50"]
  }
});

const ExpenseImage = props => {
  const { onPressCamera } = props;

  return (
    <View style={expenseImage.view}>
      <View style={expenseImage.expenseCameraView}>
        <TouchableHighlight
          style={expenseImage.cameraTouchable}
          onPress={() => onPressCamera()}
        >
          <ExpenseCamera />
        </TouchableHighlight>
      </View>
      <View style={expenseImage.amountView}>
        <Text style={expenseImage.amount}>$ 0</Text>
      </View>
    </View>
  );
};

const expenseImage = StyleSheet.create({
  view: {
    // borderColor: "blue",
    // borderWidth: 1,
    // borderStyle: "solid",
    width: 136,
    height: 224,
    flexDirection: "column",
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: color.white,
    shadowColor: color.gray["50"],
    shadowOffset: {
      width: 0,
      height: 6
    },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 6
  },
  expenseCameraView: {
    // borderColor: "red",
    // borderWidth: 1,
    // borderStyle: "solid",
    flex: 1
  },
  amountView: {
    // borderColor: "blue",
    // borderWidth: 1,
    // borderStyle: "solid",
    paddingVertical: 4
  },
  amount: {
    color: "red",
    borderStyle: "solid",
    textAlign: "center"
  },
  cameraTouchable: {
    // borderColor: "blue",
    // borderWidth: 1,
    // borderStyle: "solid",
    flex: 1
  }
});

const ExpenseCamera = () => {
  const cameraRef = useRef(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [cameraMounted, setCameraMounted] = useState(true);

  useEffect(() => {
    _requestCameraPermission();
    setCameraMounted(true);

    return () => {
      setCameraMounted(false);
    };
  }, []);

  const _requestCameraPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    setHasCameraPermission(status === "granted");
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
  };

  return (
    <>
      {hasCameraPermission && cameraMounted ? (
        <Camera style={expenseCamera.camera} ref={cameraRef}>
          <View style={expenseCamera.scanCameraContent}></View>
        </Camera>
      ) : (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text>Loading...</Text>
        </View>
      )}
    </>
  );
};

const expenseCamera = StyleSheet.create({
  camera: { flex: 1, height: "100%" },
  scanCameraContent: {
    flex: 1,
    backgroundColor: "transparent"
  }
});

const Feature = () => {
  return (
    <View style={featureStyles.view}>
      <Text>Fecha</Text>
      <Text>02/10/2020</Text>
    </View>
  );
};

const featureStyles = StyleSheet.create({
  view: {
    height: 56,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderColor: color.blue["60"],
    borderStyle: "solid",
    borderWidth: 1,
    backgroundColor: color.white
  }
});

const ExpenseDetail = props => {
  const { mode, navigation } = props;

  return (
    <View style={expenseDetail.view}>
      <Hero
        central={
          <ExpenseImage onPressCamera={() => navigation.navigate("Scan")} />
        }
      />
      <View style={expenseDetail.features}>
        <Feature />
        <Feature />
        <Feature />
        <Feature />
      </View>
    </View>
  );
};

const expenseDetail = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: color.blue["90"]
  },
  features: {
    paddingHorizontal: 16,
    paddingTop: 112 + 16
  }
});

export default ExpenseDetail;
