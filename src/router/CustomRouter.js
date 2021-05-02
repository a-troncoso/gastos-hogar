import React from "react"
import { View } from "react-native"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList
} from "@react-navigation/drawer"

import MenuButton from "../components/atoms/MenuButton/MenuButton"
import ExpenseCategoryGate from "../pages/RegistryExpenseGate"
import ExpenseDetail from "../pages/ExpenseDetail"
import ScanExpense from "../pages/Scan"
import HistoryGate from "../pages/HistoryGate"
import Expenses from "../pages/Expenses"
import CategoriesAdminGate from "../pages/CategoriesAdminGate"
import DashbhoardGate from "../pages/DashbhoardGate"
import CategoryDetail from "../pages/CategoryDetail"

import ScreenNames from "../domain/router/screenNames"
import { EXPENSE_DETAIL_MODES } from "../domain/expense/expenseDetailModes"
import color from "../utils/styles/color"

const RootStack = createStackNavigator()
const RegistryExpenseStack = createStackNavigator()
const SummaryStack = createStackNavigator()
const CategoryManagementStack = createStackNavigator()
const DashboardStack = createStackNavigator()
const Drawer = createDrawerNavigator()

const screenOptionsBase = navigation => ({
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
  headerLeft: () => <MenuButton navigation={navigation} />,
  headerRight: () => <View></View>
})

const CustomRouter = () => {
  const RootStackScreenNavigator = () => {
    return (
      <RootStack.Navigator>
        <RootStack.Screen
          name={ScreenNames.RootStackScreenNavigator.Main}
          component={MainStackScreenNavigator}
          options={{ headerShown: false }}
        />
      </RootStack.Navigator>
    )
  }

  const MainStackScreenNavigator = () => {
    return (
      <Drawer.Navigator
        initialRouteName="RegistryExpense"
        drawerContent={props => <DrawerContent {...props} />}
      >
        <Drawer.Screen
          name={ScreenNames.MainStackScreenNavigator.Dashboard}
          component={DashboardStackScreenNavigator}
          options={{ title: "Dashboard" }}
        />
        <Drawer.Screen
          name={ScreenNames.MainStackScreenNavigator.RegistryExpense}
          component={RegistryExpenseStackNavigator}
          options={{ title: "Registrar egreso" }}
        />
        <Drawer.Screen
          name={ScreenNames.MainStackScreenNavigator.Summary}
          component={SummaryStackScreenNavigator}
          options={{ title: "Historial" }}
        />
        <Drawer.Screen
          name={ScreenNames.MainStackScreenNavigator.CategoryManagement}
          component={CategoryManagementStackScreenNavigator}
          options={{ title: "Administrar Categorías" }}
        />
      </Drawer.Navigator>
    )
  }

  const DrawerContent = props => {
    return (
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
    )
  }

  const DashboardStackScreenNavigator = () => {
    return (
      <DashboardStack.Navigator>
        <DashboardStack.Screen
          name={ScreenNames.DashboardStackScreenNavigator.DashbhoardGate}
          component={DashbhoardGate}
          options={{ ...screenOptionsBase, title: "Dashboard" }}
        />
      </DashboardStack.Navigator>
    )
  }

  const RegistryExpenseStackNavigator = () => {
    return (
      <RegistryExpenseStack.Navigator>
        <RegistryExpenseStack.Screen
          name={ScreenNames.RegistryExpenseStackNavigator.ExpenseCategoryGate}
          component={ExpenseCategoryGate}
          options={({ navigation }) => ({
            ...screenOptionsBase(navigation),
            title: "Categoría del egreso"
          })}
        />
        <RegistryExpenseStack.Screen
          name={ScreenNames.RegistryExpenseStackNavigator.ExpenseDetail}
          component={ExpenseDetail}
          options={({ navigation }) => ({
            ...screenOptionsBase(navigation),
            title: "Registro de egreso"
          })}
          initialParams={{ mode: EXPENSE_DETAIL_MODES.NEW_EXPENSE }}
        />
        <RegistryExpenseStack.Screen
          name={ScreenNames.RegistryExpenseStackNavigator.Scan}
          component={ScanExpense}
          options={{ headerShown: false }}
        />
      </RegistryExpenseStack.Navigator>
    )
  }

  const SummaryStackScreenNavigator = () => {
    return (
      <SummaryStack.Navigator>
        <SummaryStack.Screen
          name={ScreenNames.SummaryStackScreenNavigator.HistoryGate}
          component={HistoryGate}
          options={({ navigation }) => ({
            ...screenOptionsBase(navigation),
            title: "Historial"
          })}
        />
        <SummaryStack.Screen
          name={ScreenNames.SummaryStackScreenNavigator.Expenses}
          component={Expenses}
          options={({ navigation }) => ({
            ...screenOptionsBase(navigation),
            title: "Compras este Mes"
          })}
        />
        <RegistryExpenseStack.Screen
          name={ScreenNames.SummaryStackScreenNavigator.ExpenseDetail}
          component={ExpenseDetail}
          options={({ navigation }) => ({
            ...screenOptionsBase(navigation),
            title: "Detalles del egreso"
          })}
          initialParams={{ mode: "EXISTING_EXPENSE" }}
        />
        <RegistryExpenseStack.Screen
          name={ScreenNames.SummaryStackScreenNavigator.Scan}
          component={ScanExpense}
          options={{ headerShown: false }}
        />
      </SummaryStack.Navigator>
    )
  }

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
            title: "Administrar Categorías"
          })}
        />
        <CategoryManagementStack.Screen
          name={
            ScreenNames.CategoryManagementStackScreenNavigator.CategoryDetail
          }
          component={CategoryDetail}
          options={{ ...screenOptionsBase, title: "Detalle de la categoría" }}
        />
      </CategoryManagementStack.Navigator>
    )
  }

  return (
    <NavigationContainer>
      <RootStackScreenNavigator />
    </NavigationContainer>
  )
}

export default CustomRouter
