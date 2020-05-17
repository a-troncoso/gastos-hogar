import React, { useState, useEffect, useRef } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  Text,
  View,
  Button,
  TouchableWithoutFeedback,
  TouchableHighlight,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";
import Constants from "expo-constants";
import Main from "../pages/Main";
import History from "../pages/History";
import Purchases from "../pages/Purchases";
import Purchase from "../pages/Purchase";

const Stack = createStackNavigator();

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

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="History"
          component={History}
          options={{ ...screenOptions, title: "Historial" }}
        />
        <Stack.Screen
          name="Purchases"
          component={Purchases}
          options={{ ...screenOptions, title: "Compras este Mes" }}
        />
        <Stack.Screen
          name="Purchase"
          component={Purchase}
          options={{ ...screenOptions, title: "Detalle de la Compra" }}
        />
        <Stack.Screen
          name="Main"
          component={Main}
          options={{ ...screenOptions, title: "Registrar Compra" }}
        />
      </Stack.Navigator>
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
    bottom: 0,
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
  }
});

export default CustomRouter;
