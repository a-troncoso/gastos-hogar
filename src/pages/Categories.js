import React from "react";
import { StyleSheet, View, SafeAreaView } from "react-native";
import CategoriesList from "../domain/category/CategoriesList";

const CATEGORIES = [
  {
    id: "1",
    name: "Comida"
  },
  {
    id: "2",
    name: "Aseo"
  },
  {
    id: "3",
    name: "Ropa"
  },
  {
    id: "4",
    name: "Comida"
  },
  {
    id: "5",
    name: "Aseo"
  },
  {
    id: "6",
    name: "Ropa"
  },
  {
    id: "7",
    name: "XXX"
  },
  {
    id: "8",
    name: "Aseo"
  },
  {
    id: "9",
    name: "Ropa"
  },
  {
    id: "10",
    name: "XXX"
  }
];

const Categories = props => {
  const { navigation } = props;

  const handlePressCategory = id => {
    // TODO: need to register selected category
    navigation.navigate("Scan");
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
    // borderColor: "blue",
    // borderStyle: "solid",
    // borderWidth: 1,
    // backgroundColor: "#fff"
  }
});

export default Categories;
