import { useState, useEffect } from "react";
import {
  GDrive,
  MimeTypes,
} from "@robinbobin/react-native-google-drive-api-wrapper";
import * as XLSX from "xlsx";
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
    // let result = await gDrive.files.get(id, { alt: "media" });
    // console.log(await (await gDrive.files.get(id, { alt: "media" })).json());

    // const reader = new FileReader();
    // reader.onload = evt => {
    //   console.log(evt);
    //   const bstr = evt.target.result;
    //   const wb = XLSX.read(bstr, { type: "binary" });
    //   const wsname = wb.SheetNames[0];
    //   const ws = wb.Sheets[wsname];
    //   const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
    // };
    // reader.readAsDataURL(result);

    // result = await result.text();
    // console.log("result", result);

    // const parsedResult = JSON.stringify(result.url);
    // console.log("parsedResult", parsedResult);
    // const r = await fetch(parsedResult);

    // console.log("r", JSON.stringify(r));
    // gDrive.files
    //   .get(id, { alt: "media" }, "1-1")
    //   .then(res => {
    //     // console.log("res", res);
    //     // res.text().then(data => console.log("data", data));
    //     return res.json();
    //   })
    //   .then(res => console.log("res", res))
    //   .catch(err => console.log("err", err));

    const headers = new Headers();
    headers.append("Authorization", `Bearer ${accessToken}`);

    fetch(
      `https://www.googleapis.com/drive/v3/files/1R6xiQ-ncSYXX0IjZuwUESgpHePHGHJMJ?alt=media`,
      {
        method: "GET",
        headers,
      }
    ).then(res => {
      const fromUrl =
        "https://www.googleapis.com/drive/v3/files/1R6xiQ-ncSYXX0IjZuwUESgpHePHGHJMJ?alt=media";
      let downloadFileOptions = {
        fromUrl,
        toFile: "RNFS.DocumentDirectoryPath" + "/data.json",
      };
      downloadFileOptions.headers = Object.assign(
        {
          Authorization: `Bearer ${accessToken}`,
        },
        downloadFileOptions.headers
      );

      FileSystem.downloadAsync(
        fromUrl,
        FileSystem.documentDirectory + "cartolita.xls",
        downloadFileOptions
      )
        .then(({ uri }) => {
          console.log("Finished downloading to ", uri);
          FileSystem.readAsStringAsync(uri, {
            encoding: FileSystem.EncodingType.Base64,
          }).then(data => {
            // console.log("data", data);
            var workbook = JSON.stringify(
              XLSX.read(data, {
                type: "base64",
                sheets: "cartolaChequeraElectrónica",
              })
            );
            const wb = JSON.parse(workbook);
            // console.log("wb", wb);
            const sheet = wb.Sheets["cartolaChequeraElectrónica"];
            const READ_FROM_ROW = 14;
            const tableBuilder = () => {
              let table = [];
              const colMap = {
                A: "date",
                D: "operationNumber",
                F: "description",
                H: "amount",
              };
              let rowCounter = READ_FROM_ROW;

              while (rowCounter <= 29) {
                let transaction = {};
                for (const col in colMap) {
                  const cell = sheet[col + rowCounter];
                  if (cell && cell.v) transaction[colMap[col]] = cell.v;
                }
                table.push(transaction);
                rowCounter = rowCounter + 1;
              }

              console.log("table", table);

              // for (const elm in sheet) {
              //   if (elm.length === 3) {
              //     const row = parseInt(elm.substring(elm.length - 2), 10);

              //     if (!isNaN(row) && row >= READ_FROM_ROW) {
              //       let transaction = {};

              //       for (const col in colMap) {
              //         const cell = sheet[col + row];
              //         if (cell && cell.v) transaction[colMap[col]] = cell.v;
              //       }
              //       console.log("transaction", transaction);
              //       // table.push(transaction);
              //       rowCounter = rowCounter + 1;
              //     }
              //   }
              // }
              // console.log("table", table);
            };
            tableBuilder();
          });
        })
        .catch(error => {
          console.error(error);
        });
    });
  };

  const fetchContent = async id => {
    console.log("VAMOS A EJECUTAR fetchContent()");
    console.log("id", id);
    console.log("accessToken", accessToken);

    // gDrive.files
    //   .getContent(id, { alt: "media" }, "1-1", "json")
    //   .then(res => {
    //     res.json().then(data => console.log("data", data));
    //   })
    //   .catch(err => console.log("err", err));

    let response = await gDrive.files.getContent(
      id,
      { alt: "media" },
      "1-1",
      "text"
    );
    // response = await response.text();
    console.log("response", typeof response);
    // const url = JSON.stringify(response.url);
    // console.log("url", url);
    // const r = await fetch(url);
    // console.log("fetched url", r);
    // const data = await (await fetch(url)).arrayBuffer();
    // console.log("data", data);
    // const wb = XLSX.read(a, { type: "binary" });
  };

  return {
    files,
    fetchFileBinary,
    fetchMetadata,
    fetchContent,
  };
};
