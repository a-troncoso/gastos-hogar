import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  Text,
  View,
  TouchableWithoutFeedback,
  TouchableHighlight,
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

const Menu = props => {
  const { onClickOutsideMenu, onPressItem } = props;

  const items = [{ id: 1, name: "Historial", screen: "History" }];

  return (
    <TouchableWithoutFeedback
      onPress={onClickOutsideMenu}
      style={styles.menuZone}
    >
      <View style={styles.menuWrapper}>
        <View style={styles.menu}>
          {items.map(item => (
            <TouchableOpacity
              key={item.id}
              style={styles.menuItem}
              onPress={() => onPressItem(item.screen)}
            >
              <Text>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const CustomRouter = () => {
  const [isMenuDisplayed, setMenuDisplayed] = useState(false);

  const screenOptions = {
    title: "",
    headerStyle: {
      height: 60
    },
    headerTitleStyle: {
      fontSize: 16,
      textAlign: "center"
    },
    headerRight: () => (
      <TouchableOpacity onPress={() => setMenuDisplayed(!isMenuDisplayed)}>
        <SimpleLineIcons name="menu" size={24} color="black" />
      </TouchableOpacity>
    ),
    headerRightContainerStyle: { padding: 8 }
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

  const MainStackScreen = () => {
    return (
      <MainStack.Navigator>
        <MainStack.Screen
          name="PurchaseRegistry"
          component={PurchaseRegistry}
          options={{ ...screenOptions, title: "Registrar Compra" }}
        />
        <MainStack.Screen
          name="History"
          component={History}
          options={{ ...screenOptions, title: "Historial" }}
        />
        <MainStack.Screen
          name="Purchases"
          component={Purchases}
          options={{ ...screenOptions, title: "Compras este Mes" }}
        />
        <MainStack.Screen
          name="Purchase"
          component={Purchase}
          options={{ ...screenOptions, title: "Detalle de la Compra" }}
        />
      </MainStack.Navigator>
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
      {isMenuDisplayed && (
        <Menu
          onClickOutsideMenu={() => setMenuDisplayed(!isMenuDisplayed)}
          onPressItem={e => console.log(e)}
        />
      )}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  menuZone: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
    // borderColor: "red",
    // borderStyle: "solid",
    // borderWidth: 10
  },
  menuWrapper: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#000000b3"
  },
  menu: {
    position: "absolute",
    top: Constants.statusBarHeight,
    right: 8,
    backgroundColor: "#fff",
    borderColor: "black",
    borderStyle: "solid",
    borderWidth: 1
  },
  menuItem: {
    paddingVertical: 8,
    paddingRight: 64,
    paddingLeft: 8,
    backgroundColor: "#fff",
    borderColor: "black",
    borderStyle: "solid",
    borderWidth: 1
  },
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
