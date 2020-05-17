import React from "react";
import { StyleSheet, View, SafeAreaView, FlatList, Text, TouchableOpacity } from "react-native";
import { toAmount } from "../utils/number";

// TODO: This data must be obtained from the Database
const PURCHASES = [
  {
    id: "1",
    image: "img",
    date: "21 de Junio",
    amount: 500
  },
  {
    id: "2",
    image: "img",
    date: "23 de Junio",
    amount: 10000
  },
  {
    id: "3",
    image: "img",
    date: "3 de Junio",
    amount: 10000
  }
];

const Purchase = props => {
  const { image, date, amount, onPress } = props;

  return (
    <TouchableOpacity style={styles.purchase} onPress={onPress}>
      <View style={styles.purchaseImageView}>
        <Text style={styles.purchaseImage}>{image}</Text>
      </View>
      <View style={styles.purchaseInfoView}>
        <View style={styles.purchaseDateView}>
          <Text style={styles.purchaseDate}>{date}</Text>
        </View>
        <View style={styles.purchaseExtraInfo}>
          <Text>Total compra</Text>
          <Text>{toAmount(amount)}</Text>
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
      renderItem={({ item }) => (
        <View style={styles.purchasesListViewPurchase}>
          <Purchase
            key={item.id}
            image={item.image}
            date={item.date}
            amount={item.amount}
            keyExtractor={item => item.id}
            onPress={() => handlePressPurchase(item.id)}
          />
        </View>
      )}
    ></FlatList>
  );
};

const Purchases = props => {
  const { navigation } = props;

  const handlePressPurchase = id => {
    console.log("Purchase id", id);
    navigation.navigate("Purchase");
  };

  return (
    <View style={styles.purchases}>
      <View style={styles.purchasesListView}>
        <SafeAreaView>
          <PurchasesList
            purchases={PURCHASES}
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
    backgroundColor: "#fff",
  },
  purchasesListView: {
    flex: 1,
    justifyContent: "center",
    alignSelf: "stretch",
    paddingHorizontal: 16,
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
  purchaseInfoView: {
    flex: 1,
    justifyContent: "space-between",
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
