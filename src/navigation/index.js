import React, { useContext } from "react";
import { View, StatusBar } from "react-native";
import { NavigationContainer, DrawerActions } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";

import MenuButton from "../components/atoms/MenuButton/MenuButton";
import ExpenseCategoryGate from "../pages/RegistryExpenseGate";
import ExpenseDetail from "../pages/ExpenseDetail";
import ScanExpense from "../pages/Scan";
import HistoryGate from "../pages/HistoryGate";
import Expenses from "../pages/Expenses";
import CategoriesAdminGate from "../pages/CategoriesAdminGate";
import DashbhoardGate from "../pages/DashbhoardGate";
import HomeGate from "../pages/HomeGate";
import { CategoryDetail } from "../modules/category/pages";
import IncomeDetail from "../pages/IncomeDetail";

import ScreenNames from "./screenNames";
import { EXPENSE_DETAIL_MODES } from "../domain/expense/expenseDetailModes";
import color from "../assets/colors";
import AppContext from "../state";

const RootStack = createStackNavigator();
const RegistryExpenseStack = createStackNavigator();
const SummaryStack = createStackNavigator();
const CategoryManagementStack = createStackNavigator();
const IncomeManagementStack = createStackNavigator();
const DashboardStack = createStackNavigator();
const Drawer = createDrawerNavigator();

const screenOptionsBase = navigation => ({
  title: "",
  headerStyle: {
    height: 80,
    backgroundColor: color.blue["50"],
    elevation: 0, // Android
    shadowOpacity: 0, // iOS
  },
  headerTitleStyle: {
    fontSize: 20,
    textAlign: "center",
  },
  headerLeft: () => (
    <MenuButton
      type="main"
      onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
    />
  ),
  headerRight: () => <View></View>,
});

