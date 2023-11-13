import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Modal,
  Text,
} from "react-native";

import color from "../../../assets/colors";
import CategoryIcon from "../CategoryIcon/CategoryIcon";

console.log("color", color);

const colors = [
  ...Object.values(color.blue),
  ...Object.values(color.red),
  ...Object.values(color.green),
  ...Object.values(color.yellow),
];

export default ({
  items,
  isModalVisible,
  onBackdropPress = () => {},
  onChange = () => {},
}) => {
  const handlePressItem = item => {
    onChange(item);
  };

  return (
    <View style={styles.centeredView}>
      <Modal
        visible={isModalVisible}
        onRequestClose={onBackdropPress}
        transparent={true}
        statusBarTranslucent
        animationType="fade"
      >
        <View style={styles.viewModal}>
          <View style={styles.viewList}>
            {items.length > 0 && (
              <FlatList
                contentContainerStyle={{
                  alignItems: "center",
                }}
                numColumns={4}
                data={items}
                keyExtractor={item => item.iconName}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => handlePressItem(item)}>
                    <CategoryIcon
                      iconName={item.iconName}
                      iconFamily={item.iconFamily}
                    />
                  </TouchableOpacity>
                )}
                showsHorizontalScrollIndicator={false}
              />
            )}
          </View>
          {/* <View style={styles.viewList}>
            <FlatList
              numColumns={4}
              data={colors}
              keyExtractor={item => item}
              renderItem={({ item }) => (
                <TouchableOpacity>
                  <View
                    style={{
                      height: 80,
                      width: 80,
                      backgroundColor: item,
                    }}
                  />
                </TouchableOpacity>
              )}
              showsHorizontalScrollIndicator={false}
            />
          </View> */}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  viewModal: {
    paddingVertical: 64,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: color.transparent.gray["130"]["90"],
  },
  viewList: {
    justifyContent: "center",
    width: 300,
    backgroundColor: color.blue["90"],
    borderRadius: 8,
  },
  itemName: {
    textTransform: "capitalize",
  },
  placeholder: {
    textAlign: "center",
  },
});
