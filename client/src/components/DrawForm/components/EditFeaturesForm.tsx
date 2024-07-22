import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { FC } from "react";

type Props = {
  name: string;
  onClear: () => void;
  onSubmit: () => void;
  onUndo: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const EditFeatureForm: FC<Props> = ({
  name,
  onClear,
  onChange,
  onSubmit,
  onUndo,
}) => {
  return (
    <Box>
      <Flex w="full" justify="center" gap={8}>
        <Button onClick={onUndo}>Undo</Button>
        <Button onClick={onClear}>Clear</Button>
        <Button isDisabled={!name} onClick={onSubmit}>
          Save
        </Button>
      </Flex>
      <Flex w="full">
        <Box>
          <FormControl>
            <FormLabel>Enter Name</FormLabel>
            <Input
              defaultValue={name}
              onChange={onChange}
              placeholder="Here is a sample placeholder"
              size="sm"
            />
          </FormControl>
        </Box>
      </Flex>
    </Box>
  );
};

export default EditFeatureForm;
