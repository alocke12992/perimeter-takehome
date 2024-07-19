import { FC } from "react";
import { Flex, Grid, GridItem } from "@chakra-ui/react";

type Props = {
  children: React.ReactNode;
};

const Layout: FC<Props> = ({ children }) => {
  return (
    <Grid
      templateAreas={`"nav nav" "main"`}
      gridTemplateRows={"auto 1fr"}
      gap="1"
      overflow="hidden"
      height="100vh"
    >
      <GridItem area={"nav"}>
        <Flex w="full">Nav</Flex>
      </GridItem>
      <GridItem area={"main"} overflow="auto" pb="200px">
        {children}
      </GridItem>
    </Grid>
  );
};

export default Layout;
