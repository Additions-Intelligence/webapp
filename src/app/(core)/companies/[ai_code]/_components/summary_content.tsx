import InfoItem from "@/components/info-item";
import { Container, Flex, SimpleGrid, Text } from "@chakra-ui/react";

interface SummaryContentProps {
  summaryData: {
    ai_code: string | null;
    isin: string | null;
    sector: string | null;
    description: string | null;
    number_of_employees: IEmployeeCount | null;
    number_of_branches: IBranchCount | null;
    listed: boolean | null;
    country: string | null;
  };
}

const SummaryContent: React.FC<SummaryContentProps> = ({ summaryData }) => {
  return (
    <Container p={4}>
      <Text>{summaryData.description || "NI"}</Text>
      <SimpleGrid columns={{ base: 2, md: 3 }} gap={4} mt={8}>
        <InfoItem label="AI Code" value={summaryData.ai_code} />
        <InfoItem label="ISIN" value={summaryData.isin} />
        <InfoItem label="Sector" value={summaryData.sector} />
        <InfoItem
          label="Number of Employees"
          value={summaryData.number_of_employees?.number_of_employees}
        />
        <InfoItem
          label="Number of Branches"
          value={summaryData.number_of_branches?.number_of_branches}
        />
        <InfoItem label="Listed" value={summaryData.listed ? "Yes" : "No"} />
        <InfoItem label="Country" value={summaryData.country} />
      </SimpleGrid>
    </Container>
  );
};

export default SummaryContent;
