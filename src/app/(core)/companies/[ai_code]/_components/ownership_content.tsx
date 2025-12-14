import { OWNERSHIP_DATA } from "@/lib/dummy_data";
import {
  Box,
  Container,
  For,
  Heading,
  HStack,
  Table,
  Tabs,
  VStack,
} from "@chakra-ui/react";
import { Text } from "recharts";

interface OwnershipContentProps {
  aiCode: string;
}

const OwnershipContent: React.FC<OwnershipContentProps> = ({ aiCode }) => {
  const ownershipData = OWNERSHIP_DATA.filter(
    (item) => item.identifier.ai_code === aiCode
  ).sort((a, b) => b.year - a.year);
  if (!ownershipData || ownershipData.length === 0) {
    return (
      <Container>
        <Text fontSize="lg">No ownership data available.</Text>
      </Container>
    );
  }

  const ownerTypeLegend = [
    { code: "E", description: "Mutual & Pension Fund & Trustee & Nominee" },
    { code: "B", description: "Bank" },
    { code: "VC", description: "Venture Capital" },
    { code: "P", description: "Private Equity" },
    { code: "J", description: "Foundation, Research Institute" },
    { code: "C", description: "Corporate" },
    { code: "F", description: "Finance Company" },
    { code: "IC", description: "Insurance Companies" },
    { code: "I", description: "Individual" },
  ];
  return (
    <Container>
      <Tabs.Root defaultValue={ownershipData[0].year.toString()}>
        <Tabs.List>
          <For each={ownershipData}>
            {(record) => (
              <Tabs.Trigger value={record.year.toString()}>
                {record.year}
              </Tabs.Trigger>
            )}
          </For>
        </Tabs.List>
        <For each={ownershipData}>
          {(record) => (
            <Tabs.Content value={record.year.toString()}>
              <Heading my="4">Beneficial Owners</Heading>
              <Table.Root variant="outline">
                <Table.Header>
                  <Table.Row>
                    <Table.ColumnHeader>Name</Table.ColumnHeader>
                    <Table.ColumnHeader>Percentage</Table.ColumnHeader>
                    <Table.ColumnHeader>Country</Table.ColumnHeader>
                    <Table.ColumnHeader textAlign="end">
                      Type
                    </Table.ColumnHeader>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  <For each={record.beneficial_owners}>
                    {(owner, index) => (
                      <Table.Row key={index}>
                        <Table.Cell>{owner.name}</Table.Cell>
                        <Table.Cell>{owner.percentage?.toFixed(2)}</Table.Cell>
                        <Table.Cell>{owner.country}</Table.Cell>
                        <Table.Cell textAlign="end">
                          {owner.owner_type}
                        </Table.Cell>
                      </Table.Row>
                    )}
                  </For>
                </Table.Body>
              </Table.Root>
            </Tabs.Content>
          )}
        </For>
      </Tabs.Root>

      <Box mt={8}>
        <Text>Type:</Text>
        <Box as="p" color="fg.muted" fontSize="sm">
          <br />
          E (Mutual & Pension Fund & Trustee & Nominee)
          <br />
          B (Bank)
          <br />
          VC (Venture Capital)
          <br />
          P (Private Equity)
          <br />
          J (Foundation, Research Institute)
          <br />
          C (Corporate)
          <br />
          F (Finance Company)
          <br />
          IC (Insurance Companies)
          <br />I (Individual)
        </Box>
      </Box>
    </Container>
  );
};

export default OwnershipContent;
