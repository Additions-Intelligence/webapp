import { SUBSIDIARY_DATA } from "@/lib/dummy_data";
import { Box, Container, For, Table, Text } from "@chakra-ui/react";

interface SubsidiariesContentProps {
  aiCode: string;
}

const SubsidiariesContent: React.FC<SubsidiariesContentProps> = ({
  aiCode,
}) => {
  const subsidiaries =
    SUBSIDIARY_DATA.find((s) => s.identifier.ai_code === aiCode)
      ?.subsidiaries || [];
  return (
    <Container mt={4}>
      <Table.Root variant="outline">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Name</Table.ColumnHeader>
            <Table.ColumnHeader>Type</Table.ColumnHeader>
            <Table.ColumnHeader>Ownership Type</Table.ColumnHeader>
            <Table.ColumnHeader textAlign="end">Country</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <For each={subsidiaries}>
            {(subsidiary, index) => (
              <Table.Row key={index}>
                <Table.Cell>{subsidiary.entity_name}</Table.Cell>
                <Table.Cell>{subsidiary.subsidiary_type}</Table.Cell>
                <Table.Cell>{subsidiary.ownership_type}</Table.Cell>
                <Table.Cell textAlign="end">{subsidiary.country}</Table.Cell>
              </Table.Row>
            )}
          </For>
        </Table.Body>
      </Table.Root>

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

export default SubsidiariesContent;
