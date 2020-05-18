import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Categories from "./Categories";
import Scan from "./Scan";

const Tab = createBottomTabNavigator();

const PurchaseRegistry = props => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Categories" component={Categories} />
      <Tab.Screen name="Scan" component={Scan} />
    </Tab.Navigator>
  );
};

export default PurchaseRegistry;
