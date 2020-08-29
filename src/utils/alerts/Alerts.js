import { Alert } from "react-native";

const throwErrorAlert = (action, message) => {
  Alert.alert(`Ha ocurrido un error al ${action} :(`, message, [], {
    cancelable: true
  });
};

const throwConfirmationAlert = params => {
  const {
    title,
    message = "",
    onPressPositive = () => {},
    onPressNegative = () => {}
  } = params;

  Alert.alert(title, message, [
    {
      text: "No",
      onPress: () => onPressNegative(),
      style: "cancel"
    },
    { text: "Si", onPress: () => onPressPositive() }
  ]);
};

export default { throwErrorAlert, throwConfirmationAlert };
