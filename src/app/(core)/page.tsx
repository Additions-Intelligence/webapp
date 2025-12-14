"use client";

import { Flex, Heading } from "@chakra-ui/react";
import ProductList from "./_components/product-list";
import SearchBar from "./_components/search-bar";
import { useState } from "react";

export default function Home() {
  const [product, setProduct] = useState("companies");
  return (
    <Flex
      as="main"
      h="svh"
      maxW="4xl"
      mx="auto"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
    >
      <Heading size="4xl" color="var(--primary)" fontWeight="extrabold" mb="16">
        Addition Intelligence Platform
      </Heading>
      <SearchBar type={product} />
      <ProductList />
    </Flex>
  );
}
