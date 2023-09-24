import React from "react";
import { StyleSheet, View, Text } from "react-native";
import color from "../../../assets/colors";

import { toCurrencyFormat } from "../../../utils/number";

const DashboardCard = props => {
  const { backgroundColor, value = 0, description } = props;

  return (
    <View style={[dashboardCardStyles.dashboardCard, { backgroundColor }]}>
      <View style={dashboardCardStyles.dashboardCardContent}>
        <Text style={dashboardCardStyles.dashboardCardValue}>
          {toCurrencyFormat(value)}
        </Text>
        <Text style={dashboardCardStyles.dashboardCardDesc}>{description}</Text>
      </View>
    </View>
  );
};

const dashboardCardStyles = StyleSheet.create({
  dashboardCard: {
    flex: 1,
    padding: 16,
    backgroundColor: color.blue[20],
    borderRadius: 16,
    marginBottom: 8,
    justifyContent: "space-around",
  },
  dashboardCardContent: {
    alignItems: "center",
  },
  dashboardCardValue: {
    fontSize: 24,
    fontWeight: "bold",
  },
  dashboardCardDesc: {
    fontSize: 16,
    textTransform: "capitalize",
    textAlign: "center",
  },
});

export default DashboardCard;
