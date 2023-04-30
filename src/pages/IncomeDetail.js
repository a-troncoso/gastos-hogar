import React, {
  memo,
  useState,
  useCallback,
  useEffect,
  useLayoutEffect,
} from "react";
import {
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  Platform,
  ToastAndroid,
} from "react-native";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import shortid from "shortid";
import { getDocumentAsync } from "expo-document-picker";

import Button from "../components/atoms/Button";
import DateFeature from "../components/molecules/date/DateFeature";
import AmountFeature from "../components/molecules/amount/AmountFeature";
import DescriptionFeature from "../components/molecules/description/DescriptionFeature";
import Picker from "../components/atoms/Picker";

import { INCOME_DETAIL_MODES } from "../domain/income/incomeDetailModes";
import useDataExtractor from "../hooks/useDataExtractor/useDataExtractor";

import {
  updateIncome,
  fetchIncomeById,
} from "../dbOperations/income/incomeBDTransactions";
import apiDomain from "../utils/apiDomain";
import { extractNumbers } from "../utils/number";

import color from "../assets/colors";
import alerts from "../components/atoms/Alerts";

const initialStateUnsavedFeature = {
  date: false,
  amount: false,
  description: false,
};

const Toast = memo(({ visible, message }) => {
  if (visible) {
    ToastAndroid.show(message, ToastAndroid.SHORT, ToastAndroid.BOTTOM, 25, 50);
    return null;
  }
  return null;
});

const toastMessagesByEvent = {
  INCOME_SAVED: "Ingreso ingresado",
  EXTERNAL_SOURCE_ALREADY_EXIST: "No se ha cargado el archivo porque ya existe",
  EXTERNAL_SOURCE_SAVED: "Archivo cargado correctamente",
};

