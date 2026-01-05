import { redirect } from "next/navigation";
import Navbar from "../_components/navbar";
import { Box, Container, Heading, Text, For } from "@chakra-ui/react";
import { searchKYC } from "@/data/kyc";
import KYCCard from "./_components/kyc-card";

export default async function KYCDetail({
  searchParams,
}: {
  searchParams: { search: string };
}) {
  const search = (await searchParams).search;
  if (!search) {
    redirect("/");
  }

  const kycs = await searchKYC(search);

  return (
    <>
      <Navbar product="kyc" />
      <Container maxW="7xl" py={8}>
        {kycs ? (
          <Box>
            <Text mb={8}>
              {search.toUpperCase()} Found {kycs.length} KYC
            </Text>
            <Box spaceY={4}>
              <For each={kycs}>
                {(kyc, index) => <KYCCard key={index} kyc={kyc} />}
              </For>
            </Box>
          </Box>
        ) : (
          <Text>Crime not found</Text>
        )}
      </Container>
    </>
  );
}
