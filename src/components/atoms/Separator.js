import React, { useEffect, useState } from "react";
import { View } from "react-native";

const renderSeparator = () => {
  return (
    <View
      style={{
        height: 1,
        backgroundColor: "#CED0CE"
      }}
    />
  );
};

export default renderSeparator;
