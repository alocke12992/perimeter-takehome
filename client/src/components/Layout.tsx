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
      py={[2, 2, 8]}
      px={[0, 0, 8]}
    >
      {children}
    </Box>
  );
};

export default Layout;
