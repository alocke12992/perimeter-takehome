import { FC } from "react";
import { Flex, Grid, GridItem } from "@chakra-ui/react";

type Props = {
  children: React.ReactNode;
};

const Layout: FC<Props> = ({ children }) => {
  return (
    <Grid
      templateAreas={`"nav" "main"`}
      gridTemplateRows={"auto 1fr"}
      gap="1"
      overflow="hidden"
      height="100vh"
      width="100vw"
    >
      <GridItem area={"nav"}>
        <Flex w="full" h="70px">
          Nav
        </Flex>
      </GridItem>
      <GridItem area={"main"} overflow="auto">
        {children}
      </GridItem>
    </Grid>
  );
};

export default Layout;
