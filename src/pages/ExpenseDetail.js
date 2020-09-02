import React, { useRef, useState, useCallback, useEffect } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  ToastAndroid,
  Text
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
    height: 80,
    alignItems: "center",
    backgroundColor: color.blue["50"]
  }
});

const ExpenseImage = props => {
  return (
    <View style={expenseImage.view}>
      <View style={expenseImage.expenseCameraView}>
        <ExpenseCamera />
      </View>
      <View style={expenseImage.amountView}>
        <Text style={expenseImage.amount}>$ 0</Text>
      </View>
    </View>
  );
};

const expenseImage = StyleSheet.create({
  view: {
    width: 136,
    height: 192,
    flexDirection: "column",
    borderRadius: 16,
    backgroundColor: color.white
  },
  expenseCameraView: {
    flex: 1
    // borderColor: "red",
    // borderWidth: 1,
    // borderStyle: "solid"
  },
  amountView: {
    paddingVertical: 4
    // borderColor: "blue",
    // borderWidth: 1,
    // borderStyle: "solid"
  },
  amount: {
    color: "red",
    borderStyle: "solid",
    textAlign: "center"
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

const KeyValue = () => {
  return (
    <View style={keyValueStyles.view}>
      <Text>Fecha</Text>
      <Text>02/10/2020</Text>
    </View>
  );
};

const keyValueStyles = StyleSheet.create({
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
    borderWidth: 1
  }
});

const ExpenseDetail = props => {
  const { mode } = props;

  return (
    <View style={expenseDetail.view}>
      <Hero central={<ExpenseImage />} />
      <View style={expenseDetail.features}>
        <KeyValue />
        <KeyValue />
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
    paddingHorizontal: 16
  }
});

export default ExpenseDetail;
