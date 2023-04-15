import React, { useState, useCallback, useEffect } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  ToastAndroid,
  ActivityIndicator,
} from "react-native";
import {
  useFocusEffect,
  useRoute,
  useNavigation,
} from "@react-navigation/native";
import { getDocumentAsync } from "expo-document-picker";
import CategoriesList from "../components/molecules/category/CategoriesList";
import Picker from "../components/atoms/Picker";
import apiDomain from "../utils/apiDomain";
import useDataExtractor from "../hooks/useDataExtractor";
import color from "../assets/colors";

const toastMessagesByEvent = {
  PURCHASE_SAVED: "Egreso ingresado",
  EXTERNAL_SOURCE_ALREADY_EXIST: "No se ha cargado el archivo porque ya existe",
  EXTERNAL_SOURCE_SAVED: "Archivo cargado correctamente",
};

const Toast = ({ visible, message }) => {
  if (visible) {
    ToastAndroid.show(message, ToastAndroid.SHORT, ToastAndroid.BOTTOM, 25, 50);
    return null;
  }
  return null;
};

const RegistryExpenseGate = props => {
  const route = useRoute();
  const navigation = useNavigation();
  const [categories, setCategories] = useState([]);
  const [toastMessage, setToastMessage] = useState("");
  const [visibleToast, setVisibleToast] = useState(false);
  const [loading, setLoading] = useState(false);
  const apiCategories = apiDomain("category");
  const { chargeDataFromDevice } = useDataExtractor({
    onSendMessage: ({ MSG_CODE }) => {
      setToastMessage(toastMessagesByEvent[MSG_CODE]);
      setVisibleToast(true);
    },
  });

  const handleLoadSheet = async () => {
    setLoading(true);
    const { type, name, uri } = await getDocumentAsync();
    if (type === "success") {
      chargeDataFromDevice({ id: name, name, uri });
    }
    setLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      fetchCategories();
    }, [])
  );

  useEffect(() => {
    if (route.params?.evt === "PURCHASE_SAVED") {
      setToastMessage(toastMessagesByEvent.PURCHASE_SAVED);
      setVisibleToast(true);
      navigation.setParams({ evt: "" });
    }
  }, [route.params]);

  useEffect(() => setVisibleToast(false), [visibleToast]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Picker
          items={[
            {
              title: "Cargar planilla",
              onPressItem: () => handleLoadSheet(),
            },
          ]}
        />
      ),
    });
  }, []);

  const fetchCategories = async () => {
    const categories = await apiCategories.fetch();
    setCategories(categories);
  };

  const handlePressCategory = id => {
    navigation.push("ExpenseDetail", {
      categoryId: id,
      mode: "NEW_EXPENSE",
    });
  };

  return (
    <>
      {loading ? (
        <ActivityIndicator
          size="large"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: [{ translateX: -25 }, { translateY: -25 }],
          }}
        />
      ) : (
        <View style={styles.mainView}>
          <View style={styles.categoriesListView}>
            <SafeAreaView>
              <CategoriesList
                categories={categories}
                onPressCategory={handlePressCategory}
              />
            </SafeAreaView>
            <Toast visible={visibleToast} message={toastMessage} />
          </View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: color.blue["90"],
  },
  categoriesListView: {
    flex: 1,
    paddingHorizontal: 16,
  },
});

export default RegistryExpenseGate;