const AppNavigation = () => {
  // const appContext = useContext(AppContext)

  const RootStackScreenNavigator = () => {
    return (
      <RootStack.Navigator>
        <RootStack.Screen
          name={ScreenNames.RootStackScreenNavigator.Main}
          component={MainStackScreenNavigator}
          options={{ headerShown: false }}
          initialRouteName={ScreenNames.HomeStackNavigator.HomeGate}
        />
      </RootStack.Navigator>
    );
  };

  const MainStackScreenNavigator = () => {
    return (
      <>
        <StatusBar
          animated
          backgroundColor={color.blue["20"]}
          barStyle="dark-content"
        />
        <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
          <Drawer.Screen
            name={ScreenNames.MainStackScreenNavigator.Home}
            component={HomeStackNavigator}
            options={{ headerShown: false, title: "Home" }}
          />
          <Drawer.Screen
            name={ScreenNames.MainStackScreenNavigator.Dashboard}
            component={DashboardStackScreenNavigator}
            options={{ headerShown: false, title: "Dashboard" }}
          />
          <Drawer.Screen
            name={ScreenNames.MainStackScreenNavigator.RegistryExpense}
            component={RegistryExpenseStackNavigator}
            options={{ headerShown: false, title: "Registrar Egreso" }}
          />
          <Drawer.Screen
            name={ScreenNames.MainStackScreenNavigator.RegistryIncome}
            component={RegistryIncomeStackScreenNavigator}
            options={{ headerShown: false, title: "Registrar Ingreso" }}
          />
          <Drawer.Screen
            name={ScreenNames.MainStackScreenNavigator.Summary}
            component={SummaryStackScreenNavigator}
            options={{ headerShown: false, title: "Movimientos" }}
          />
          <Drawer.Screen
            name={ScreenNames.MainStackScreenNavigator.CategoryManagement}
            component={CategoryManagementStackScreenNavigator}
            options={{ headerShown: false, title: "Administrar Categorías" }}
          />
        </Drawer.Navigator>
      </>
    );
  };

  const DrawerContent = props => {
    return (
      <DrawerContentScrollView {...props}>
        {/* TODO: Next feature: Add login */}
        {/* <Text>
          Estoy loggeado como: {appContext.userContext.logged.name.capitalize()}
        </Text> */}
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
    );
  };

  const DashboardStackScreenNavigator = () => {
    return (
      <DashboardStack.Navigator>
        <DashboardStack.Screen
          name={ScreenNames.DashboardStackScreenNavigator.DashbhoardGate}
          component={DashbhoardGate}
          options={({ navigation }) => ({
            ...screenOptionsBase(navigation),
            title: "Dashboard",
          })}
        />
      </DashboardStack.Navigator>
    );
  };

  const HomeStackNavigator = () => {
    return (
      <RegistryExpenseStack.Navigator
        initialRouteName={ScreenNames.HomeStackNavigator.HomeGate}
      >
        <RegistryExpenseStack.Screen
          name={ScreenNames.HomeStackNavigator.HomeGate}
          component={HomeGate}
          options={({ navigation }) => ({
            ...screenOptionsBase(navigation),
            title: "Home",
          })}
        />
      </RegistryExpenseStack.Navigator>
    );
  };

  const RegistryExpenseStackNavigator = () => {
    return (
      <RegistryExpenseStack.Navigator
        initialRouteName={
          ScreenNames.RegistryExpenseStackNavigator.ExpenseCategoryGate
        }
      >
        <RegistryExpenseStack.Screen
          name={ScreenNames.RegistryExpenseStackNavigator.ExpenseCategoryGate}
          component={ExpenseCategoryGate}
          options={({ navigation }) => ({
            ...screenOptionsBase(navigation),
            title: "Registrar egreso",
            headerRight: () => <MenuButton type="secondary" />,
          })}
        />
        <RegistryExpenseStack.Screen
          name={ScreenNames.RegistryExpenseStackNavigator.ExpenseDetail}
          component={ExpenseDetail}
          options={({ navigation }) => ({
            ...screenOptionsBase(navigation),
            title: "Detalles de egreso",
          })}
          initialParams={{ mode: EXPENSE_DETAIL_MODES.NEW_EXPENSE }}
        />
        <RegistryExpenseStack.Screen
          name={ScreenNames.RegistryExpenseStackNavigator.Scan}
          component={ScanExpense}
          options={{ headerShown: false }}
        />
      </RegistryExpenseStack.Navigator>
    );
  };

  const SummaryStackScreenNavigator = () => {
    return (
      <SummaryStack.Navigator>
        <SummaryStack.Screen
          name={ScreenNames.SummaryStackScreenNavigator.HistoryGate}
          component={HistoryGate}
          options={({ navigation }) => ({
            ...screenOptionsBase(navigation),
            title: "Movimientos",
          })}
        />
        <SummaryStack.Screen
          name={ScreenNames.SummaryStackScreenNavigator.Expenses}
          component={Expenses}
          options={({ navigation }) => ({
            ...screenOptionsBase(navigation),
            title: "Compras este Mes",
          })}
        />
        <RegistryExpenseStack.Screen
          name={ScreenNames.SummaryStackScreenNavigator.ExpenseDetail}
          component={ExpenseDetail}
          options={({ navigation }) => ({
            ...screenOptionsBase(navigation),
            title: "Detalles del egreso",
          })}
          initialParams={{ mode: "EXISTING_EXPENSE" }}
        />
        <RegistryExpenseStack.Screen
          name={ScreenNames.SummaryStackScreenNavigator.Scan}
          component={ScanExpense}
          options={{ headerShown: false }}
        />
      </SummaryStack.Navigator>
    );
  };

  const CategoryManagementStackScreenNavigator = () => {
    return (
      <CategoryManagementStack.Navigator>
        <CategoryManagementStack.Screen
          name={
            ScreenNames.CategoryManagementStackScreenNavigator
              .CategoriesAdminGate
          }
          component={CategoriesAdminGate}
          options={({ navigation }) => ({
            ...screenOptionsBase(navigation),
            title: "Administrar Categorías",
          })}
        />
        <CategoryManagementStack.Screen
          name={
            ScreenNames.CategoryManagementStackScreenNavigator.CategoryDetail
          }
          component={CategoryDetail}
          options={({ navigation }) => ({
            ...screenOptionsBase(navigation),
            title: "Detalle de la categoría",
          })}
        />
      </CategoryManagementStack.Navigator>
    );
  };

  const RegistryIncomeStackScreenNavigator = () => {
    return (
      <IncomeManagementStack.Navigator>
        <IncomeManagementStack.Screen
          name={ScreenNames.RegistryIncomeStackScreenNavigator.IncomeDetail}
          component={IncomeDetail}
          options={({ navigation }) => ({
            ...screenOptionsBase(navigation),
            title: "Detalle del ingreso",
            headerRight: () => <MenuButton type="secondary" />,
          })}
        />
      </IncomeManagementStack.Navigator>
    );
  };

  return (
    <NavigationContainer>
      <RootStackScreenNavigator />
    </NavigationContainer>
  );
};

export default AppNavigation;
