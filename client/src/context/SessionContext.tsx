import { FC, createContext, ReactNode, useEffect, useCallback } from "react";
import { useCreateSession } from "../hooks/useCreateSession";
import useLocalStorage from "../hooks/useLocalStorage";
import { mockSession } from "../lib/mocks";

export interface ISessionContext {
  sessionId: string;
}

const initState: ISessionContext = {
  sessionId: "",
};

export const SessionContext = createContext<ISessionContext>(initState);

const SessionProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [sessionId, setSessionId] = useLocalStorage<string>(
    "sessionId",
    "",
    false
  );

  const { createSession } = useCreateSession();

  const handleCreateSession = useCallback(async () => {
    const res = await createSession({
      lat: mockSession.lat,
      long: mockSession.long,
    });
    setSessionId(res?._id);
  }, [createSession, setSessionId]);

  useEffect(() => {
    if (!sessionId) {
      handleCreateSession();
      return;
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionId]);

  return (
    <SessionContext.Provider
      value={{
        sessionId,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export default SessionProvider;
