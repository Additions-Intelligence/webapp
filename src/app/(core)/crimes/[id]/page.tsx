import Navbar from "../../_components/navbar";
import {
  Container,
  Box,
  Heading,
  Flex,
  Image,
  SimpleGrid,
  For,
  Text,
} from "@chakra-ui/react";
import InfoItem from "@/components/info-item";
import { formatReadableDate } from "@/lib/utils";
import { getCrimeById } from "@/data/crime";

export default async function CrimeDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const id = (await params).id;
  const crimeData = (await getCrimeById(parseInt(id)))[0];
  return (
    <>
      <Navbar product="crime" />
      <Container maxW="7xl" py={8}>
        {crimeData ? (
          <>
            <Box>
              <Heading size="2xl" mb={8}>
                Profile
              </Heading>
              <Flex gap={16}>
                <Image
                  src={
                    crimeData.entity_information.photo ??
                    "https://placehold.co/100"
                  }
                  alt="Crime profile"
                  width={200}
                  height={200}
                  objectFit="cover"
                  borderRadius="md"
                  objectPosition="center"
                />
                <SimpleGrid columns={{ base: 2, lg: 3 }} gapY={0} gapX={4}>
                  <InfoItem
                    label="Entity"
                    value={crimeData.identifier.entity_name}
                  />
                  <InfoItem
                    label="Entity Type"
                    value={crimeData.entity_information.entity_type}
                  />
                  <InfoItem
                    label="Sex"
                    value={crimeData.entity_information.sex}
                  />
                  <InfoItem
                    label="Age"
                    value={crimeData.entity_information.age}
                  />
                  <InfoItem
                    label="Height"
                    value={crimeData.entity_information.height}
                  />
                  <InfoItem
                    label="Aliases"
                    value={crimeData.identifier.aliases}
                  />
                  <InfoItem
                    label="Completion"
                    value={crimeData.entity_information.complexion}
                  />
                  <InfoItem
                    label="Nationality"
                    value={crimeData.entity_information.nationality}
                  />
                  <InfoItem
                    label="ID Type"
                    value={crimeData.identifier.id_type}
                  />
                  <InfoItem
                    label="ID Number"
                    value={crimeData.identifier.id_number}
                  />
                </SimpleGrid>
              </Flex>
            </Box>
            <Box mt="16">
              <Heading size="2xl" mb={8}>
                Crime Information
              </Heading>
              <Box spaceY={4} mb={4}>
                <InfoItem
                  label="Associated Institution"
                  value={crimeData.entity_information.associated_institution}
                />
                <InfoItem
                  label="Title"
                  value={crimeData.entity_information.title}
                />
              </Box>

              <For
                each={crimeData.crimes}
                fallback={
                  <Text fontSize="lg" fontWeight="semibold">
                    NI
                  </Text>
                }
              >
                {(crime, index) => (
                  <Box mb={12}>
                    <Box
                      key={index}
                      spaceY={4}
                      p={4}
                      borderWidth="1px"
                      borderRadius="md"
                    >
                      <InfoItem
                        label="Alert"
                        value={crime.crime_information.alert}
                      />
                      <InfoItem
                        label="Crime Type"
                        value={crime.crime_information.crime_type}
                      />
                      <InfoItem
                        label="Sub Crime Type"
                        value={crime.crime_information.sub_crime_type}
                      />
                      <InfoItem
                        label="Description"
                        value={crime.crime_information.description}
                      />
                      <InfoItem
                        label="Sanctioned Authority"
                        value={crime.crime_information.sanctioned_authority}
                      />
                    </Box>
                    <Heading size="xl" my={4}>
                      Status
                    </Heading>
                    <For each={crime.entity_crime_status}>
                      {(status, statusIndex) => (
                        <Box
                          key={statusIndex}
                          spaceY={4}
                          mb={8}
                          p={4}
                          borderWidth="1px"
                          borderRadius="md"
                        >
                          <InfoItem label="Status" value={status.status} />
                          <InfoItem label="Comment" value={status.comment} />
                          <InfoItem
                            label="Date"
                            value={formatReadableDate(status.date)}
                          />
                        </Box>
                      )}
                    </For>
                  </Box>
                )}
              </For>
            </Box>
          </>
        ) : (
          <p>Crime not found</p>
        )}
      </Container>
    </>
  );
}
