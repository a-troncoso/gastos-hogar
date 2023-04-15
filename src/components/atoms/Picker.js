import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  Modal,
} from "react-native";
import MenuButton from "./MenuButton/MenuButton";

const Picker = props => {
  const { items = [] } = props;
  const [isContentVisible, setIsContentVisible] = useState(false);
  const [removeState, setRemoveState] = useState(1);
  const { height, width } = useWindowDimensions();

  const handlePressMenu = () => {
    setIsContentVisible(prev => !prev);
    setRemoveState(1);
  };

  const handlePressItem = ({
    item,
    withConfirmation = false,
    confirmationState,
  }) => {
    if (withConfirmation) {
      if (confirmationState === 2) {
        item.onPressItem();
        setIsContentVisible(false);
      } else if (confirmationState === 1) setRemoveState(2);
    } else {
      item.onPressItem();
      setIsContentVisible(false);
    }
  };

  const handleCloseModal = () => {
    setIsContentVisible(false);
  };

  return (
    <>
      <View>
        <MenuButton type="secondary" onPress={handlePressMenu} />
      </View>
      <View>
        <Modal
          transparent={true}
          onRequestClose={handleCloseModal}
          visible={isContentVisible}
          statusBarTranslucent
        >
          <View style={styles.modalView}>
            <TouchableOpacity
              style={{ alignItems: "flex-end", height, width }}
              activeOpacity={1}
              onPressOut={handleCloseModal}
            >
              <View
                style={[
                  styles.contentView,
                  styles[`removeState${removeState}`],
                ]}
              >
                {items.map(item => (
                  <TouchableOpacity
                    style={styles.touchableItem}
                    key={item.title}
                    onPress={() =>
                      handlePressItem({
                        item,
                        withConfirmation: item.withConfirmation,
                        confirmationState: removeState,
                      })
                    }
                  >
                    <Text style={[styles[`removeState${removeState}`]]}>
                      {item.title}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  contentView: {
    // borderColor: "blue",
    // borderWidth: 1,
    // borderStyle: "solid",
    marginRight: 24,
    marginTop: 72,
    backgroundColor: "#fff",
    borderRadius: 4,
  },
  modalView: {
    flex: 1,
    alignItems: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  touchableItem: {
    paddingVertical: 16,
    paddingHorizontal: 36,
  },
  removeState1: {
    // backgroundColor: "#fff",
    // borderColor: "blue",
    // borderWidth: 1,
    borderStyle: "solid",
  },
  removeState2: { backgroundColor: "red", color: "#fff" },
});

export default Picker;
