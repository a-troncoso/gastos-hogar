import { useState, useEffect } from "react";
import {
  GDrive,
  MimeTypes,
  ListQueryBuilder,
} from "@robinbobin/react-native-google-drive-api-wrapper";
import useGooglePermission from "./useGooglePermission";
import { GOOGLE_OAUTH_CLIENT_ID } from "../constants";
import * as FileSystem from "expo-file-system";

export default () => {
  const { accessToken } = useGooglePermission(GOOGLE_OAUTH_CLIENT_ID);
  const [gDrive, setGDrive] = useState({});

  useEffect(() => {
    const gdrive = new GDrive();
    console.log("accessToken cambio!", accessToken);
    if (accessToken) {
      gdrive.accessToken = accessToken;
      setGDrive(gdrive);
    }
  }, [accessToken]);

  const findFileByName = async fileName => {
    console.log("fileName", fileName);
    console.log("accessToken", accessToken);
    console.log("gDrive", gDrive);
    console.log(
      "Object.keys(gDrive).length === 0",
      Object.keys(gDrive).length === 0
    );
    try {
      // console.log("gDrive.files.list", gDrive.files.list);

      if (Object.keys(gDrive).length === 0)
        throw Error({ msg: "No está establecida conexión con GDrive" });

      if (!accessToken) throw Error({ msg: "No posee token de autorización" });

      const fileData = await gDrive.files.list({
        q: new ListQueryBuilder()
          .contains("name", fileName)
          .and()
          .e("mimeType", "application/vnd.ms-excel"),
      });
      console.log("fileData", fileData);

      if (fileData?.files?.length === 0)
        throw Error({ msg: "No existe el archivo " + fileName });

      return fileData.files[0];
    } catch (error) {
      console.error("[findFileByName]", JSON.stringify(error));
    }
  };

  const findAllFiles = async () => {
    return await gDrive.files.list();
  };

  const downloadFile = async id => {
    const headers = new Headers();
    headers.append("Authorization", `Bearer ${accessToken}`);

    const URI = `https://www.googleapis.com/drive/v3/files/${id}?alt=media`;
    let downloadFileOptions = {
      URI,
      toFile: "RNFS.DocumentDirectoryPath" + "/data.json",
    };
    downloadFileOptions.headers = Object.assign(
      {
        Authorization: `Bearer ${accessToken}`,
      },
      downloadFileOptions.headers
    );

    const { uri } = await FileSystem.downloadAsync(
      URI,
      FileSystem.documentDirectory + "cartolita.xls",
      downloadFileOptions
    );
    return { uri };
  };

  return {
    findFileByName,
    findAllFiles,
    downloadFile,
  };
};
