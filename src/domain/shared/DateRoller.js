import React, { useEffect, useState, useRef } from "react";
import { StyleSheet, View, FlatList, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import InfiniteScroll from "./InfiniteScroll";
import shortid from "shortid";

import { daysInMonth, monthNames, availableYears } from "../../utils/date";

import color from "../../utils/styles/color";

const topLinearGradientColors = [
  color.blue["90"],
  `${color.transparent.blue["90"]["90"]}`,
  `${color.transparent.blue["90"]["30"]}`,
];
const bottomLinearGradientColors = [
  `${color.transparent.blue["90"]["30"]}`,
  `${color.transparent.blue["90"]["90"]}`,
  color.blue["90"],
];

const DateRoller = (props) => {
  const { onChange, selectedDate } = props;

  const [days, setDays] = useState([]);
  const [months, setMonths] = useState([]);
  const [years, setYears] = useState([]);

  // const viewabilityConfigRef = useRef({
  //   minimumViewTime: 2000,
  //   waitForInteraction: true,
  //   viewAreaCoveragePercentThreshold: 66,
  // });

  useEffect(() => {
    genCalendarData();
  }, []);

  const genCalendarData = () => {
    setDays(daysInMonth());
    setMonths(monthNames()("short"));
    setYears(availableYears());
  };

  // const handleViewableDayItemsChangedRef = useRef(({ viewableItems }) => {
  //   console.log("handleViewableDayItemsChangedRef", viewableItems);
  //   if (viewableItems[1] && viewableItems[1].item) {
  //     const { item } = viewableItems[1];
  //     onChange({ day: item });
  //   }
  // });

  // const handleViewableMonthItemsChangedRef = useRef(({ viewableItems }) => {
  //   if (viewableItems[1] && viewableItems[1].item) {
  //     const { item } = viewableItems[1];
  //     onChange({ month: item });
  //   }
  // });

  // const handleViewableYearItemsChangedRef = useRef(({ viewableItems }) => {
  //   if (viewableItems[1] && viewableItems[1].item) {
  //     const { item } = viewableItems[1];
  //     onChange({ year: item });
  //   }
  // });

  const handleLoadItems = (tapMovement, rollerName) => {
    // tapMovement => ttb: Top to bottom | btt: Bottom to top

    addItemsToStart(rollerName);
    addItemsToFinish(rollerName);
    // if (tapMovement === "ttb") addItemsToStart(rollerName);
    // else if (tapMovement === "btt") addItemsToFinish(rollerName);
  };

  const addItemsToStart = (rollerName) => {
    switch (rollerName) {
      case "days":
        setDays((prevState) => daysInMonth().concat(prevState));
        break;
      case "months":
        setMonths((prevState) => monthNames()("short").concat(prevState));
        break;
      case "years":
        setYears((prevState) => availableYears().concat(prevState));
        break;
      default:
        break;
    }
  };

  const addItemsToFinish = (rollerName) => {
    switch (rollerName) {
      case "days":
        setDays((prevState) => prevState.concat(daysInMonth()));
        break;
      case "months":
        setMonths((prevState) => prevState.concat(monthNames()("short")));
        break;
      case "years":
        setYears((prevState) => prevState.concat(availableYears()));
        break;
      default:
        break;
    }
  };

  // const viewabilityConfigRef = useRef({
  //   minimumViewTime: 2000,
  //   waitForInteraction: true,
  //   viewAreaCoveragePercentThreshold: 66,
  // });
  // const handleViewableItemsChangedRef = useRef(({ viewableItems }) => {
  //   console.log("handleViewableItemsChangedRef", viewableItems);
  // });

  return (
    <View style={styles.viewLists}>
      <LinearGradient
        colors={topLinearGradientColors}
        style={styles.topLinearGradient}
      ></LinearGradient>
      <InfiniteScroll items={days} onChange={(e) => console.log(e)} />
      <InfiniteScroll items={months} onChange={(e) => console.log(e)} />
      <InfiniteScroll items={years} onChange={(e) => console.log(e)} />
      {/* <FlatList
        key={shortid.generate()}
        data={days}
        keyExtractor={(it) => `${it}_${shortid.generate()}`}
        viewabilityConfig={viewabilityConfigRef.current}
        onViewableItemsChanged={handleViewableItemsChangedRef.current}
        showsVerticalScrollIndicator={false}
        decelerationRate="fast"
        snapToInterval={50}
        renderItem={({ item }) => (
          <View style={styles.viewItem}>
            <Text>{item}</Text>
          </View>
        )}
      ></FlatList> */}
      <LinearGradient
        colors={bottomLinearGradientColors}
        style={styles.bottomLinearGradient}
      ></LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  viewLists: {
    flex: 1,
    flexDirection: "row",
  },
  topLinearGradient: {
    position: "absolute",
    height: "25%",
    width: "100%",
    zIndex: 100,
  },
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
  bottomLinearGradient: {
    position: "absolute",
    height: "25%",
    width: "100%",
    zIndex: 100,
    bottom: 0,
  },
});

export default DateRoller;
