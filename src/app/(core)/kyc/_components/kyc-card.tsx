import InfoItem from "@/components/info-item";
import { formatReadableDate } from "@/lib/utils";
import {
  Box,
  Container,
  Dialog,
  For,
  GridItem,
  Heading,
  Portal,
  SimpleGrid,
  Strong,
  Tabs,
  Text,
} from "@chakra-ui/react";

interface KYCCardProps {
  kyc: any;
}

const KYCCard: React.FC<KYCCardProps> = ({ kyc }) => {
  return (
    <Dialog.Root placement="center" size="lg" scrollBehavior="inside">
      <Dialog.Trigger asChild>
        <Box p={4} borderWidth="1px" borderRadius="sm">
          <Heading size="md">{kyc.name}</Heading>
          <SimpleGrid columns={4} gap={2}>
            <Box display="flex" gap={2} color="gray.500">
              <Text fontSize="sm" fontWeight="semibold">
                Business Risks:
              </Text>
              <Text fontSize="sm">{kyc.business_risks.length}</Text>
            </Box>
            <Box display="flex" gap={2} color="gray.500">
              <Text fontSize="sm" fontWeight="semibold">
                Financial Risks:
              </Text>
              <Text fontSize="sm">{kyc.financial_risks.length}</Text>
            </Box>
            <Box display="flex" gap={2} color="gray.500">
              <Text fontSize="sm" fontWeight="semibold">
                Crime Risks:
              </Text>
              <Text fontSize="sm">{kyc.crime_risks.length}</Text>
            </Box>
            <Box display="flex" gap={2} color="gray.500">
              <Text fontSize="sm" fontWeight="semibold">
                PEP Screening:
              </Text>
              <Text fontSize="sm">{kyc.pep_screenings.length}</Text>
            </Box>
          </SimpleGrid>
        </Box>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>{kyc.name}</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <Tabs.Root defaultValue="business">
                <Tabs.List>
                  <Tabs.Trigger value="business">
                    Business Risks [{kyc.business_risks.length}]
                  </Tabs.Trigger>
                  <Tabs.Trigger value="financial">
                    Financial Risks [{kyc.financial_risks.length}]
                  </Tabs.Trigger>
                  <Tabs.Trigger value="crime">
                    Crime Risks [{kyc.crime_risks.length}]
                  </Tabs.Trigger>
                  <Tabs.Trigger value="pep">
                    PEP Screening [{kyc.pep_screenings?.length || 0}]
                  </Tabs.Trigger>
                </Tabs.List>
                <Tabs.Content value="business">
                  {kyc.business_risks.length > 0 ? (
                    kyc.business_risks.map((risk: any, index: number) => (
                      <Container key={index} p={4}>
                        <SimpleGrid columns={2} gap={2}>
                          <InfoItem label="Title" value={risk.title} />
                          <InfoItem
                            label="Company Name"
                            value={risk.company_name}
                          />
                          <InfoItem
                            label="Company Registration Number"
                            value={risk.company_registration_number}
                          />
                          <InfoItem
                            label="Date of Incorporation"
                            value={risk.date_of_incorporation}
                          />
                          <InfoItem
                            label="Holding Company"
                            value={risk.holding_company}
                          />
                          <InfoItem label="Status" value={risk.status} />
                        </SimpleGrid>
                      </Container>
                    ))
                  ) : (
                    <Strong>NI</Strong>
                  )}
                </Tabs.Content>
                <Tabs.Content value="financial">
                  {kyc.financial_risks.length > 0 ? (
                    kyc.financial_risks.map((risk: any, index: number) => (
                      <Container key={index} p={4}>
                        <SimpleGrid columns={2} gap={2}>
                          <InfoItem
                            label="Company Name"
                            value={risk.company_name}
                          />
                          <InfoItem
                            label="Percentage"
                            value={risk.percentage}
                          />
                          <InfoItem label="Country" value={risk.country} />
                        </SimpleGrid>
                      </Container>
                    ))
                  ) : (
                    <Strong>NI</Strong>
                  )}
                </Tabs.Content>
                <Tabs.Content value="crime">
                  {kyc.crime_risks.length > 0 ? (
                    kyc.crime_risks.map((risk: any, index: number) =>
                      risk.crimes.map((crime: any, ind: number) => (
                        <Container key={ind} p={4}>
                          <SimpleGrid columns={2} gap={2}>
                            <InfoItem
                              label="Crime Type"
                              value={crime.crime_information.crime_type}
                            />
                            <InfoItem
                              label="Alert"
                              value={crime.crime_information.alert}
                            />
                            <GridItem colSpan={2}>
                              <InfoItem
                                label="Description"
                                value={crime.crime_information.description}
                              />
                            </GridItem>
                            <GridItem colSpan={2}>
                              <InfoItem
                                label="Sanctioned Authority"
                                value={
                                  crime.crime_information.sanctioned_authority
                                }
                              />
                            </GridItem>
                          </SimpleGrid>
                          <Heading size="lg" mb={2} mt={4}>
                            Status
                          </Heading>
                          {crime.entity_crime_status.map(
                            (status: any, index: number) => (
                              <Box
                                border="1px solid"
                                borderColor="gray.200"
                                p={3}
                                borderRadius="md"
                                mb={3}
                              >
                                <SimpleGrid key={index} columns={2} gap={2}>
                                  <InfoItem
                                    label="Status"
                                    value={status.status}
                                  />
                                  <InfoItem
                                    label="Date"
                                    value={formatReadableDate(status.date)}
                                  />
                                  <GridItem colSpan={2}>
                                    <InfoItem
                                      label="Comment"
                                      value={status.comment}
                                    />
                                  </GridItem>
                                </SimpleGrid>
                              </Box>
                            )
                          )}
                        </Container>
                      ))
                    )
                  ) : (
                    <Strong>NI</Strong>
                  )}
                </Tabs.Content>
                <Tabs.Content value="pep">
                  {kyc.pep_screenings && kyc.pep_screenings.length > 0 ? (
                    kyc.pep_screenings.map((pep: any, index: number) => (
                      <Container key={index} p={4}>
                        <SimpleGrid columns={2} gap={4}>
                          <GridItem colSpan={2}>
                            <Box spaceY={2}>
                              <InfoItem
                                label="Severity"
                                value={pep.personality_details.severity}
                              />
                              <Box
                                h={3}
                                w="150px"
                                bg={
                                  pep.personality_details.severity === "High"
                                    ? "red.300"
                                    : "yellow.200"
                                }
                                borderRadius="md"
                              />
                            </Box>
                          </GridItem>
                        </SimpleGrid>
                        <Heading size="lg" mb={2} mt={4}>
                          Portfolio
                        </Heading>
                        <SimpleGrid columns={{ base: 1 }} gap={4}>
                          <For
                            each={pep.political_affiliations}
                            fallback={
                              <Text fontSize="lg" fontWeight="semibold">
                                NI
                              </Text>
                            }
                          >
                            {(portfolio: any, index: number) => (
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
                                  value={
                                    portfolio.political_party_under_appointment
                                  }
                                />
                                <InfoItem
                                  label="Service Term"
                                  value={`${portfolio.start_date} - ${portfolio.end_date}`}
                                />
                              </Box>
                            )}
                          </For>
                        </SimpleGrid>
                      </Container>
                    ))
                  ) : (
                    <Strong>No PEP records</Strong>
                  )}
                </Tabs.Content>
              </Tabs.Root>
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default KYCCard;
