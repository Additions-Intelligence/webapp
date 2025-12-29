import InfoItem from "@/components/info-item";
import {
  Box,
  Container,
  Dialog,
  Heading,
  Portal,
  SimpleGrid,
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
              <Text fontSize="sm">{kyc.pep_screening.length}</Text>
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
                    PEP Screening [{kyc.pep_screening.length}]
                  </Tabs.Trigger>
                </Tabs.List>
                <Tabs.Content value="business">
                  {kyc.business_risks.map((risk: any, index: number) => (
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
                  ))}
                </Tabs.Content>
                <Tabs.Content value="financial">
                  Manage your projects
                </Tabs.Content>
                <Tabs.Content value="crime">
                  Manage your tasks for freelancers
                </Tabs.Content>
                <Tabs.Content value="pep">
                  Manage your tasks for freelancers
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
