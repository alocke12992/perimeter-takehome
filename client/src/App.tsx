import { Box, Spinner } from "@chakra-ui/react";
import useLocalStorage from "./hooks/useLocalStorage";
import { ISession } from "./api/SessionsApi";
import { useEffect, useState } from "react";
import { useCreateSession } from "./hooks/useCreateSession";

function App() {
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useLocalStorage<ISession>("session");

  const { createSession } = useCreateSession();
  console.log("session", value);
  // check if session exists

  useEffect(() => {
    const handleCreateSession = async () => {
      const res = await createSession({ lat: 0, long: 0 });
      console.log("res", res);
      setValue(res);
    };
    if (!value) {
      handleCreateSession();
      return;
    }
    setLoading(false);
  }, [value]);

  return <>{loading ? <Spinner /> : <Box>Session created</Box>}</>;
}

export default App;
