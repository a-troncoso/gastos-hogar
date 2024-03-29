import { useAuthRequest } from "expo-auth-session/providers/google";

export default clientId => {
  const [request, response, promptAsync] = useAuthRequest({
    expoClientId: clientId,
    scopes: [
      "https://www.googleapis.com/auth/drive",
      "https://www.googleapis.com/auth/drive.file",
    ],
    offlineAccess: true,
  });

  return {
    request,
    response,
    promptAsync,
  };
};
