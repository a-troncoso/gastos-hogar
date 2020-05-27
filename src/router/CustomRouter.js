import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import PurchaseRegistry from "../pages/PurchaseRegistry";
import History from "../pages/History";
import Purchases from "../pages/Purchases";
import Purchase from "../pages/Purchase";
import PurchaseImagesModal from "../domain/purchase/PurchaseImagesModal";

const RootStack = createStackNavigator();
const PurchaseRegistryStack = createStackNavigator();
const SummaryStack = createStackNavigator();
const Drawer = createDrawerNavigator();

const CustomRouter = () => {
  const summaryScreenOptions = {
    title: "",
    headerStyle: {
      height: 60
    },
    headerTitleStyle: {
      fontSize: 16,
      textAlign: "center"
    }
  };

  const SummaryStackScreen = () => {
    return (
      <SummaryStack.Navigator>
        <SummaryStack.Screen
          name="History"
          component={History}
          options={{ ...summaryScreenOptions, title: "Historial" }}
        />
        <SummaryStack.Screen
          name="Purchases"
          component={Purchases}
          options={{ ...summaryScreenOptions, title: "Compras este Mes" }}
        />
        <SummaryStack.Screen
          name="Purchase"
          component={Purchase}
          options={{ ...summaryScreenOptions, title: "Detalle de la Compra" }}
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

export default CustomRouter;
