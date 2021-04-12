import React, { useState, useEffect, useRef } from "react"
import { StyleSheet, FlatList, View, Text } from "react-native"
import PropTypes from "prop-types"
import shortid from "shortid"

const InfiniteScroll = props => {
  const { items, offset } = props
  const infListRef = useRef(null)
  const [internalData, setInternalData] = useState([])
  const [end, setEnd] = useState(true)
  const length = items.length
  const data2 = items.slice()

  useEffect(() => {
    setInternalData([...items, ...items])
  }, [items])

  const checkScroll = ({ layoutMeasurement, contentOffset, contentSize }) => {
    // FIXME: Revisar por qué no genera scroll infinito
    if (internalData.length >= length * 3)
      setInternalData(prevState => prevState.slice(length * 2))
    if (contentOffset.y <= offset) {
      setInternalData(prevState => [...prevState, ...data2])
      setIsContentOffsetYMoreThanOfsset(true)
    }
    if (
      layoutMeasurement.height + contentOffset.y >=
        contentSize.height - offset &&
      end
    ) {
      setInternalData(prevState => [...prevState.data, ...data2])
      setEnd(false)
    } else {
      setEnd(true)
    }
  }

  const viewabilityConfig = useRef({
    // minimumViewTime: 2000,
    // waitForInteraction: true,
    viewAreaCoveragePercentThreshold: 50
  })

  // const onViewableItemsChanged = useRef(({ viewableItems }) => {
  //   console.log("onViewableItemsChanged", viewableItems)
  //   // FIXME: Por alguna razón no llama al onViewableItemsChanged
  //   if (viewableItems[1] && viewableItems[1].item) {
  //     const { item } = viewableItems[1]
  //     onChange({ date: item })
  //   }
  // })

  const onViewableItemsChanged = useRef(viewableItems => {
    // console.log("onViewableItemsChanged", viewableItems)
  })

  return (
    <FlatList
      ref={infListRef}
      data={internalData}
      keyExtractor={it => `${it}_${shortid.generate()}`}
      decelerationRate="fast"
      snapToInterval={50}
      renderItem={({ item }) => (
        <View style={styles.viewItem}>
          <Text>{item}</Text>
        </View>
      )}
      showsVerticalScrollIndicator={false}
      viewabilityConfig={viewabilityConfig.current}
      onViewableItemsChanged={onViewableItemsChanged.current}
      // onScroll={({ nativeEvent }) => checkScroll(nativeEvent)}
    />
  )
}

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
    alignItems: "center"
  }
})

InfiniteScroll.defaultProps = {
  offset: 20,
  onChange: () => null
}

InfiniteScroll.propTypes = {
  offset: PropTypes.number,
  onChange: PropTypes.func,
  items: PropTypes.array.isRequired
}

export default InfiniteScroll
