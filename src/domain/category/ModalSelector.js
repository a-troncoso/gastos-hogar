import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  TouchableOpacity
} from "react-native";
import Modal from "react-native-modal";
import renderSeparator from "../shared/Separator";

import color from "../../utils/styles/color";

const ModalSelector = props => {
  const { items, isModalVisible, onBackdropPress, onChange } = props;

  const handlePressItem = item => {
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
          </View>
        </View>
      </Modal>
    </View>
  );
};

ModalSelector.defaultProps = {
  isModalVisible: false,
  onBackdropPress: () => null,
  onChange: () => null
};

ModalSelector.propTypes = {
  items: PropTypes.array.isRequired,
  isModalVisible: PropTypes.bool,
  onBackdropPress: PropTypes.func,
  onChange: PropTypes.func
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

export default ModalSelector;
