import React, { useState, useCallback, useEffect } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  FlatList,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import Hero from "../components/atoms/Hero";

import DateNavigatorActivator from "../components/molecules/date/DateNavigatorActivator";

import { fetchPurchasesByCategory } from "../dbOperations/purchase/purchaseBDTransactions";
import { extractNumbers, toCurrencyFormat } from "../utils/number";
import { formatDate } from "../utils/date";

import { fetchCategoryById } from "../dbOperations/category/categoryBDTransactions";
import color from "../assets/colors";

const PurchaseIcon = props => {
  const { icon } = props;

  return (
    <View style={purchaseIconStyles.purchaseIcon}>
      <FontAwesome name={icon} size={36} color={color.blue["0"]} />
    </View>
  );
};

const purchaseIconStyles = StyleSheet.create({
  purchaseIcon: {
    // borderColor: "black",
    // borderStyle: "solid",
    // borderWidth: 1,
    height: "100%",
    width: 72,
    maxHeight: 72,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    color: color.blue["0"],
  },
});

const PurchaseItem = props => {
  const { image, date, amount, subcategory, onPress, onPressImage } = props;

  const handlePressPurchaseImage = () => {
    onPressImage({ image });
  };

  return (
    <>
      <View style={styles.purchaseView}>
        <TouchableOpacity onPress={handlePressPurchaseImage}>
          <View style={styles.purchaseImageView}>
            {image ? (
              <Image style={styles.purchaseImage} source={{ uri: image }} />
            ) : (
              <PurchaseIcon icon="shopping-cart" />
            )}
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onPress}
          style={styles.purchaseTouchableInfoView}
        >
          <View style={styles.purchaseInfoView}>
            <View style={styles.purchaseDateView}>
              <Text style={styles.purchaseDate}>
                {formatDate(date, { withMonthName: true })}
              </Text>
            </View>
            <View style={styles.purchaseExtraInfo}>
              <Text style={styles.purchaseSubcategory}>
                {subcategory || "Sin subcategoría"}
              </Text>
              <Text style={styles.purchaseAmount}>
                {toCurrencyFormat(amount)}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};

const PurchasesList = props => {
  const { purchases, onPressPurchase, onPressImage } = props;

  const handlePressPurchase = id => {
    onPressPurchase(id);
  };

  return (
    <FlatList
      data={purchases}
      style={styles.purchasesList}
      keyExtractor={item => item.id.toString()}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => (
        <View style={styles.purchasesListViewPurchase}>
          <PurchaseItem
            key={item.id}
            image={item.imagePath}
            date={item.date}
            amount={extractNumbers(item.amount)}
            onPress={() => handlePressPurchase(item.id)}
            onPressImage={onPressImage}
          />
        </View>
      )}
    ></FlatList>
  );
};

const Expenses = props => {
  const { navigation, route } = props;
  const categoryId = route.params.categoryId;
  const date = route.params.date;
  const mode = route.params.mode;

  const [purchases, setPurchases] = useState([]);
  const [dateSelected, setDateSelected] = useState(date);
  const [category, setCategory] = useState({ name: "" });

  useFocusEffect(
    useCallback(() => {
      _fetchPurchasesByCategory(dateSelected, mode, categoryId);
    }, [dateSelected, mode, categoryId, _fetchPurchasesByCategory])
  );

  useEffect(() => {
    fetchCategoryDetail(categoryId);
  }, [categoryId]);

  useEffect(() => {
    _fetchPurchasesByCategory(dateSelected, mode, categoryId);
  }, [dateSelected, mode, categoryId]);

  const fetchCategoryDetail = useCallback(
    async categoryId => {
      const categoryDetail = await fetchCategoryById(categoryId);

      setCategory(prev => ({
        ...prev,
        name: categoryDetail.name,
      }));
    },
    [fetchCategoryById]
  );

  const _fetchPurchasesByCategory = useCallback(
    async (date, mode, categoryId) => {
      const purchases = await fetchPurchasesByCategory({
        date,
        mode,
        categoryId,
      });

      setPurchases(purchases);
    },
    [fetchPurchasesByCategory]
  );

  const handlePressPurchase = useCallback(
    id => {
      navigation.push("ExpenseDetail", {
        expenseId: id,
        mode: "EXISTING_EXPENSE",
      });
    },
    [navigation]
  );

  const handleChangeDateNavigation = useCallback(date => {
    setDateSelected(date);
  }, []);

  return (
    <View style={styles.purchases}>
      <Text
        style={{
          paddingBottom: 8,
          backgroundColor: color.blue["50"],
          textAlign: "center",
          fontSize: 18,
          fontWeight: "bold",
          lineHeight: 18,
        }}
      >
        {category.name}
      </Text>
      <Hero
        childStyles={styles.hero}
        button={
          <DateNavigatorActivator
            mode={mode.toUpperCase()}
            date={dateSelected}
            onChange={date => handleChangeDateNavigation(date)}
          />
        }
      />
      <View style={styles.purchasesListView}>
        <SafeAreaView>
          <PurchasesList
            purchases={purchases}
            onPressPurchase={handlePressPurchase}
          />
        </SafeAreaView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  purchases: {
    flex: 1,
    backgroundColor: color.blue["90"],
  },
  hero: {
    marginBottom: 8,
  },
  purchasesListView: {
    flex: 1,
    paddingHorizontal: 16,
  },
  purchaseView: {
    height: 82,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    // borderColor: "black",
    // borderStyle: "solid",
    // borderWidth: 1
  },
  purchaseTouchableInfoView: {
    flex: 1,
  },
  purchaseImageView: {
    width: 82,
    height: "100%",
    marginRight: 8,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "black",
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: 16,
    backgroundColor: color.gray[0],
    backgroundColor: color.gray[0],
    borderColor: color.blue[60],
    borderStyle: "solid",
  },
  purchaseImage: {
    width: "100%",
    height: "100%",
    borderRadius: 16,
  },
  purchaseInfoView: {
    justifyContent: "space-between",
    height: "100%",
    flex: 1,
    padding: 12,
    borderColor: "black",
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: 16,
    backgroundColor: color.gray[0],
    borderColor: color.blue[60],
    borderStyle: "solid",
    borderWidth: 1,
  },
  purchaseDateView: {
    // padding: 8,
    justifyContent: "center",
  },
  purchaseDate: {
    fontSize: 16,
    fontWeight: "bold",
  },
  purchaseExtraInfo: {
    alignSelf: "stretch",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  purchasesListViewPurchase: {
    marginBottom: 8,
  },
  purchaseSubcategory: {
    fontWeight: "bold",
    color: color.yellow[0],
  },
  purchaseAmount: {
    fontWeight: "bold",
    color: color.red[0],
  },
});

export default Expenses;
