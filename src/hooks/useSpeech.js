import { useState, useEffect } from "react";
import Voice from "@react-native-voice/voice";

const useSpeech = () => {
  const [isMicOpen, setIsMicOpen] = useState(false);
  const [speechesResults, setSpeechesResults] = useState([]);
  const [speechError, setSpeechError] = useState("");

  useEffect(() => {
    onSpeechStart();

    return () => {
      onSpeechDestroy();
    };
  }, []);

  const onSpeechStart = () => {
    Voice.onSpeechError = onSpeechError;
    Voice.onSpeechResults = onSpeechResults;
  };

  const onSpeechResults = result => {
    setSpeechesResults(result.value);
  };

  const onSpeechError = error => {
    setSpeechError(JSON.stringify(error));
  };

  const onSpeechDestroy = () => Voice.destroy().then(Voice.removeAllListeners);

  const startSpeechToText = async () => {
    await Voice.start("es-CL");
    setIsMicOpen(true);
  };

  const stopSpeechToText = async () => {
    await Voice.stop();
    setIsMicOpen(false);
  };

  const resetSpeechResults = () => setSpeechesResults([]);

  return {
    onSpeechStart,
    isMicOpen,
    speechesResults,
    speechError,
    startSpeechToText,
    stopSpeechToText,
    resetSpeechResults,
    onSpeechDestroy,
  };
};
export default useSpeech;
