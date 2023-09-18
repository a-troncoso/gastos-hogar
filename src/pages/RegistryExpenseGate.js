import React, { useState, useCallback, useEffect } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  ToastAndroid,
  ActivityIndicator,
  TouchableOpacity,
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
import useDataExtractor from "../hooks/useDataExtractor/useDataExtractor";
import color from "../assets/colors";
import useSpeech from "../hooks/useSpeech";
import { FontAwesome } from "@expo/vector-icons";

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
  const apiCategories = apiDomain("category");
  const { chargeDataFromDevice } = useDataExtractor({
    onSendMessage: ({ MSG_CODE }) => {
      setToastMessage(toastMessagesByEvent[MSG_CODE]);
      setVisibleToast(true);
    },
    movementType: "expenses",
  });

  const [categories, setCategories] = useState([]);
  const [toastMessage, setToastMessage] = useState("");
  const [visibleToast, setVisibleToast] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isLookingCategoryBySpeech, setIsLookingCategoryBySpeech] =
    useState(false);
  const [isVisibleVoiceEntryPanel, setIsVisibleVoiceEntryPanel] =
    useState(false);

  const {
    onSpeechStart,
    speechesResults,
    isMicOpen,
    startSpeechToText,
    stopSpeechToText,
    resetSpeechResults,
    onSpeechDestroy,
  } = useSpeech();

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
      onSpeechStart();

      return () => {
        onSpeechDestroy();
        setIsVisibleVoiceEntryPanel(false);
        setIsLookingCategoryBySpeech(false);
        resetSpeechResults();
      };
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
              onPressItem: handleLoadSheet,
            },
            {
              title: "Ingreso por voz",
              onPressItem: handlePressVoiceEntry,
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
    navigateToNewExpensePage({ categoryId: id });
  };

  const navigateToNewExpensePage = ({ categoryId, isVoiceEntry = false }) => {
    navigation.push("ExpenseDetail", {
      categoryId: categoryId,
      mode: "NEW_EXPENSE",
      isVoiceEntry,
    });
  };

  const handlePressVoiceEntry = () => {
    setIsVisibleVoiceEntryPanel(true);
  };

  const handlePressMicOff = () => {
    stopSpeechToText();
    findCategoryBySpeech();
  };

  const findCategoryBySpeech = useCallback(() => {
    setIsLookingCategoryBySpeech(true);
  }, [speechesResults]);

  useEffect(() => {
    if (!isLookingCategoryBySpeech) return;
    if (speechesResults.length === 0 || categories.length === 0) return;

    const speechesResultsInOneLine = speechesResults.join().toLowerCase();
    const matchedCategory = categories.find(category => {
      return speechesResultsInOneLine.includes(category.name.toLowerCase());
    });

    if (matchedCategory)
      navigateToNewExpensePage({
        categoryId: matchedCategory.id,
        isVoiceEntry: true,
      });
  }, [isMicOpen, speechesResults, categories, isLookingCategoryBySpeech]);

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

          {isVisibleVoiceEntryPanel && (
            <View
              style={{
                alignItems: "center",
                paddingVertical: 16,
              }}
            >
              <TouchableOpacity
                title="Start Speech to Text"
                onPressIn={startSpeechToText}
                onPressOut={handlePressMicOff}
                style={{
                  borderWidth: 1,
                  width: isMicOpen ? 120 : 104,
                  height: isMicOpen ? 120 : 104,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: isMicOpen ? 60 : 56,
                  backgroundColor: color.blue[70],
                  borderColor: isMicOpen ? color.blue[30] : color.blue[60],
                }}
              >
                {!isMicOpen ? (
                  <FontAwesome
                    name="microphone"
                    size={48}
                    color={color.blue[20]}
                  />
                ) : (
                  <FontAwesome
                    name="microphone-slash"
                    size={48}
                    color={color.red[20]}
                  />
                )}
              </TouchableOpacity>
            </View>
          )}
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
