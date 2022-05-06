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

  const fetchFileBinary = async id => {
    // console.log("gDrive.accessToken", gDrive.accessToken);
    // console.log("id", id);
    // console.log(
    //   "gDrive.files.getBinary().then()",
    //   gDrive.files.getBinary().then(r => alert(JSON.stringify(r)))
    // );
    gDrive.files
      .getBinary("60B2DFFF-49F1-4F35-A14A-1D6D33909D33")
      .then(res => console.log("res", JSON.stringify(res)))
      .catch(err => console.log("err", err));

    // console.log("gDrive.files", gDrive.files);
    // const a = await gDrive.files.getBinary(id);
    // console.log(a);
  };

  const fetchMetadata = async id => {
    console.log("VAMOS A EJECUTAR fetchMetadata()");
    console.log("id", id);
    gDrive.files
      .get(id)
      .then(res => console.log("res", JSON.stringify(res)))
      .catch(err => console.log("err", err));

    // const a = await gDrive.files.get(id, { alt: "media" }, "1-1");
    // console.log("gDrive.files.get()", a);
  };

  const fetchContent = async id => {
    console.log("VAMOS A EJECUTAR fetchContent()");
    console.log("id", id);

    const a = await gDrive.files.getContent(id);
    console.log("aaaaa", JSON.stringify(a.url));
  };

  return {
    files,
    fetchFileBinary,
    fetchMetadata,
    fetchContent,
  };
};
