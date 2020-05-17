import React from "react";
import { StyleSheet, View, SafeAreaView } from "react-native";
import CategoriesList from "../domain/category/CategoriesList";

// TODO: This data must be obtained from the Database
const CATEGORIES = [
  {
    id: "1",
    name: "Comida",
    extraInfo: { amount: 500 }
  },
  {
    id: "2",
    name: "Aseo",
    extraInfo: { amount: 10000 }
  }
];

const History = props => {
  const { navigation } = props;

  const handlePressCategory = id => {
    console.log("category id", id);
    navigation.navigate("Purchases");
  };

  return (
    <View style={styles.categories}>
      <View style={styles.categoriesListView}>
        <SafeAreaView>
          <CategoriesList
            categories={CATEGORIES}
            onPressCategory={handlePressCategory}
          />
        </SafeAreaView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  categories: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#fff",
    alignSelf: "stretch",
    // borderColor: "red",
    // borderStyle: "solid",
    // borderWidth: 1
  },
  categoriesListView: {
    flex: 1,
    justifyContent: "center",
    alignSelf: "stretch",
    paddingHorizontal: 16,
    backgroundColor: "#fff"
    // borderColor: "brown",
    // borderStyle: "solid",
    // borderWidth: 1,
  }
});

export default History;
