import { useEffect, useState } from "react";
import * as Google from "expo-auth-session/providers/google";

export default clientId => {
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: clientId,
  });
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    console.log("request", request);
    if (request) promptAsync();
  }, [request]);

  useEffect(() => {
    if (response) setAccessToken(response.authentication.accessToken);
  }, [response]);

  return {
    accessToken,
  };
};
