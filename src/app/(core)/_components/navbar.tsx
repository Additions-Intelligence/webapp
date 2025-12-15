"use client";

import { Box, Container, Flex, Text } from "@chakra-ui/react";
import Link from "next/link";
import SearchBar from "../_components/search-bar";

interface NavbarProps {
  product?: string;
}

const Navbar: React.FC<NavbarProps> = ({ product }) => {
  return (
    <Container maxW="7xl" py={4}>
      <Flex justifyContent="space-between">
        <Flex flex={1} gap={8}>
          <Link href="/" style={{ marginTop: "4px" }}>
            <Text
              fontSize="xl"
              letterSpacing="tighter"
              fontWeight="bold"
              color="blue.800"
            >
              Addition Intelligence
            </Text>
          </Link>
          <Box flex={1} maxW="600px">
            <SearchBar type={product ?? "companies"} />
          </Box>
        </Flex>

        <Box display="flex" gap={8} mt="8px">
          <Link href="/?product=companies">
            <Text
              color="fg.muted"
              _hover={{ color: "blue.700", fontWeight: "medium" }}
            >
              Company
            </Text>
          </Link>
          <Link href="/?product=crime">
            <Text
              color="fg.muted"
              _hover={{ color: "blue.700", fontWeight: "medium" }}
            >
              Crime
            </Text>
          </Link>
          <Link href="/?product=pep">
            <Text
              color="fg.muted"
              _hover={{ color: "blue.700", fontWeight: "medium" }}
            >
              PEP
            </Text>
          </Link>
          <Link href="/?product=kyc">
            <Text
              color="fg.muted"
              _hover={{ color: "blue.700", fontWeight: "medium" }}
            >
              KYC
            </Text>
          </Link>
        </Box>
      </Flex>
    </Container>
  );
};

export default Navbar;
