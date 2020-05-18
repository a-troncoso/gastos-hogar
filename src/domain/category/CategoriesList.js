import React from "react";
import { StyleSheet, View, FlatList } from "react-native";
import Category from "../shared/Category";

const CategoriesList = props => {
  const { categories, onPressCategory } = props;

  const handlePressCategory = id => {
    onPressCategory(id);
  };

  return (
    <FlatList
      data={categories}
      renderItem={({ item }) => (
        <View style={styles.categoriesListViewCategory}>
          <Category
            key={item.id}
            name={item.name}
            extraInfo={item.extraInfo}
            keyExtractor={item => item.id}
            onPress={() => handlePressCategory(item.id)}
          />
        </View>
      )}
    ></FlatList>
  );
};

const styles = StyleSheet.create({
  categoriesListViewCategory: {
    marginBottom: 8
  }
});

export default CategoriesList;
