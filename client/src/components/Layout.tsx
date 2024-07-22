import { FC } from "react";
import { Box } from "@chakra-ui/react";

type Props = {
  children: React.ReactNode;
};

const Layout: FC<Props> = ({ children }) => {
  return (
    <Box
      overflow="hidden"
      height="100vh"
      width="100vw"
      p={8}
    >
      {children}
    </Box>
  );
};

export default Layout;
