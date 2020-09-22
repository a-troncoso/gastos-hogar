import React, { useRef, useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  Alert,
  Picker
} from "react-native";
import { Camera } from "expo-camera";
import * as Permissions from "expo-permissions";

import Hero from "../domain/shared/Hero";
import CategorySelector from "../domain/category/CategroySelector";

import color from "../utils/styles/color";

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
    backgroundColor: color.gray["0"],
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
    paddingVertical: 8
  },
  amount: {
    color: "red",
    borderStyle: "solid",
    textAlign: "center",
    fontWeight: "bold"
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

const Feature = props => {
  const { name, value, voidValue, onPressFeature, editableElement } = props;

  const [isVisibleEditableElement, setIsVisibleEditableElement] = useState(
    false
  );

  const handlePressFeature = () => {
    setIsVisibleEditableElement(!isVisibleEditableElement);
    onPressFeature();
  };

  return (
    <TouchableOpacity onPress={() => handlePressFeature()}>
      <View style={featureStyles.view}>
        <Text style={featureStyles.featureName}>{name}</Text>
        <Text
          style={[
            featureStyles.featureValue,
            value ? featureStyles.existValue : featureStyles.notExistValue
          ]}
        >
          {value || voidValue}
        </Text>
      </View>
      {/* {isVisibleEditableElement && editableElement} */}
      {editableElement}
    </TouchableOpacity>
  );
};

const featureStyles = StyleSheet.create({
  view: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderColor: color.blue["60"],
    borderStyle: "solid",
    borderWidth: 1,
    backgroundColor: color.gray["0"]
  },
  featureName: {
    // borderColor: "blue",
    // borderWidth: 1,
    // borderStyle: "solid",
    color: color.gray["110"],
    fontWeight: "bold",
    textTransform: "capitalize"
  },
  featureValue: {
    // borderColor: "blue",
    // borderWidth: 1,
    // borderStyle: "solid",
    fontWeight: "bold",
    textTransform: "capitalize"
  },
  existValue: {
    color: color.gray["140"]
  },
  notExistValue: {
    color: color.gray["80"]
  }
});

const ExpenseDetail = props => {
  const { route, navigation } = props;
  const { params } = route;

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // _fetchPurchase(route.params.purchaseId);
    _fetchCategories();
  }, []);

  const _fetchCategories = async () => {
    const categories = await fetchAllCategories();
    setCategories(categories);
  };

  // const handlePressFeature = () => {
  //   editaitableElemble.category.isVisible(!editableElement.category.isVisible);
  // };
  const [editableElements, setEditatableElements] = useState({
    category: { isVisible: false }
  });

  const handleSelectCategory = category => {
    console.log("category", category);

    setEditatableElements({
      ...editableElements,
      category: { isVisible: false }
    });
  };

  const expenseFeatures = {
    images: { isListable: false },
    amount: { isListable: false, value: null, name: "monto", voidValue: "" },
    date: {
      isListable: true,
      value: "16/11/2020",
      name: "fecha",
      voidValue: "sin registrar",
      onPressFeature: () => console.log("Se presiona fecha "),
      editableElement: <></>
    },
    category: {
      isListable: true,
      value: "alimentos",
      name: "categoría",
      voidValue: "sin categoría",
      onPressFeature: () =>
        setEditatableElements({
          ...editableElements,
          category: { isVisible: true }
        }),
      editableElement: (
        <CategorySelector
          isModalVisible={editableElements.category.isVisible}
          onBackdropPress={() =>
            setEditatableElements({
              ...editableElements,
              category: { isVisible: false }
            })
          }
          onPressCategory={category => handleSelectCategory(category)}
        />
      )
    },
    subcategory: {
      isListable: true,
      value: null,
      name: "subcategoría",
      voidValue: "sin subcategoría",
      onPressFeature: () => console.log("Se presiona subcategoría"),
      editableElement: <></>
    },
    description: {
      isListable: true,
      value: null,
      name: "descripción",
      voidValue: "ninguna",
      onPressFeature: () => Alert.alert("Hpña"),
      editableElement: <></>
    }
  };

  return (
    <View style={expenseDetail.mainView}>
      {/* TODO: Este model se supone q debería mostrar */}
      {/* <Modal isVisible={true}>
        <View style={{ flex: 1, width: 100, height: 100 }}>
          <Text>I am the modal content!</Text>
        </View>
      </Modal> */}
      <Hero
        central={
          <ExpenseImage
            onPressCamera={() =>
              navigation.navigate("Scan", { fromMode: params.mode })
            }
          />
        }
      />
      <View style={expenseDetail.features}>
        {Object.keys(expenseFeatures).map(
          (ef, idx) =>
            expenseFeatures[ef].isListable && (
              <Feature
                key={idx}
                name={expenseFeatures[ef].name}
                value={expenseFeatures[ef].value}
                voidValue={expenseFeatures[ef].voidValue}
                editableElement={expenseFeatures[ef].editableElement}
                onPressFeature={expenseFeatures[ef].onPressFeature}
              />
            )
        )}
      </View>
      <View style={expenseDetail.fixedBottomArea}>
        {params.mode === "NEW_EXPENSE" && (
          <TouchableOpacity
            style={expenseDetail.saveBtn}
            onPress={() => console.log("guardar")}
          >
            <Text style={expenseDetail.saveBtnText}>GUARDAR</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const expenseDetail = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: color.blue["90"]
  },
  features: {
    paddingHorizontal: 16,
    paddingTop: 112 + 24
  },
  fixedBottomArea: {
    // borderColor: "blue",
    // borderWidth: 1,
    // borderStyle: "solid",
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
    paddingHorizontal: 16,
    paddingBottom: 16
  },
  saveBtn: {
    // borderColor: "blue",
    // borderWidth: 1,
    // borderStyle: "solid",
    paddingVertical: 16,
    paddingHorizontal: 32,
    alignItems: "center",
    backgroundColor: color.blue["20"],
    borderRadius: 8
  },
  saveBtnText: {
    fontWeight: "bold"
  },
  purchaseCategoryPicker: {
    width: 200,
    height: 44,
    borderColor: "black",
    borderWidth: 1,
    borderStyle: "solid",
    textAlign: "left"
  }
});

export default ExpenseDetail;
