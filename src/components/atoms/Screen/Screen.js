import { View, ScrollView } from "react-native";

export default ({ children }) => {
  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 64,
      }}
    >
      <ScrollView>{children}</ScrollView>
    </View>
  );
};
