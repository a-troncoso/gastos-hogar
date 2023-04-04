import { useState, useEffect, useMemo } from "react";
import {
  GDrive,
  MimeTypes,
  ListQueryBuilder,
} from "@robinbobin/react-native-google-drive-api-wrapper";
import useGooglePermission from "./useGooglePermission";
import { GOOGLE_OAUTH_CLIENT_ID } from "../constants";
import * as FileSystem from "expo-file-system";
import { isObject } from "../utils/object";

export default ({ onReadyGoogleDrive = () => {} } = {}) => {
  const { request, response, promptAsync } = useGooglePermission(
    GOOGLE_OAUTH_CLIENT_ID
  );

  useEffect(() => {
    if (request) promptAsync();
  }, [request]);

  useEffect(() => {
    console.log("reponse cambiado", response);
    if (response?.authentication) {
      console.log(
        "response?.authentication.accessToken:",
        response?.authentication.accessToken
      );

      const gDriveInstance = new GDrive();
      gDriveInstance.accessToken = response?.authentication.accessToken;
      console.log("gDriveInstance", gDriveInstance);
      onReadyGoogleDrive(gDriveInstance);
    }
  }, [response]);

  const findFileByName = async (fileName, gDriveInstance) => {
    console.log("Ejecutamos findFileByName");
    console.log("fileName", fileName);
    try {
      if (Object.keys(gDriveInstance).length === 0)
        throw Error({ msg: "No está establecida conexión con GDrive" });

      const fileData = await gDriveInstance.files.list({
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
      console.error("error", error);

      const err = isObject(error) ? JSON.stringify(error) : error;
      console.error("[findFileByName]", err);
    }
  };

  const findAllFiles = async () => {
    return await gDriveConnection.files.list();
  };

  const downloadFile = async (id, accessToken) => {
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
      FileSystem.documentDirectory + "Cartola.xls",
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