const IncomeDetail = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [isVisibleToast, setIsVisibleToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const { chargeDataFromDevice } = useDataExtractor({
    onSendMessage: ({ MSG_CODE }) => {
      setToastMessage(toastMessagesByEvent[MSG_CODE]);
      setIsVisibleToast(true);
    },
    movementType: "income",
  });
  const apiIncome = apiDomain("income");
  const { params: routeParams } = route;
  const detailMode = routeParams?.mode || INCOME_DETAIL_MODES.NEW_INCOME;
  const [isUnsavedFeature, setIsUnsavedFeature] = useState(
    initialStateUnsavedFeature
  );
  const [isFixedBottomAreaVisible, setIsFixedBottomAreaVisible] =
    useState(true);
  const incomeId = routeParams?.incomeId;

  const [featureDataUI, setFeatureDataUI] = useState({
    date: new Date(),
    amount: 0,
    description: "",
  });

  useLayoutEffect(() => {
    if (detailMode === INCOME_DETAIL_MODES.EXISTING_INCOME)
      navigation.setOptions({
        headerRight: () => (
          <Picker
            items={[
              {
                title: "Eliminar",
                onPressItem: () => remove(incomeId),
                withConfirmation: true,
              },
            ]}
          />
        ),
      });
  }, [navigation]);

  useFocusEffect(
    useCallback(() => {
      if (detailMode === INCOME_DETAIL_MODES.EXISTING_INCOME)
        fetchDetail(incomeId);
      if (detailMode === INCOME_DETAIL_MODES.NEW_INCOME) {
      }
      return () => {
        setFeatureDataUI(prev => ({
          ...prev,
          date: new Date(),
          amount: 0,
          description: "",
        }));
      };
    }, [])
  );

  useEffect(() => {
    setPickerOnHeaderRight();
  }, []);

  const setPickerOnHeaderRight = useCallback(() => {
    navigation.setOptions({
      headerRight: () => (
        <Picker
          items={[
            {
              title: "Cargar planilla",
              onPressItem: handleLoadSheet,
            },
          ]}
        />
      ),
    });
  }, [navigation, handleLoadSheet]);

  const handleLoadSheet = useCallback(async () => {
    const { type, name, uri } = await getDocumentAsync();
    if (type === "success") {
      chargeDataFromDevice({ id: name, name, uri });
    }
  }, [chargeDataFromDevice]);

  const fetchDetail = async incomeId => {
    const detail = await fetchIncomeById(incomeId);

    setFeatureDataUI(prev => ({
      ...prev,
      date: detail.date,
      amount: detail.amount,
      description: detail.description,
    }));
  };

  const save = async () => {
    if (detailMode === INCOME_DETAIL_MODES.NEW_INCOME) add();
    else if (detailMode === INCOME_DETAIL_MODES.EXISTING_INCOME) update();
  };

  const add = async () => {
    try {
      const insertResult = await apiIncome.add({
        amount: extractNumbers(featureDataUI.amount),
        description: featureDataUI.description,
        date: featureDataUI.date.toISOString(),
        source: "manual",
        userId: 1,
      });
      if (insertResult.rowsAffected) navigation.goBack();
    } catch (err) {
      alerts.throwErrorAlert("ingresar el ingreso", JSON.stringify(err));
    }
  };

  const update = async () => {
    try {
      const updateResult = await updateIncome(incomeId, {
        amount: extractNumbers(featureDataUI.amount),
        description: featureDataUI.description,
        date: featureDataUI.date.toISOString(),
      });
      if (updateResult.rowsAffected) {
        setIsUnsavedFeature(initialStateUnsavedFeature);
        setToastMessage(toastMessagesByEvent.INCOME_SAVED);
        setIsVisibleToast(true);
      }
    } catch (err) {
      alerts.throwErrorAlert("actualizar el ingreso", JSON.stringify(err));
    }
  };

  const remove = async id => {
    try {
      await apiIncome.remove(id);
      navigation.goBack();
    } catch (error) {
      alerts.throwErrorAlert("eliminar ingreso", JSON.stringify(err));
    }
  };

  const handlePressSaveButton = () => {
    save();
  };

  const onChangeFeature = field => {
    if (detailMode === INCOME_DETAIL_MODES.EXISTING_INCOME)
      setIsUnsavedFeature(prev => ({
        ...prev,
        [field]: true,
      }));
  };

  const saveFeatureIntoUI = (field, value) => {
    setFeatureDataUI(prev => ({ ...prev, [field]: value }));
  };

  return (
    <View style={styles.mainView}>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flex: 1 }}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : null}
          contentContainerStyle={{ paddingBottom: 60, marginBottom: 60 }}
          keyboardVerticalOffset={Platform.select({
            ios: () => 0,
            android: () => 1000,
          })()}
          enabled
        >
          <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.features}>
              <DateFeature
                key={shortid.generate()}
                date={featureDataUI.date}
                isUnsavedFeature={isUnsavedFeature.date}
                onChange={date => {
                  saveFeatureIntoUI("date", date);
                  onChangeFeature("date");
                }}
              />
              <AmountFeature
                name="monto"
                value={featureDataUI.amount}
                isUnsavedFeature={isUnsavedFeature.amount}
                valuePrefix="$"
                onChange={({ value }) => {
                  saveFeatureIntoUI("amount", value);
                  onChangeFeature("amount");
                }}
                onChangeKeyboardVisibility={e =>
                  setIsFixedBottomAreaVisible(!e.isKeyboardVisible)
                }
              />
              <DescriptionFeature
                value={featureDataUI.description}
                isUnsavedFeature={isUnsavedFeature.description}
                onChange={({ value }) => {
                  saveFeatureIntoUI("description", value);
                  onChangeFeature("description");
                }}
                onChangeKeyboardVisibility={e =>
                  setIsFixedBottomAreaVisible(!e.isKeyboardVisible)
                }
              />
            </View>
            {isFixedBottomAreaVisible &&
              detailMode === INCOME_DETAIL_MODES.NEW_INCOME && (
                <View style={styles.fixedBottomArea}>
                  <Button onPress={handlePressSaveButton}>
                    <Text style={styles.mainBtnText}>GUARDAR</Text>
                  </Button>
                </View>
              )}
          </SafeAreaView>
        </KeyboardAvoidingView>
      </ScrollView>
      <Toast visible={isVisibleToast} message={toastMessage} />
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    // borderColor: "black",
    // borderWidth: 1,
    // borderStyle: "solid",
    flex: 1,
    backgroundColor: color.blue["90"],
  },
  secondaryPart: {
    // borderColor: "yellow",
    // borderWidth: 2,
    // borderStyle: "solid",
    flex: 1,
  },
  features: {
    // borderColor: "blue",
    // borderWidth: 1,
    // borderStyle: "solid",
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  fixedBottomArea: {
    // borderColor: "red",
    // borderWidth: 1,
    // borderStyle: "solid",
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  mainBtnText: {
    fontWeight: "bold",
  },
});

export default IncomeDetail;
