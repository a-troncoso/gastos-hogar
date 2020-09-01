import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import ExpenseCategoryGate from "./RegistryExpenseGate";
import Scan from "./Scan";
const Tab = createBottomTabNavigator();

// TODO: Canditate to deprecate
const PurchaseRegistry = props => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="ExpenseCategoryGate"
        component={ExpenseCategoryGate}
        options={{
          tabBarLabel: "Categorías",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="file-cabinet"
              size={size}
              color={color}
            />
          )
        }}
      />
      <Tab.Screen
        name="Scan"
        component={Scan}
        options={{
          tabBarLabel: "Escanear",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="scan1" size={size} color={color} />
          )
        }}
      />
    </Tab.Navigator>
  );
};

export default PurchaseRegistry;
