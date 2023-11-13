import { sharedConstants } from "../../shared";
import { useCategoryAdapter } from "../adapters";
import { useUserCache } from "../../user";

const useCategoryApi = () => {
  const userCache = useUserCache();

  const addCategory = async ({
    name,
    imagePath,
    extraData = "",
    maxAmountPerMonth,
  }) => {
    try {
      console.log("name", name);
      console.log("maxAmountPerMonth", maxAmountPerMonth);
      const userID = userCache.userLogged;
      const categoryAdapter = useCategoryAdapter({
        maxAmountPerMonth,
        name,
        userID: 2,
        imagePath,
      });
      const payload = categoryAdapter.getPayloadAddCategory();

      console.log("payload", payload);

      const response = await fetch(`${sharedConstants.apiUri}/Categories`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          apiKey:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB1bGJxa3h1YWJuZWh0em52YmNnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTU3NjQ4NDEsImV4cCI6MjAxMTM0MDg0MX0.QDP4wBYjZUE9Rc-MLjeYjs0TZRg-tCXo6MZuhqWWwuw",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB1bGJxa3h1YWJuZWh0em52YmNnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5NTc2NDg0MSwiZXhwIjoyMDExMzQwODQxfQ.mR2bSqEtLHHYwuhdni7I0-4__4hg7SvFBXpdXrqxREw",
          Prefer: "return=minimal",
        },
        body: JSON.stringify(payload),
      });

      return true;
    } catch (error) {
      console.error("Error adding category: ", error);
    }
  };

  return {
    addCategory,
  };
};

export default useCategoryApi;
