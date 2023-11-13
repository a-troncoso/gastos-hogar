import { useState } from "react";

const useUserCache = () => {
  const [userLogged, setUserLogged] = useState(null);

  const cleanUserLogged = () => {
    setUserLogged(null);
  };

  return {
    userLogged,
    setUserLogged,
    cleanUserLogged,
  };
};

export default useUserCache;
