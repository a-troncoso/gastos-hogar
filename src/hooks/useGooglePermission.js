import { useEffect, useState } from "react";
import * as Google from "expo-auth-session/providers/google";

export default clientId => {
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: clientId,
    scopes: [
      "https://www.googleapis.com/auth/drive",
      "https://www.googleapis.com/auth/drive.file",
      "https://www.googleapis.com/auth/drive.metadata",
    ],
    offlineAccess: true,
  });
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    console.log("REQUEST CAMBIÓ!!!", request);

    if (request) promptAsync();
  }, [request]);

  useEffect(() => {
    if (response?.authentication)
      setAccessToken(response.authentication.accessToken);
  }, [response]);

  return {
    accessToken,
  };
};
