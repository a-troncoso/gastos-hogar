import { Alert } from "react-native";

const throwErrorAlert = (action, message) => {
  Alert.alert(`Ha ocurrido un error al ${action} :(`, message, [], {
    cancelable: true
  });
};

export default throwErrorAlert;
