"use client"; // Error boundaries must be Client Components

import { Button, Container, Flex, Heading, Text } from "@chakra-ui/react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <Container
      maxW="md"
      mx="auto"
      h="svh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
    >
      <Heading size="3xl" color="var(--primary)">
        Addition Intelligence Oops!
      </Heading>
      <Text mt="4">
        Something went wrong. Please try again later or contact support.
      </Text>
      <Flex mt="8" justifyContent="center">
        <Button onClick={reset} variant="subtle" size="sm">
          Try again
        </Button>
      </Flex>
    </Container>
  );
}
