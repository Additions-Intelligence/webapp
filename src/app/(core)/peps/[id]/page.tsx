import { getPepById } from "@/data/pep";
import Navbar from "../../_components/navbar";
import {
  Box,
  Container,
  Flex,
  For,
  Heading,
  Link,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import InfoItem from "@/components/info-item";

export default async function PEPDetail({
  params,
}: {
  params: { id: string };
}) {
  const id = (await params).id;
  const pepData = (await getPepById(parseInt(id)))[0];
  return (
    <>
      <Navbar product="pep" />
      <Container maxW="7xl" py={8}>
        {pepData ? (
          <Box>
            <Heading size="2xl" mb={8}>
              Profile
            </Heading>
            <Flex gap={16}>
              <Box spaceY={4}>
                <InfoItem label="Name" value={pepData.identifier.person_name} />
                <InfoItem label="Age" value={pepData.personality_details.age} />
                <InfoItem
                  label="Place of Birth"
                  value={pepData.personality_details.place_of_birth}
                />
                <InfoItem
                  label="Profession"
                  value={pepData.personality_details.profession}
                />
              </Box>

              <Box spaceY={2}>
                <InfoItem
                  label="Severity"
                  value={pepData.personality_details.severity}
                />
                <Box
                  h={3}
                  w="150px"
                  bg={
                    pepData.personality_details.severity === "High"
                      ? "red.300"
                      : "yellow.200"
                  }
                  borderRadius="md"
                ></Box>
              </Box>
            </Flex>
            <Heading size="2xl" my={8}>
              Portfolio
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
              <For
                each={pepData.political_affiliations}
                fallback={
                  <Text fontSize="lg" fontWeight="semibold">
                    NI
                  </Text>
                }
              >
                {(portfolio, index) => (
                  <Box
                    key={index}
                    spaceY={4}
                    p={4}
                    borderWidth="1px"
                    borderRadius="md"
                  >
                    <InfoItem
                      label="Public Office"
                      value={portfolio.public_office}
                    />
                    <InfoItem
                      label="Organization"
                      value={portfolio.organisation}
                    />
                    <InfoItem
                      label="Political Party Affiliation"
                      value={portfolio.political_party_affiliation}
                    />
                    <InfoItem
                      label="Political Party Under Appointment"
                      value={portfolio.political_party_under_appointment}
                    />
                    <InfoItem
                      label="Service Term"
                      value={`${portfolio.start_date} - ${portfolio.end_date}`}
                    />
                  </Box>
                )}
              </For>
            </SimpleGrid>
            <Heading size="2xl" my={8}>
              PEP By Association
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
              <For
                each={pepData.relatives}
                fallback={
                  <Text fontSize="lg" fontWeight="semibold">
                    NI
                  </Text>
                }
              >
                {(relative, index) => (
                  <Box
                    key={index}
                    spaceY={2}
                    p={4}
                    borderWidth="1px"
                    borderRadius="md"
                  >
                    <InfoItem label="Name" value={relative.name} />
                    <InfoItem
                      label="Relation"
                      value={relative.relationship_title}
                    />
                  </Box>
                )}
              </For>
            </SimpleGrid>
            <Heading size="2xl" my={8}>
              Associated Companies
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
              <For
                each={pepData.associated_companies}
                fallback={
                  <Text fontSize="lg" fontWeight="semibold">
                    NI
                  </Text>
                }
              >
                {(company, index) => (
                  <Box
                    key={index}
                    spaceY={2}
                    p={4}
                    borderWidth="1px"
                    borderRadius="md"
                  >
                    <InfoItem label="Name" value={company.company_name} />
                    <InfoItem label="Position" value={company.position} />
                    <InfoItem label="Country" value={company.country} />
                  </Box>
                )}
              </For>
            </SimpleGrid>
            <Heading size="2xl" my={8}>
              Controversies
            </Heading>
            <Box gap={4}>
              <For
                each={pepData.controversies}
                fallback={
                  <Text fontSize="lg" fontWeight="semibold">
                    NI
                  </Text>
                }
              >
                {(controversy, index) => (
                  <Flex key={index} gap={2}>
                    <Text fontWeight="bold">Controversy:</Text>
                    <Link href={controversy.description} target="_blank">
                      {controversy.description}
                    </Link>
                  </Flex>
                )}
              </For>
            </Box>
          </Box>
        ) : (
          <div>PEP not found</div>
        )}
      </Container>
    </>
  );
}
