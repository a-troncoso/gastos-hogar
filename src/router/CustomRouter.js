import React from "react";
import { Button, View } from "react-native";
import { NavigationContainer, DrawerActions } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem
} from "@react-navigation/drawer";
import PurchaseImagesModal from "../domain/purchase/PurchaseImagesModal";
import ExpenseCategoryGate from "../pages/RegistryExpenseGate";
import History from "../pages/History";
import Purchases from "../pages/Purchases";
import Purchase from "../pages/Purchase";
import CategoriesAdminGate from "../pages/CategoriesAdminGate";
import DashbhoardGate from "../pages/DashbhoardGate";
import CategoryDetail from "../pages/CategoryDetail";
import CategoryCreation from "../pages/CategoryCreation";

import color from "../utils//styles/color";

const RootStack = createStackNavigator();
const RegistryExpenseStack = createStackNavigator();
const SummaryStack = createStackNavigator();
const CategoryManagementStack = createStackNavigator();
const DashboardStack = createStackNavigator();
const Drawer = createDrawerNavigator();

const CustomRouter = () => {
  const screenGlobalOption = navigation => ({
    title: "",
    headerStyle: {
      height: 80,
      backgroundColor: color.blue["50"],
      elevation: 0, // Android
      shadowOpacity: 0 // iOS
    },
    headerTitleStyle: {
      fontSize: 20,
      textAlign: "center"
    },
    headerLeft: () => (
      <Button
        onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
        title="Menu"
        color="#000"
      />
    ),
    headerRight: () => <View></View>
  });

  const RegistryExpense = () => {
    return (
      <RegistryExpenseStack.Navigator>
        <RegistryExpenseStack.Screen
          name="ExpenseCategoryGate"
          component={ExpenseCategoryGate}
          options={({ navigation }) => ({
            ...screenGlobalOption(navigation),
            title: "Categoría del egreso"
          })}
        />
      </RegistryExpenseStack.Navigator>
    );
  };

  const SummaryStackScreen = () => {
    return (
      <SummaryStack.Navigator>
        <SummaryStack.Screen
          name="History"
          component={History}
          options={{ ...screenGlobalOption, title: "Historial" }}
        />
        <SummaryStack.Screen
          name="Purchases"
          component={Purchases}
          options={{ ...screenGlobalOption, title: "Compras este Mes" }}
        />
        <SummaryStack.Screen
          name="Purchase"
          component={Purchase}
          options={{ ...screenGlobalOption, title: "Detalle de la Compra" }}
        />
      </SummaryStack.Navigator>
    );
  };

  const CategoryManagementStackScreen = () => {
    return (
      <CategoryManagementStack.Navigator>
        <CategoryManagementStack.Screen
          name="CategoriesAdminGate"
          component={CategoriesAdminGate}
          options={{ ...screenGlobalOption, title: "Administrar Categorías" }}
        />
        <CategoryManagementStack.Screen
          name="CategoryDetail"
          component={CategoryDetail}
          options={{ ...screenGlobalOption, title: "Detalle de la categoría" }}
        />
        <CategoryManagementStack.Screen
          name="CategoryCreation"
          component={CategoryCreation}
          options={{ ...screenGlobalOption, title: "Crear categoría" }}
        />
      </CategoryManagementStack.Navigator>
    );
  };

  const DashboardStackScreen = () => {
    return (
      <DashboardStack.Navigator>
        <DashboardStack.Screen
          name="DashbhoardGate"
          component={DashbhoardGate}
          options={{ ...screenGlobalOption, title: "Dashboard" }}
        />
      </DashboardStack.Navigator>
    );
  };

  const DrawerContent = props => {
    return (
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
    );
  };

  const MainStackScreen = () => {
    return (
      <Drawer.Navigator
        initialRouteName="RegistryExpense"
        drawerContent={props => <DrawerContent {...props} />}
      >
        <Drawer.Screen
          name="Dashboard"
          component={DashboardStackScreen}
          options={{ title: "Dashboard" }}
        />
        <Drawer.Screen name="RegistryExpense" component={RegistryExpense} />
        <Drawer.Screen
          name="Summary"
          component={SummaryStackScreen}
          options={{ title: "Historial" }}
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
