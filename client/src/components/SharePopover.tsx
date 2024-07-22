import { ExternalLinkIcon } from "@chakra-ui/icons";
import {
  Popover,
  Button,
  PopoverContent,
  PopoverBody,
  Input,
  FormControl,
  FormLabel,
  Box,
  useDisclosure,
  IconButton,
} from "@chakra-ui/react";
import { useState, useCallback, FC } from "react";

type Props = {
  sessionId: string;
};

const SharePopover: FC<Props> = ({ sessionId }) => {
  const { isOpen, onToggle, onClose } = useDisclosure();
  const [hasCopied, setHasCopied] = useState(false);

  const url = `${window.location.origin}/session/${sessionId}`;
  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(url);
    setHasCopied(true);
  }, [url]);

  const handleClose = useCallback(() => {
    onClose();
    setHasCopied(false);
  }, [onClose]);

  return (
    <Box mb={4}>
      <IconButton
        colorScheme="blue"
        aria-label="Share session"
        icon={<ExternalLinkIcon />}
        onClick={onToggle}
        zIndex={1}
      />

      <Popover isOpen={isOpen} onClose={handleClose}>
        <PopoverContent>
          <PopoverBody>
            <FormControl>
              <FormLabel>
                {hasCopied ? "Copied!" : "Copy link to clipboard"}
              </FormLabel>
              <Input value={url} readOnly />
            </FormControl>
            <Button onClick={handleCopy}>Copy</Button>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Box>
  );
};

export default SharePopover;
