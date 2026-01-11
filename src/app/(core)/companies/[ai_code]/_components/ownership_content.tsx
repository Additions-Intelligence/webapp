import { useCompanyOwnership } from "@/hooks/use-companies";
import { Box, Container, For, Heading, Table, Tabs } from "@chakra-ui/react";
import { Text } from "recharts";

interface OwnershipContentProps {
  aiCode: string;
}

const OwnershipContent: React.FC<OwnershipContentProps> = ({ aiCode }) => {
  const { data: ownershipData, isLoading } = useCompanyOwnership(aiCode, true);
  if (isLoading) {
    return (
      <Container>
        <Text fontSize="lg">Loading ownership data...</Text>
      </Container>
    );
  }
  if (!ownershipData || ownershipData.length === 0) {
    return (
      <Container>
        <Text fontSize="lg">No ownership data available.</Text>
      </Container>
    );
  }

  return (
    <Container>
      <Tabs.Root defaultValue={ownershipData[0].year.toString()}>
        <Tabs.List>
          <For each={ownershipData}>
            {(record, index) => (
              <Tabs.Trigger key={index} value={record.year.toString()}>
                {record.year}
              </Tabs.Trigger>
            )}
          </For>
        </Tabs.List>
        <For each={ownershipData}>
          {(record, index) => (
            <Tabs.Content key={index} value={record.year.toString()}>
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
