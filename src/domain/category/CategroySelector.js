import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  TouchableOpacity
} from "react-native";
import Modal from "react-native-modal";
import renderSeparator from "../shared/Separator";
import { fetchAllCategories } from "../../dbOperations/category/categoryBDTransactions";

import color from "../../utils/styles/color";

const CategorySelector = props => {
  const { isModalVisible, onBackdropPress, onChange } = props;

  const [categories, setCategories] = useState([]);

  useEffect(() => {}, [isModalVisible]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const categories = await fetchAllCategories();
    setCategories(categories);
  };

  const handlePressCategory = item => {
    onChange(item);
  };

  return (
    <View>
      <Modal
        style={styles.modal}
        isVisible={isModalVisible}
        onBackdropPress={onBackdropPress}
      >
        <View style={styles.viewModal}>
          <View style={styles.viewList}>
            <FlatList
              data={categories}
              keyExtractor={item => item.id.toString()}
              showsVerticalScrollIndicator={false}
              ItemSeparatorComponent={renderSeparator}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.viewCategoryName}
                  onPress={() => handlePressCategory(item)}
                >
                  <Text>{item.name}</Text>
                </TouchableOpacity>
              )}
            ></FlatList>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  viewModal: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: 300,
    height: 250,
    backgroundColor: color.blue["90"]
  },
  viewList: {
    // borderWidth: 1,
    // borderStyle: "solid",
    // borderColor: "blue",
    flex: 1,
    width: "100%"
  },
  viewCategoryName: {
    flex: 1,
    height: 64,
    paddingHorizontal: 32,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default CategorySelector;
