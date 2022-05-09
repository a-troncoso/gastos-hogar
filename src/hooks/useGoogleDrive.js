import { useState, useEffect } from "react";
import {
  GDrive,
  MimeTypes,
} from "@robinbobin/react-native-google-drive-api-wrapper";
import useGooglePermission from "./useGooglePermission";
import { GOOGLE_OAUTH_CLIENT_ID } from "../constants";
import * as FileSystem from "expo-file-system";

export default () => {
  const { accessToken } = useGooglePermission(GOOGLE_OAUTH_CLIENT_ID);
  const [gDrive, setGDrive] = useState({});
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const gdrive = new GDrive();
    if (accessToken) gdrive.accessToken = accessToken;
    setGDrive(gdrive);
  }, [accessToken]);

  useEffect(() => {
    if (gDrive.accessToken) fetchFiles();
  }, [gDrive]);

  const fetchFiles = async () => {
    const filesData = await gDrive.files.list();
    setFiles(filesData.files);
  };

  const downloadFile = async id => {
    console.log("VAMOS A EJECUTAR fetchMetadata()");

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

    // FileSystem.downloadAsync(
    //   URI,
    //   FileSystem.documentDirectory + "cartolita.xls",
    //   downloadFileOptions
    // )
    //   .then(({ uri }) => {
    //     readFile({ uri });
    //   })
    //   .catch(error => {
    //     console.error(error);
    //   });
  };

  return {
    files,
    downloadFile,
  };
};
