import { Box, Container, Flex, Heading, Image, Text } from "@chakra-ui/react";
import Link from "next/link";

interface CrimeSearchCardProps {
  entity: ICrimeRecord;
}

const CrimeSearchCard: React.FC<CrimeSearchCardProps> = ({ entity }) => {
  return (
    <Link
      href={`/crimes/${entity.identifier.entity_id}`}
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
        <Flex gap={4} alignItems="center">
          <Image
            src={entity.entity_information.photo || "https://placehold.co/100"}
            alt="Entity"
            width="50px"
            height="50px"
            objectFit="cover"
            objectPosition="center"
            borderRadius="md"
          />
          <Box>
            <Heading size="md">{entity.identifier.entity_name}</Heading>
            <Flex gap={2}>
              <Flex gap={1}>
                <Text fontSize="sm" color="gray.500" fontWeight="semibold">
                  Alias:
                </Text>
                <Text fontSize="sm" color="gray.500">
                  {entity.identifier.aliases || "NI"}
                </Text>
              </Flex>
              {/* <Flex gap={1}>
                <Text fontSize="sm" color="gray.500" fontWeight="semibold">
                  Crime:
                </Text>
                <Text fontSize="sm" color="gray.500">
                  {entity.crimes[0].crime_information.crime_type || "NI"}
                </Text>
              </Flex>
              <Flex gap={1}>
                <Text fontSize="sm" color="gray.500" fontWeight="semibold">
                  Crime Type:
                </Text>
                <Text fontSize="sm" color="gray.500">
                  {entity.crimes[0].crime_information.sub_crime_type || "NI"}
                </Text>
              </Flex> */}
            </Flex>
          </Box>
        </Flex>
      </Container>
    </Link>
  );
};

export default CrimeSearchCard;
