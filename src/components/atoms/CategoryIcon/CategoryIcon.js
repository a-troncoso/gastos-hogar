import React from "react";
import { StyleSheet, View } from "react-native";

import {
  FontAwesome,
  MaterialCommunityIcons,
  Ionicons,
  AntDesign,
  Entypo,
  MaterialIcons,
} from "@expo/vector-icons";

import color from "../../../assets/colors";

const CategoryIcon = ({ iconName = "question", iconFamily = "antDesign" }) => {
  const family = {
    fontAwesome: FontAwesome,
    materialCommunity: MaterialCommunityIcons,
    ion: Ionicons,
    antDesign: AntDesign,
    entypo: Entypo,
    material: MaterialIcons,
  };

  const Icon = family[iconFamily || "antDesign"];

  return (
    <View style={categoryIconStyles.categoryIcon}>
      <Icon name={iconName || "question"} size={36} color={color.gray["0"]} />
    </View>
  );
};

const categoryIconStyles = StyleSheet.create({
  categoryIcon: {
    width: 72,
    height: 72,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    backgroundColor: color.blue["0"],
  },
});

export default CategoryIcon;
