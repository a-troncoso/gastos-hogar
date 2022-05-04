import { useState, useEffect } from "react";
import {
  GDrive,
  MimeTypes,
} from "@robinbobin/react-native-google-drive-api-wrapper";
import useGooglePermission from "./useGooglePermission";
import { GOOGLE_OAUTH_CLIENT_ID } from "../constants";

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

  return {
    files,
  };
};
