import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import {
  Text,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
  StyleSheet,
  Dimensions
} from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";
import Constants from "expo-constants";
import PurchaseRegistry from "../pages/PurchaseRegistry";
import History from "../pages/History";
import Purchases from "../pages/Purchases";
import Purchase from "../pages/Purchase";

const screenHeight =
  Math.round(Dimensions.get("window").height) - Constants.statusBarHeight;

const RootStack = createStackNavigator();
const MainStack = createStackNavigator();
const PurchaseRegistryStack = createStackNavigator();
const SummaryStack = createStackNavigator();
const Drawer = createDrawerNavigator();

const CustomRouter = () => {
  const screenOptions = {
    title: "",
    headerStyle: {
      height: 60
    },
    headerTitleStyle: {
      fontSize: 16,
      textAlign: "center"
    }
  };

  const PurchaseImagesModal = ({ route, navigation }) => {
    const [idxActiveImage, setIdxActiveImage] = useState(0);

    const { images } = route.params;

    useEffect(() => {
      console.log("idxActiveImage", idxActiveImage);
      if (idxActiveImage === images.length - 1) navigation.goBack();
    }, [idxActiveImage]);

    const handlePressMainImage = () => {
      setIdxActiveImage(idxActiveImage + 1);
    };

    return (
      <View style={styles.purchaseImagesModal}>
        <TouchableWithoutFeedback onPress={handlePressMainImage}>
          <View style={styles.purchaseImagesModalMainImageView}>
            <Text>{images[0]}</Text>
          </View>
        </TouchableWithoutFeedback>
        <View style={styles.purchaseImagesModalSecondaryImagesView}>
          {images.map((i, idx) => (
            <TouchableOpacity
              key={i}
              style={[
                styles.purchaseImagesModalSecondaryImageView,
                idxActiveImage === idx ? styles.withBorder : {}
              ]}
              onPress={() => {
                setIdxActiveImage(idx);
              }}
            >
              <Text>{i}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  const SummaryStackScreen = () => {
    return (
      <SummaryStack.Navigator>
        <SummaryStack.Screen
          name="History"
          component={History}
          options={{ ...screenOptions, title: "Historial" }}
        />
        <SummaryStack.Screen
          name="Purchases"
          component={Purchases}
          options={{ ...screenOptions, title: "Compras este Mes" }}
        />
        <SummaryStack.Screen
          name="Purchase"
          component={Purchase}
          options={{ ...screenOptions, title: "Detalle de la Compra" }}
        />
      </SummaryStack.Navigator>
    );
  };

  const PurchaseRegistryStackScreen = () => {
    return (
      <PurchaseRegistryStack.Navigator headerMode="none">
        <PurchaseRegistryStack.Screen
          name="PurchaseRegistry"
          component={PurchaseRegistry}
        />
      </PurchaseRegistryStack.Navigator>
    );
  };

  const MainStackScreen = () => {
    return (
      <Drawer.Navigator initialRouteName="PurchaseRegistry">
        <Drawer.Screen
          name="PurchaseRegistry"
          component={PurchaseRegistryStackScreen}
          options={{ title: "Registrar Compra" }}
        />
        <Drawer.Screen
          name="Summary"
          component={SummaryStackScreen}
          options={{ title: "Resumen" }}
        />
      </Drawer.Navigator>
    );
  };

  const RootStackScreen = () => {
    return (
      <RootStack.Navigator mode="modal">
        <RootStack.Screen
          name="Main"
          component={MainStackScreen}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
          name="PurchaseImagesModal"
          component={PurchaseImagesModal}
          options={{
            title: "Fotos de la compra",
            headerStyle: {
              height: 60
            },
            headerTitleStyle: {
              fontSize: 16,
              textAlign: "center"
            }
          }}
        />
      </RootStack.Navigator>
    );
  };

  return (
    <NavigationContainer>
      <RootStackScreen />
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  purchaseImagesModal: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#fff"
  },
  purchaseImagesModalMainImageView: {
    height: screenHeight * 0.8 - 16,
    borderColor: "black",
    borderStyle: "solid",
    borderWidth: 1,
    backgroundColor: "#E8E8E8"
  },
  purchaseImagesModalSecondaryImagesView: {
    height: screenHeight * 0.2 + 16,
    flexDirection: "row",
    paddingTop: 8,
    paddingBottom: 16,
    paddingHorizontal: 8,
    justifyContent: "space-between"
  },
  purchaseImagesModalSecondaryImageView: {
    width: 100,
    height: 100,
    backgroundColor: "#E8E8E8"
  },
  withBorder: {
    borderColor: "black",
    borderStyle: "solid",
    borderWidth: 1
  }
});

export default CustomRouter;
