import { Box, Button, Flex, Input, Text } from "@chakra-ui/react";
import { FC } from "react";

type Props = {
  name: string;
  onClear: () => void;
  onSubmit: () => void;
  onUndo: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isDisabled: boolean;
};

const FeatureForm: FC<Props> = ({
  name,
  onClear,
  onChange,
  onSubmit,
  onUndo,
  isDisabled,
}) => {
  return (
    <Box>
      <Flex w="full" justify="center" gap={8}>
        <Button onClick={onUndo}>Undo</Button>
        <Button onClick={onClear}>Clear</Button>
        <Button disabled={isDisabled || !name} onClick={onSubmit}>
          Save
        </Button>
      </Flex>
      <Flex w="full">
        <Box>
          <Text mb="8px">Enter Name</Text>
          <Input
            value={name}
            onChange={onChange}
            placeholder="Here is a sample placeholder"
            size="sm"
          />
        </Box>
      </Flex>
    </Box>
  );
};

export default FeatureForm;
