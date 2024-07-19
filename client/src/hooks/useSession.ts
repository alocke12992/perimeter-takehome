import { useContext } from "react";

import { SessionContext } from "../context/SessionContext";

const useSession = () => {
  const session = useContext(SessionContext);

  return session;
};

export default useSession;
