import { useGetSession } from "../hooks/useGetSession";
import { useContext } from "react";
import { SessionContext } from "../context/SessionContext";
import DrawForm from "../components/DrawForm";
import { useCreateFeature } from "../hooks/useCreateFeature";
import { useDeleteFeature } from "../hooks/useDeleteFeature";
import { useUpdateFeature } from "../hooks/useUpdateFeature";
import { Box } from "@chakra-ui/react";
import SharePopover from "../components/SharePopover";

const SessionPage = () => {
  const { sessionId } = useContext(SessionContext);
  const { isLoading, data } = useGetSession(sessionId);
  const { createFeature } = useCreateFeature();
  const { deleteFeature } = useDeleteFeature();
  const { updateFeature } = useUpdateFeature();

  if (isLoading || !data) {
    return null;
  }

  return (
    <Box h="full" w="full">
      <SharePopover sessionId={sessionId} />
      <DrawForm
        session={data}
        createFeature={createFeature}
        deleteFeature={deleteFeature}
        updateFeature={updateFeature}
      />
    </Box>
  );
};

export default SessionPage;
