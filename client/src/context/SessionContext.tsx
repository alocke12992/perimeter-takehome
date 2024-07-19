import { FC, createContext, ReactNode, useEffect, useCallback } from "react";
import { ISession } from "../api/SessionsApi";
import { useCreateSession } from "../hooks/useCreateSession";
import useLocalStorage from "../hooks/useLocalStorage";

export interface ISessionContext {
  isLoading: boolean;
  session: ISession | undefined;
}

const initState: ISessionContext = {
  isLoading: true,
  session: undefined,
};

export const SessionContext = createContext<ISessionContext>(initState);

const SessionProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [localStorageSession, setLocalStorageSession] =
    useLocalStorage<ISession>("session", undefined, false);

  const { createSession, isLoading } = useCreateSession();

  const handleCreateSession = useCallback(async () => {
    const res = await createSession({ lat: 0, long: 0 });
    setLocalStorageSession(res);
  }, [createSession, setLocalStorageSession]);

  useEffect(() => {
    if (!localStorageSession) {
      handleCreateSession();
      return;
    }
  }, [localStorageSession, isLoading, handleCreateSession]);

  return (
    <SessionContext.Provider
      value={{
        isLoading,
        session: localStorageSession,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export default SessionProvider;
