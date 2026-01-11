import { Container, Flex, Heading, Text } from "@chakra-ui/react";
import Link from "next/link";

interface CompanySearchCardProps {
  company: ICompanySearchResult;
}

const CompanySearchCard: React.FC<CompanySearchCardProps> = ({ company }) => {
  return (
    <Link
      href={`/companies/${company.identifier.ai_code}`}
      style={{ width: "100%" }}
    >
      <Container
        bg="gray.100"
        p={3}
        borderRadius="md"
        spaceY={2}
        _hover={{ bg: "gray.200" }}
        cursor="pointer"
        transition="background-color 0.2s ease"
      >
        <Heading size="md">{company.name}</Heading>
        <Flex gap={2}>
          <Flex gap={1}>
            <Text fontSize="sm" color="gray.500" fontWeight="semibold">
              AI Code:
            </Text>
            <Text fontSize="sm" color="gray.500">
              {company.identifier.ai_code}
            </Text>
          </Flex>
          <Flex gap={1}>
            <Text fontSize="sm" color="gray.500" fontWeight="semibold">
              ISIN:
            </Text>
            <Text fontSize="sm" color="gray.500">
              {company.identifier.isin}
            </Text>
          </Flex>
        </Flex>
      </Container>
    </Link>
  );
};

export default CompanySearchCard;
