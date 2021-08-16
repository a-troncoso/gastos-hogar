import React from "react";
import PropTypes from "prop-types";
import { Image } from "react-native";

// import ImageView from "react-native-image-view"
import ReactNativeZoomableView from "@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView";

const ModalPicture = props => {
  const { source, isModalVisible, onBackdropPress } = props;

  return (
    // <ImageView
    //   images={[
    //     {
    //       source: {
    //         uri: source.uri
    //       }
    //     }
    //   ]}
    //   onClose={onBackdropPress}
    //   imageIndex={0}
    //   isVisible={isModalVisible}
    // />

    <ReactNativeZoomableView
      maxZoom={1.5}
      minZoom={0.5}
      zoomStep={0.5}
      initialZoom={1}
      bindToBorders={true}
    >
      <Image source={{ uri: source.uri }} />
    </ReactNativeZoomableView>
  );
};

ModalPicture.defaultProps = {
  isModalVisible: false,
  onBackdropPress: () => null,
  onChange: () => null,
};

ModalPicture.propTypes = {
  source: PropTypes.shape({ uri: PropTypes.string }),
  isModalVisible: PropTypes.bool,
  onBackdropPress: PropTypes.func,
  onChange: PropTypes.func,
};

export default ModalPicture;
