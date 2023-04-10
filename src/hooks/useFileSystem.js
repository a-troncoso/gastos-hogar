import * as FileSystem from "expo-file-system";

export default () => {
  const readFile = async ({ uri }) => {
    const data = await FileSystem.readAsStringAsync(uri, {
      encoding: FileSystem.EncodingType.Base64,
    });
    return data;
  };

  return {
    readFile,
  };
};
