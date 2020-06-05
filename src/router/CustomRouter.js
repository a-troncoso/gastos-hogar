import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import PurchaseImagesModal from "../domain/purchase/PurchaseImagesModal";
import PurchaseRegistry from "../pages/PurchaseRegistry";
import History from "../pages/History";
import Purchases from "../pages/Purchases";
import Purchase from "../pages/Purchase";
import CategoriesAdminGate from "../pages/CategoriesAdminGate";

const RootStack = createStackNavigator();
const PurchaseRegistryStack = createStackNavigator();
const SummaryStack = createStackNavigator();
const CategoryManagementStack = createStackNavigator();
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

  const CategoryManagementStackScreen = () => {
    return (
      <CategoryManagementStack.Navigator headerMode="none">
        <CategoryManagementStack.Screen
          name="CategoriesAdminGate"
          component={CategoriesAdminGate}
        />
      </CategoryManagementStack.Navigator>
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
        <Drawer.Screen
          name="CategoryManagement"
          component={CategoryManagementStackScreen}
          options={{ title: "Administrar Categorías" }}
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
