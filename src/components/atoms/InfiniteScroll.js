import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, FlatList, View, Text } from "react-native";
import PropTypes from "prop-types";
import shortid from "shortid";

const InfiniteScroll = (props) => {
  const { items, offset } = props;
  const infListRef = useRef(null);
  const [internalData, setInternalData] = useState([]);
  const [end, setEnd] = useState(true);
  const [
    isContentOffsetYMoreThanOfsset,
    setIsContentOffsetYMoreThanOfsset,
  ] = useState(false);
  const length = items.length;
  const data2 = items.slice();

  const viewabilityConfigRef = useRef({
    minimumViewTime: 2000,
    waitForInteraction: true,
    viewAreaCoveragePercentThreshold: 66,
  });

  useEffect(() => {
    setInternalData([...items, ...items]);
  }, [items]);

  useEffect(() => {
    // setInternalData((prevState) => {
    //   [...prevState.data, ...prevState.data]
    // });
    // if (infListRef)
    //   setTimeout(() => {
    //     infListRef.current.scrollToIndex({ animated: false, index: length });
    //   }, 500);
  }, []);

  useEffect(() => {
    // if (infListRef && isContentOffsetYMoreThanOfsset)
    //   infListRef.current.scrollToIndex({ index: length, animated: false });
  }, [isContentOffsetYMoreThanOfsset]);

  const checkScroll = ({ layoutMeasurement, contentOffset, contentSize }) => {
    // FIXME: Revisar por qué no genera scroll infinito
    if (internalData.length >= length * 3) {
      setInternalData((prevState) => prevState.slice(length * 2));
    }
    if (contentOffset.y <= offset) {
      setInternalData((prevState) => [...prevState, ...data2]);
      setIsContentOffsetYMoreThanOfsset(true);
    }
    if (
      layoutMeasurement.height + contentOffset.y >=
        contentSize.height - offset &&
      end
    ) {
      setInternalData([...prevState.data, ...data2]);
      setEnd(false);
    } else {
      setEnd(true);
    }
  };

  const handleViewableItemsChangedRef = useRef(({ viewableItems }) => {
    console.log("handleViewableItemsChangedRef", viewableItems);
    // FIXME: Por alguna razón no llama al onViewableItemsChanged
    if (viewableItems[1] && viewableItems[1].item) {
      const { item } = viewableItems[1];
      onChange({ date: item });
    }
  });

  return (
    <FlatList
      ref={infListRef}
      data={internalData}
      keyExtractor={(it) => `${it}_${shortid.generate()}`}
      viewabilityConfig={viewabilityConfigRef.current}
      onViewableItemsChanged={handleViewableItemsChangedRef.current}
      showsVerticalScrollIndicator={false}
      decelerationRate="fast"
      snapToInterval={50}
      // onScroll={({ nativeEvent }) => checkScroll(nativeEvent)}
      renderItem={({ item }) => (
        <View style={styles.viewItem}>
          <Text>{item}</Text>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  viewItem: {
    // borderWidth: 1,
    // borderStyle: "solid",
    // borderColor: "blue",
    position: "relative",
    flex: 1,
    height: 50,
    paddingHorizontal: 32,
    justifyContent: "center",
    alignItems: "center",
  },
});

InfiniteScroll.defaultProps = {
  offset: 20,
  onChange: () => null,
};

InfiniteScroll.propTypes = {
  offset: PropTypes.number,
  onChange: PropTypes.func,
  items: PropTypes.array.isRequired,
};

export default InfiniteScroll;
