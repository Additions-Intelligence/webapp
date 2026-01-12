"use client";

import { Flex, Heading } from "@chakra-ui/react";
import ProductList from "./_components/product-list";
import SearchBar from "./_components/search-bar";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function Home() {
  const searchParams = useSearchParams();

  const [product, setProduct] = useState(
    searchParams.get("product") || "companies"
  );

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
      <ProductList
        onProductSelect={(selected) => setProduct(selected ?? "")}
        selectedProduct={product}
      />
    </Flex>
  );
}
