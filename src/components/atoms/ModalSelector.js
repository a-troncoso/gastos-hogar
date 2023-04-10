import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  TouchableOpacity,
  Modal,
} from "react-native";
import renderSeparator from "../../components/atoms/Separator";

import color from "../../assets/colors";

const ModalSelector = props => {
  const { items, isModalVisible, onBackdropPress, onChange } = props;

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
            {items.length > 0 ? (
              <FlatList
                data={items}
                keyExtractor={item => item.id.toString()}
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={renderSeparator}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.viewCategoryName}
                    onPress={() => handlePressItem(item)}
                  >
                    <Text>{item.name}</Text>
                  </TouchableOpacity>
                )}
              ></FlatList>
            ) : (
              <Text style={styles.placeholder}>
                No hay elementos que mostrar 🤷🏻‍♂️
              </Text>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

ModalSelector.defaultProps = {
  isModalVisible: false,
  onBackdropPress: () => null,
  onChange: () => null,
};

ModalSelector.propTypes = {
  items: PropTypes.array.isRequired,
  isModalVisible: PropTypes.bool,
  onBackdropPress: PropTypes.func,
  onChange: PropTypes.func,
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  viewModal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: color.transparent.gray["130"]["90"],
  },
  viewList: {
    // borderWidth: 1,
    // borderStyle: "solid",
    // borderColor: "blue",
    justifyContent: "center",
    width: 300,
    height: 250,
    backgroundColor: color.blue["90"],
  },
  viewCategoryName: {
    flex: 1,
    height: 64,
    paddingHorizontal: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  placeholder: {
    // borderWidth: 1,
    // borderStyle: "solid",
    // borderColor: "blue",
    textAlign: "center",
  },
});

export default ModalSelector;
