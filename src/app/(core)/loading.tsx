import { Container, Flex, Text } from "@chakra-ui/react";

export default function Loading() {
  // Or a custom loading skeleton component
  return (
    <Container
      maxW="md"
      mx="auto"
      h="svh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Flex justify="center" gap={2}>
        <Text>Preparing information...</Text>
      </Flex>
    </Container>
  );
}
