import React, { useState, useCallback } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  FlatList,
  Text,
  TouchableOpacity,
  Image
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { fetchPurchasesByCategory } from "../dbOperations/purchase/purchaseBDTransactions";
import { toCurrencyFormat } from "../utils/number";
import { formatDate, currentMonth } from "../utils/date";

const Purchase = props => {
  const { image, date, amount, onPress } = props;

  return (
    <TouchableOpacity style={styles.purchase} onPress={onPress}>
      <View style={styles.purchaseImageView}>
        <Image style={styles.purchaseImage} source={{ uri: image }} />
      </View>
      <View style={styles.purchaseInfoView}>
        <View style={styles.purchaseDateView}>
          <Text style={styles.purchaseDate}>{formatDate(date)}</Text>
        </View>
        <View style={styles.purchaseExtraInfo}>
          <Text>Total compra</Text>
          <Text>{toCurrencyFormat(amount)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const PurchasesList = props => {
  const { purchases, onPressPurchase } = props;

  const handlePressPurchase = id => {
    onPressPurchase(id);
  };

  return (
    <FlatList
      data={purchases}
      style={styles.purchasesList}
      keyExtractor={item => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.purchasesListViewPurchase}>
          <Purchase
            key={item.id}
            image={item.image}
            date={item.date}
            amount={item.amount}
            onPress={() => handlePressPurchase(item.id)}
          />
        </View>
      )}
    ></FlatList>
  );
};

const Purchases = props => {
  const { navigation, route } = props;

  const [purchases, setPurchases] = useState([]);

  useFocusEffect(
    useCallback(() => {
      fetchPurchases(currentMonth(true), route.params.categoryId);
    }, [])
  );

  const fetchPurchases = async (month, categoryId) => {
    const purchases = await fetchPurchasesByCategory(month, categoryId);
    setPurchases(purchases);
  };

  const handlePressPurchase = id => {
    navigation.navigate("Purchase", {
      purchaseId: id
    });
  };

  return (
    <View style={styles.purchases}>
      <View style={styles.purchasesListView}>
        <SafeAreaView>
          <PurchasesList
            purchases={purchases}
            onPressPurchase={handlePressPurchase}
          />
        </SafeAreaView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  purchases: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#fff"
  },
  purchasesListView: {
    flex: 1,
    justifyContent: "center",
    alignSelf: "stretch",
    paddingHorizontal: 16
  },
  purchase: {
    height: 72,
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    borderColor: "black",
    borderStyle: "solid",
    borderWidth: 1
  },
  purchaseImageView: {
    width: 72,
    height: 72,
    borderColor: "black",
    borderStyle: "solid",
    borderRightWidth: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    backgroundColor: "#E8E8E8"
  },
  purchaseImage: {
    width: "100%",
    height: "100%"
  },
  purchaseInfoView: {
    flex: 1,
    justifyContent: "space-between"
  },
  purchaseDateView: {
    padding: 8,
    justifyContent: "center"
  },
  purchaseDate: {
    fontSize: 16
  },
  purchaseExtraInfo: {
    flex: 1,
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignSelf: "stretch",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#E8E8E8"
  },
  purchasesListViewPurchase: {
    marginBottom: 8
  }
});

export default Purchases;
